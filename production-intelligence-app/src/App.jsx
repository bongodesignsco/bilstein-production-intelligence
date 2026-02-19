import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OverviewPage from './pages/OverviewPage';
import AssetDetailPage from './pages/AssetDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/asset/:assetId" element={<AssetDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
