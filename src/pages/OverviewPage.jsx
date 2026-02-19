import { useNavigate } from 'react-router-dom';
import { useAssets } from '../hooks/useAssets';
import { Header } from '../components/common/Header';

export default function OverviewPage() {
  const { assets, loading, error } = useAssets();
  const navigate = useNavigate();

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header title="BILSTEIN | AI Intelligence | Production Overview" />
      <div style={{ padding: '48px 24px', textAlign: 'center', color: '#6b7280' }}>
        Loading assets...
      </div>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header title="BILSTEIN | AI Intelligence | Production Overview" />
      <div style={{ padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ color: '#c0392b', fontWeight: 600, marginBottom: '8px' }}>Failed to load assets</div>
        <div style={{ color: '#6b7280', fontSize: '14px' }}>{error.message || 'An unexpected error occurred.'}</div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header
        title="BILSTEIN | AI Intelligence | Production Overview"
        badge="4 HIGH PRIORITY ITEMS"
      />
      <div style={{ padding: '24px' }}>
        {assets.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#6b7280', paddingTop: '48px' }}>No assets found.</div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '20px'
          }}>
            {assets.map(asset => (
              <div
                key={asset.id}
                onClick={() => navigate(`/asset/${asset.id}`)}
                style={{
                  background: '#fff',
                  padding: '18px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  border: '1px solid #dde1e7'
                }}
              >
                <h3>{asset.shortName}</h3>
                <p>{asset.type}</p>
                <p>{asset.total_downtime_min} min downtime</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
