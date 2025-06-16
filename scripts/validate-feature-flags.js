#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const FEATURE_FLAGS_PATH = path.join(__dirname, '../src/featureFlags/featureFlags.json');

function validateFeatureFlags() {
  try {
    // Check if feature flags file exists
    if (!fs.existsSync(FEATURE_FLAGS_PATH)) {
      console.error('❌ Feature flags file not found at:', FEATURE_FLAGS_PATH);
      process.exit(1);
    }

    // Read and parse the feature flags
    const content = fs.readFileSync(FEATURE_FLAGS_PATH, 'utf8');
    let featureFlags;
    
    try {
      featureFlags = JSON.parse(content);
    } catch (parseError) {
      console.error('❌ Invalid JSON in feature flags file:', parseError.message);
      process.exit(1);
    }

    // Validate structure
    if (typeof featureFlags !== 'object' || featureFlags === null) {
      console.error('❌ Feature flags must be an object');
      process.exit(1);
    }

    // Validate each feature flag
    const errors = [];
    const warnings = [];

    Object.entries(featureFlags).forEach(([key, value]) => {
      // Check key naming convention (camelCase or kebab-case)
      if (!/^[a-z][a-zA-Z0-9]*$/.test(key) && !/^[a-z][a-z0-9-]*[a-z0-9]$/.test(key)) {
        warnings.push(`Feature flag key "${key}" should follow camelCase or kebab-case convention`);
      }

      // Check value type
      if (typeof value !== 'boolean') {
        errors.push(`Feature flag "${key}" must have a boolean value, got ${typeof value}`);
      }
    });

    // Report results
    if (errors.length > 0) {
      console.error('❌ Feature flag validation failed:');
      errors.forEach(error => console.error(`  - ${error}`));
      process.exit(1);
    }

    if (warnings.length > 0) {
      console.warn('⚠️  Feature flag warnings:');
      warnings.forEach(warning => console.warn(`  - ${warning}`));
    }

    const flagCount = Object.keys(featureFlags).length;
    console.log(`✅ Feature flags validation passed (${flagCount} flags validated)`);
    
    // Log current flags for reference
    console.log('📋 Current feature flags:');
    Object.entries(featureFlags).forEach(([key, value]) => {
      const status = value ? '🟢 ON' : '🔴 OFF';
      console.log(`  - ${key}: ${status}`);
    });

  } catch (error) {
    console.error('❌ Unexpected error during feature flag validation:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  validateFeatureFlags();
}

module.exports = { validateFeatureFlags };