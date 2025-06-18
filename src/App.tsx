// Import React library for building the component
import React, { useState } from 'react';
// Import custom hook for feature flag management
import { useFeatureFlag } from './featureFlags/useFeatureFlag';

/**
 * Notification component that displays a sample notification
 */
const NotificationComponent: React.FC = () => {
  return (
    <div style={{
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '12px 20px',
      margin: '10px 0',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      <span style={{ fontSize: '20px' }}>🔔</span>
      <div>
        <strong>New Notification!</strong>
        <p style={{ margin: 0, fontSize: '14px' }}>
          You have a new message waiting for you.
        </p>
      </div>
    </div>
  );
};

/**
 * Main App component that demonstrates feature flag usage
 * Shows different content based on the newDashboard feature flag state
 * and conditionally renders notifications based on enableNotifications flag
 */
const App: React.FC = () => {
  const isDashboardEnabled = useFeatureFlag('enableDashboard');
  const isNotificationsEnabled = useFeatureFlag('enableNotifications');
  
  // Local state to simulate flag toggling (in a real app, this would be handled by the feature flag service)
  const [localNotificationsEnabled, setLocalNotificationsEnabled] = useState(isNotificationsEnabled);

  const toggleNotifications = () => {
    setLocalNotificationsEnabled(!localNotificationsEnabled);
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      {/* Main welcome heading */}
      <h1>Welcome!</h1>
      
      {/* Dashboard feature flag demo */}
      {isDashboardEnabled ? (
        <p>New Dashboard is available 🎉</p>
      ) : (
        // Show this content when the new dashboard feature is disabled
        <p>Using old dashboard 🧓</p>
      )}

      {/* Notifications section */}
      <div style={{ marginTop: '30px' }}>
        <h2>Notifications Feature</h2>
        
        {/* Toggle button for notifications */}
        <button 
          onClick={toggleNotifications}
          style={{
            backgroundColor: localNotificationsEnabled ? '#f44336' : '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            marginBottom: '20px'
          }}
        >
          {localNotificationsEnabled ? 'Disable Notifications' : 'Enable Notifications'}
        </button>

        {/* Conditional rendering of notification component */}
        {localNotificationsEnabled ? (
          <div>
            <p>✅ Notifications are enabled</p>
            <NotificationComponent />
          </div>
        ) : (
          <p>🔕 Notifications are disabled</p>
        )}

        {/* Feature flag status indicator */}
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '6px',
          fontSize: '14px'
        }}>
          <strong>Feature Flag Status:</strong>
          <ul style={{ margin: '10px 0' }}>
            <li>enableNotifications (from JSON): {isNotificationsEnabled ? '✅ true' : '❌ false'}</li>
            <li>Current display state: {localNotificationsEnabled ? '✅ enabled' : '❌ disabled'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Export the App component as the default export
export default App;
