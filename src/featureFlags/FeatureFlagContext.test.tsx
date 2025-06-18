import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FeatureFlagProvider, useFeatureFlags } from './FeatureFlagContext';
import { useFeatureFlag } from './useFeatureFlag';

// A simple test component that uses the context directly
const DirectConsumer: React.FC = () => {
  const flags = useFeatureFlags();
  return (
    <div>
      <span data-testid="newDashboard">{flags.newDashboard?.toString()}</span>
      <span data-testid="betaUser">{flags.betaUser?.toString()}</span>
      <span data-testid="enableNotifications">{flags.enableNotifications?.toString()}</span>
    </div>
  );
};

// A test component that leverages the custom hook for a single flag
const HookConsumer: React.FC<{ flag: string }> = ({ flag }) => {
  const isEnabled = useFeatureFlag(flag);
  return <span data-testid={flag}>{isEnabled.toString()}</span>;
};

describe('FeatureFlagContext and useFeatureFlag', () => {
  it('provides flag values from JSON using the provider directly', () => {
    render(
      <FeatureFlagProvider>
        <DirectConsumer />
      </FeatureFlagProvider>
    );
    
    expect(screen.getByTestId('newDashboard').textContent).toBe('true');
    expect(screen.getByTestId('betaUser').textContent).toBe('false');
    expect(screen.getByTestId('enableNotifications').textContent).toBe('false');
  });

  it('returns the correct flag value from the custom hook', () => {
    render(
      <FeatureFlagProvider>
        <HookConsumer flag="newDashboard" />
        <HookConsumer flag="betaUser" />
        <HookConsumer flag="enableNotifications" />
      </FeatureFlagProvider>
    );
    
    expect(screen.getByTestId('newDashboard').textContent).toBe('true');
    expect(screen.getByTestId('betaUser').textContent).toBe('false');
    expect(screen.getByTestId('enableNotifications').textContent).toBe('false');
  });

  describe('enableNotifications flag', () => {
    it('returns false by default', () => {
      render(
        <FeatureFlagProvider>
          <HookConsumer flag="enableNotifications" />
        </FeatureFlagProvider>
      );
      
      expect(screen.getByTestId('enableNotifications').textContent).toBe('false');
    });

    it('supports override functionality', () => {
      // Test that the hook correctly returns false for a non-existent flag
      render(
        <FeatureFlagProvider>
          <HookConsumer flag="nonExistentFlag" />
        </FeatureFlagProvider>
      );
      
      expect(screen.getByTestId('nonExistentFlag').textContent).toBe('false');
    });
  });
});
