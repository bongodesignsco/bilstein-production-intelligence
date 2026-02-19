import { useNavigate } from 'react-router-dom';
import { useAssets } from '../hooks/useAssets';
import { Header } from '../components/common/Header';

export default function OverviewPage() {
  const { assets, loading } = useAssets();
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header 
        title="BILSTEIN | AI Intelligence | Production Overview"
        badge="4 HIGH PRIORITY ITEMS"
      />
      <div style={{ padding: '24px' }}>
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
      </div>
    </div>
  );
}
