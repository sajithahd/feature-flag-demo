import React, { createContext, useContext, useEffect, useState } from 'react';
import flags from './featureFlags.json';

type FeatureFlags = {
  [key: string]: boolean;
};

type FeatureFlagContextType = {
  flags: FeatureFlags;
  setFeatureFlag: (flag: string, value: boolean) => void;
};

const FeatureFlagContext = createContext<FeatureFlagContextType>({
  flags: {},
  setFeatureFlag: () => {},
});

export const FeatureFlagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>({});

  useEffect(() => {
    setFeatureFlags(flags); // This could be replaced with an API call in the future
  }, []);

  const setFeatureFlag = (flag: string, value: boolean) => {
    setFeatureFlags(prev => ({
      ...prev,
      [flag]: value
    }));
  };

  return (
    <FeatureFlagContext.Provider value={{ flags: featureFlags, setFeatureFlag }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = () => useContext(FeatureFlagContext).flags;
export const useFeatureFlagSetter = () => useContext(FeatureFlagContext).setFeatureFlag;
