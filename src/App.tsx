import React from 'react';
import { useFeatureFlag } from './featureFlags/useFeatureFlag';

const App: React.FC = () => {
  const isNewDashboardEnabled = useFeatureFlag('newDashboard');

  return (
    <div>
      <h1>Welcome!</h1>
      {isNewDashboardEnabled ? (
        <p>New Dashboard is available 🎉</p>
      ) : (
        <p>Using old dashboard 🧓</p>
      )}
    </div>
  );
};

export default App;
