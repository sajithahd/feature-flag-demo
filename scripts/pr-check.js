#!/usr/bin/env node

const { spawn } = require('child_process');
const { performance } = require('perf_hooks');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

function logStep(step, message) {
  console.log(`${colorize('●', 'blue')} ${colorize(`[${step}]`, 'cyan')} ${message}`);
}

function logSuccess(message) {
  console.log(`${colorize('✅', 'green')} ${message}`);
}

function logError(message) {
  console.error(`${colorize('❌', 'red')} ${message}`);
}

function logWarning(message) {
  console.warn(`${colorize('⚠️', 'yellow')} ${message}`);
}

async function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const startTime = performance.now();
    const child = spawn(command, args, {
      stdio: 'pipe',
      shell: true,
      ...options,
    });

    let stdout = '';
    let stderr = '';

    if (child.stdout) {
      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });
    }

    if (child.stderr) {
      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });
    }

    child.on('close', (code) => {
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      
      if (code === 0) {
        resolve({ stdout, stderr, duration });
      } else {
        reject({ code, stdout, stderr, duration });
      }
    });

    child.on('error', (error) => {
      reject({ error: error.message });
    });
  });
}

async function runCheck(name, command, args = [], options = {}) {
  logStep('CHECK', `${name}...`);
  try {
    const result = await runCommand(command, args, options);
    logSuccess(`${name} passed (${result.duration}ms)`);
    
    if (result.stdout && options.showOutput) {
      console.log(result.stdout);
    }
    
    return true;
  } catch (error) {
    logError(`${name} failed${error.duration ? ` (${error.duration}ms)` : ''}`);
    
    if (error.stdout) {
      console.log(error.stdout);
    }
    if (error.stderr) {
      console.error(error.stderr);
    }
    if (error.error) {
      console.error(error.error);
    }
    
    return false;
  }
}

async function main() {
  console.log(colorize('\n🔍 PR Checker - Validating your changes...\n', 'magenta'));
  
  const startTime = performance.now();
  const checks = [];
  
  // Install dependencies if needed
  logStep('SETUP', 'Ensuring dependencies are installed...');
  try {
    await runCommand('npm', ['install']);
    logSuccess('Dependencies are up to date');
  } catch (error) {
    logWarning('Failed to install dependencies, continuing anyway...');
  }

  // Run all checks
  const checkResults = await Promise.allSettled([
    runCheck('Type checking', 'npm', ['run', 'type-check']),
    runCheck('Code linting', 'npm', ['run', 'lint']),
    runCheck('Code formatting', 'npm', ['run', 'format:check']),
    runCheck('Unit tests', 'npm', ['run', 'test:coverage']),
    runCheck('Build verification', 'npm', ['run', 'build']),
    runCheck('Feature flags validation', 'npm', ['run', 'validate:feature-flags'], { showOutput: true }),
  ]);

  const results = checkResults.map(result => 
    result.status === 'fulfilled' ? result.value : false
  );

  const passedChecks = results.filter(Boolean).length;
  const totalChecks = results.length;
  
  const endTime = performance.now();
  const totalDuration = Math.round(endTime - startTime);

  console.log(`\n${colorize('='*50, 'cyan')}`);
  
  if (passedChecks === totalChecks) {
    logSuccess(`All checks passed! (${passedChecks}/${totalChecks}) in ${totalDuration}ms`);
    console.log(colorize('🚀 Your PR is ready to be submitted!', 'green'));
    process.exit(0);
  } else {
    logError(`${totalChecks - passedChecks} check(s) failed (${passedChecks}/${totalChecks}) in ${totalDuration}ms`);
    console.log(colorize('🛠️  Please fix the issues above before submitting your PR.', 'yellow'));
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(error => {
    logError('Unexpected error:', error);
    process.exit(1);
  });
}