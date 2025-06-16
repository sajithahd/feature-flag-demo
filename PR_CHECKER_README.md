# PR Checker System

A comprehensive pull request validation system for the feature-flags-demo project. This system ensures code quality, consistency, and reliability through automated checks.

## 🚀 Features

- **Automated GitHub Actions**: Runs on every PR and push to main/develop branches
- **Local PR Checker**: Run checks locally before pushing
- **Comprehensive Validation**:
  - TypeScript type checking
  - ESLint code quality checks
  - Prettier code formatting validation
  - Unit test execution with coverage reporting
  - Build verification
  - Bundle size monitoring
  - Security audit (npm audit)
  - Feature flags validation
  - Code coverage thresholds (80% minimum)

## 📋 Setup

### 1. Install Dependencies

```bash
npm install
```

All necessary dev dependencies are included in `package.json`:
- ESLint with TypeScript and React plugins
- Prettier for code formatting
- Vitest with coverage reporting
- Bundle size monitoring
- Custom feature flag validation

### 2. VS Code Integration (Optional)

Install recommended extensions:
- ESLint
- Prettier - Code formatter
- TypeScript and JavaScript Language Features

## 🔧 Usage

### Local PR Checker

Run the comprehensive PR checker locally:

```bash
# Run all checks
npm run pr-check

# Or use the interactive script
node scripts/pr-check.js
```

### Individual Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix  # Auto-fix issues

# Code formatting
npm run format      # Format code
npm run format:check # Check formatting

# Testing
npm run test            # Run tests in watch mode
npm run test:coverage   # Run tests with coverage

# Build
npm run build

# Feature flags validation
npm run validate:feature-flags
```

## 📊 GitHub Actions

The PR checker automatically runs on:
- Pull requests to `main` or `develop` branches
- Direct pushes to `main` or `develop` branches

### Workflow Steps

1. **Setup**: Checkout code and install dependencies
2. **Type Check**: Verify TypeScript types
3. **Lint**: Check code quality with ESLint
4. **Format Check**: Verify code formatting with Prettier
5. **Test**: Run unit tests with coverage reporting
6. **Build**: Verify the project builds successfully
7. **Bundle Size**: Check bundle size limits
8. **Security**: Run npm audit for vulnerabilities
9. **Feature Flags**: Validate feature flag configuration
10. **Coverage Upload**: Upload coverage reports to CodeCov (if configured)

## ⚙️ Configuration

### Code Quality Rules

#### ESLint Configuration (`.eslintrc.cjs`)
- TypeScript recommended rules
- React and React Hooks rules
- Custom rules for code quality
- No unused variables or console logs in production

#### Prettier Configuration (`.prettierrc`)
- 2-space indentation
- Single quotes
- Semicolons
- 80 character line length
- Trailing commas where valid

### Test Configuration

#### Coverage Thresholds
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

Coverage reports are generated in multiple formats:
- Terminal output
- HTML report (`coverage/index.html`)
- LCOV for CI integration

### Bundle Size Limits

- **JavaScript bundles**: 150KB (gzipped)
- Configured in `package.json` under `bundlesize`

### Feature Flag Validation

The system validates:
- ✅ JSON syntax correctness
- ✅ Boolean values only
- ✅ Naming conventions (camelCase or kebab-case)
- ✅ File existence

## 🛠️ Customization

### Adding New Checks

1. **Add to GitHub Actions** (`.github/workflows/pr-check.yml`):
```yaml
- name: Your Custom Check
  run: npm run your-custom-command
```

2. **Add to Local Checker** (`scripts/pr-check.js`):
```javascript
runCheck('Your Custom Check', 'npm', ['run', 'your-custom-command']),
```

3. **Add npm script** (`package.json`):
```json
{
  "scripts": {
    "your-custom-command": "your-command-here"
  }
}
```

### Adjusting Coverage Thresholds

Edit `vite.config.ts`:
```typescript
coverage: {
  thresholds: {
    global: {
      branches: 85,  // Increase threshold
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
}
```

### Modifying Bundle Size Limits

Edit `package.json`:
```json
{
  "bundlesize": [
    {
      "path": "./dist/assets/*.js",
      "maxSize": "200kb",  // Increase limit
      "compression": "gzip"
    }
  ]
}
```

## 📈 Monitoring

### Coverage Reports

- **Local**: Open `coverage/index.html` after running tests
- **CI**: Reports uploaded to CodeCov (if configured)

### Build Analysis

- Bundle size is checked on every build
- Detailed build output available in CI logs

## 🚨 Troubleshooting

### Common Issues

1. **Type Errors**: Run `npm run type-check` to see detailed TypeScript errors
2. **Lint Errors**: Run `npm run lint:fix` to auto-fix many issues
3. **Format Issues**: Run `npm run format` to auto-format code
4. **Test Failures**: Run `npm run test` to see detailed test output
5. **Build Failures**: Check for missing dependencies or build configuration issues

### Skip Checks (Emergency Only)

To skip specific checks in CI, add to commit message:
- `[skip ci]` - Skip entire CI pipeline
- `[skip lint]` - Not supported, fix linting issues instead

### Local Development

If you need to bypass local checks temporarily:
```bash
# Commit with --no-verify to skip git hooks (if configured)
git commit --no-verify -m "emergency fix"
```

## 📝 Best Practices

1. **Run checks locally** before pushing
2. **Fix issues early** rather than in CI
3. **Write tests** for new features
4. **Keep coverage high** (80%+ minimum)
5. **Validate feature flags** before deployment
6. **Review bundle size** impact of changes

## 🔗 Related Files

- `.github/workflows/pr-check.yml` - GitHub Actions workflow
- `scripts/pr-check.js` - Local PR checker script
- `scripts/validate-feature-flags.js` - Feature flag validation
- `.eslintrc.cjs` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `vite.config.ts` - Test and build configuration
- `src/test/setup.ts` - Test environment setup