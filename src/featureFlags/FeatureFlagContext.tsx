import React, { createContext, useContext, useEffect, useState } from 'react';
import flags from './featureFlags.json';

type FeatureFlags = {
  [key: string]: boolean;
};

const FeatureFlagContext = createContext<FeatureFlags>({});

export const FeatureFlagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>({});

  useEffect(() => {
    setFeatureFlags(flags); // This could be replaced with an API call in the future
  }, []);

  return (
    <FeatureFlagContext.Provider value={featureFlags}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = () => useContext(FeatureFlagContext);
