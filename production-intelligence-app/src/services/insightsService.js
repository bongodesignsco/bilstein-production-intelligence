import { mockInsights } from '../data/mockData';

export const insightsService = {
  getByAssetId: async (assetId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockInsights[assetId];
  }
};
