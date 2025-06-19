// Import React library for building the component
import React from 'react';
// Import custom hook for feature flag management
import { useFeatureFlag } from './featureFlags/useFeatureFlag';
import { useFeatureFlagSetter } from './featureFlags/FeatureFlagContext';

// Sample Notification Component
const NotificationComponent: React.FC = () => {
  return (
    <div style={{
      backgroundColor: '#e3f2fd',
      border: '1px solid #2196f3',
      borderRadius: '4px',
      padding: '16px',
      margin: '16px 0',
      color: '#1976d2'
    }}>
      <h3>🔔 Notifications</h3>
      <p>You have new notifications!</p>
      <ul>
        <li>Welcome to the new feature!</li>
        <li>Your profile has been updated</li>
        <li>You have 3 new messages</li>
      </ul>
    </div>
  );
};

/**
 * Main App component that demonstrates feature flag usage
 * Shows different content based on feature flag states
 */
const App: React.FC = () => {
  const isDashboardEnabled = useFeatureFlag('enableDashboard');
  const isNotificationsEnabled = useFeatureFlag('enableNotifications');
  const setFeatureFlag = useFeatureFlagSetter();

  const toggleNotifications = () => {
    setFeatureFlag('enableNotifications', !isNotificationsEnabled);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Main welcome heading */}
      <h1>Welcome!</h1>
      
      {/* Dashboard feature flag demo */}
      {isDashboardEnabled ? (
        <p>New Dashboard is available 🎉</p>
      ) : (
        // Show this content when the new dashboard feature is disabled
        <p>Using old dashboard 🧓</p>
      )}

      {/* Notifications feature flag section */}
      <div style={{ marginTop: '20px' }}>
        <h2>Notifications Feature</h2>
        <button 
          onClick={toggleNotifications}
          style={{
            backgroundColor: isNotificationsEnabled ? '#f44336' : '#4caf50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            marginBottom: '16px'
          }}
        >
          {isNotificationsEnabled ? 'Disable Notifications' : 'Enable Notifications'}
        </button>
        
        {/* Conditional rendering based on enableNotifications flag */}
        {isNotificationsEnabled ? (
          <NotificationComponent />
        ) : (
          <p style={{ color: '#666' }}>Notifications are currently disabled. Click the button above to enable them.</p>
        )}
      </div>
    </div>
  );
};

// Export the App component as the default export
export default App;
