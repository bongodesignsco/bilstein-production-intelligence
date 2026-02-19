import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAssets } from '../hooks/useAssets';
import { useInsights } from '../hooks/useInsights';
import { Header } from '../components/common/Header';

export default function AssetDetailPage() {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const { assets } = useAssets();
  const { insights, loading } = useInsights(assetId);
  const [activeTab, setActiveTab] = useState('events');
  
  const asset = assets.find(a => a.id === assetId);
  
  if (!asset) return <div>Asset not found</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header title={`BILSTEIN | ${asset.shortName}`} />
      <div style={{ padding: '24px' }}>
        <button onClick={() => navigate('/')}>← Back</button>
        <h2>{asset.name}</h2>
        <div>
          <button onClick={() => setActiveTab('events')}>Events</button>
          <button onClick={() => setActiveTab('insights')}>AI Analysis</button>
        </div>
        {activeTab === 'events' && (
          <div>
            {asset.events?.map(event => (
              <div key={event.id} style={{ background: '#fff', padding: '16px', marginTop: '12px' }}>
                <strong>{event.operator_post}</strong>
                <p>{event.duration} min - {event.category}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'insights' && (
          <div>
            {loading ? <div>Loading insights...</div> : (
              <div style={{ background: '#fff', padding: '16px' }}>
                <div>Risk: {insights?.riskLevel}</div>
                <div>Recommendation: {insights?.recommendation}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
