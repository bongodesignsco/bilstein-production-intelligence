import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAssets } from '../hooks/useAssets';
import { useInsights } from '../hooks/useInsights';
import { Header } from '../components/common/Header';

export default function AssetDetailPage() {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const { assets, loading: assetsLoading, error: assetsError } = useAssets();
  const { insights, loading: insightsLoading, error: insightsError } = useInsights(assetId);
  const [activeTab, setActiveTab] = useState('events');

  if (assetsLoading) return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header title="BILSTEIN | Loading..." />
      <div style={{ padding: '48px 24px', textAlign: 'center', color: '#6b7280' }}>
        Loading asset...
      </div>
    </div>
  );

  if (assetsError) return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header title="BILSTEIN | Error" />
      <div style={{ padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ color: '#c0392b', fontWeight: 600, marginBottom: '8px' }}>Failed to load asset data</div>
        <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px' }}>{assetsError.message || 'An unexpected error occurred.'}</div>
        <button onClick={() => navigate('/')}>← Back to Overview</button>
      </div>
    </div>
  );

  const asset = assets.find(a => a.id === assetId);

  if (!asset) return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header title="BILSTEIN | Asset Not Found" />
      <div style={{ padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontWeight: 600, marginBottom: '8px' }}>Asset not found</div>
        <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px' }}>No asset with ID &quot;{assetId}&quot; exists.</div>
        <button onClick={() => navigate('/')}>← Back to Overview</button>
      </div>
    </div>
  );

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
            {asset.events?.length === 0 && (
              <div style={{ color: '#6b7280', paddingTop: '24px' }}>No events recorded for this asset.</div>
            )}
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
            {insightsLoading && <div style={{ color: '#6b7280', paddingTop: '24px' }}>Loading insights...</div>}
            {insightsError && (
              <div style={{ paddingTop: '24px' }}>
                <div style={{ color: '#c0392b', fontWeight: 600, marginBottom: '4px' }}>Failed to load insights</div>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>{insightsError.message || 'An unexpected error occurred.'}</div>
              </div>
            )}
            {!insightsLoading && !insightsError && !insights && (
              <div style={{ color: '#6b7280', paddingTop: '24px' }}>No insights available for this asset.</div>
            )}
            {!insightsLoading && !insightsError && insights && (
              <div style={{ background: '#fff', padding: '16px', marginTop: '12px' }}>
                <div>Risk: {insights.riskLevel}</div>
                <div>Recommendation: {insights.recommendation}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
