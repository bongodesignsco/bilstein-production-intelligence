import { useState, useEffect } from 'react';
import { insightsService } from '../services/insightsService';

export function useInsights(assetId) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!assetId) return;
    
    setLoading(true);
    insightsService.getByAssetId(assetId)
      .then(setInsights)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [assetId]);

  return { insights, loading, error };
}
