import { useFeatureFlags } from './FeatureFlagContext';

export const useFeatureFlag = (flag: string): boolean => {
  const flags = useFeatureFlags();
  return !!flags[flag];
};
