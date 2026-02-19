import { mockAssets } from '../data/mockData';

// TODO: Replace with real API calls
// Example: fetch(`${API_BASE_URL}/assets`)

export const assetsService = {
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAssets;
  },
  
  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockAssets.find(asset => asset.id === id);
  }
};
