import { useState, useEffect } from 'react';
import { assetsService } from '../services/assetsService';

export function useAssets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    assetsService.getAll()
      .then(setAssets)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { assets, loading, error };
}
