// Import React library for building the component
import React from 'react';
// Import custom hook for feature flag management
import { useFeatureFlag } from './featureFlags/useFeatureFlag';

/**
 * Main App component that demonstrates feature flag usage
 * Shows different content based on the newDashboard feature flag state
 */
const App: React.FC = () => {
  const isDashboardEnabled = useFeatureFlag('enableDashboard');

  return (
    <div>
      {/* Main welcome heading */}
      <h1>Welcome!</h1>
      {isDashboardEnabled ? (
        <p>New Dashboard is available 🎉</p>
      ) : (
        // Show this content when the new dashboard feature is disabled
        <p>Using old dashboard 🧓</p>
      )}
    </div>
  );
};

// Export the App component as the default export
export default App;
