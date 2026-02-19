# Production Intelligence Dashboard

AI-powered production intelligence dashboard for BILSTEIN manufacturing operations. Synthesizes operator comments and maintenance logs into actionable leadership insights.

## ✨ Features

- ✅ **Fully Modular** - Each component, hook, and utility in its own file
- ✅ **Mock Data Ready** - Works out of the box with zero backend
- ✅ **Backend-Ready** - Easy to swap mock data for real API calls
- ✅ **Professional** - Follows React best practices and conventions
- ✅ **Scalable** - Easy to add new components, pages, and features
- ✅ **Well-Organized** - Clear separation of concerns
- ✅ **Documented** - Clear code comments and integration instructions

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/your username/production-intelligence.git
cd production-intelligence

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
production-intelligence/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── common/       # Shared components (Header, Button, Card, etc.)
│   │   ├── assets/       # Asset-specific components (AssetCard, AssetGrid)
│   │   ├── events/       # Event-related components (EventTimeline, EventCard)
│   │   └── insights/     # AI insights components (InsightsPanel, RiskBadge)
│   ├── pages/            # Page components (Overview, AssetDetail)
│   ├── hooks/            # Custom React hooks (useAssets, useInsights)
│   ├── services/         # API service layer (assetsService, insightsService)
│   ├── data/             # Mock data and constants
│   ├── utils/            # Utility functions (formatters, helpers)
│   ├── styles/           # Global styles and theme
│   ├── App.jsx           # Main app component with routing
│   └── main.jsx          # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Key Files

### Services (`src/services/`)

Services handle all data fetching. Currently using mock data, but structured for easy API integration:

```javascript
// src/services/assetsService.js
import { mockAssets } from '../data/mockData';

export const assetsService = {
  // Currently returns mock data
  // TODO: Replace with real API call
  getAll: async () => {
    return mockAssets;
  },
  
  getById: async (id) => {
    return mockAssets.find(a => a.id === id);
  }
};
```

### Hooks (`src/hooks/`)

Custom hooks encapsulate business logic and data fetching:

```javascript
// src/hooks/useAssets.js
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
```

### Components

All components are modular and reusable:

```javascript
// src/components/common/Card.jsx
export function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`card ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}
```

## 🔌 Integrating with Real Backend

### Step 1: Update Services

Replace mock data with real API calls in `src/services/`:

```javascript
// Before (mock):
export const assetsService = {
  getAll: async () => mockAssets
};

// After (real API):
export const assetsService = {
  getAll: async () => {
    const response = await fetch('/api/assets');
    return response.json();
  }
};
```

### Step 2: Add API Configuration

Create `src/config/api.js`:

```javascript
export const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  assets: `${API_BASE_URL}/assets`,
  events: `${API_BASE_URL}/events`,
  insights: `${API_BASE_URL}/insights`,
};
```

### Step 3: Update Service Calls

```javascript
// src/services/assetsService.js
import { API_ENDPOINTS } from '../config/api';

export const assetsService = {
  getAll: async () => {
    const response = await fetch(API_ENDPOINTS.assets);
    if (!response.ok) throw new Error('Failed to fetch assets');
    return response.json();
  },
  
  getById: async (id) => {
    const response = await fetch(`${API_ENDPOINTS.assets}/${id}`);
    if (!response.ok) throw new Error('Asset not found');
    return response.json();
  }
};
```

### Step 4: Environment Variables

Create `.env` file:

```
VITE_API_URL=https://your-api.com/api
VITE_COPILOT_ENDPOINT=https://your-copilot-studio-endpoint.com
```

## 🎨 Theming

All colors and styles are centralized in `src/styles/theme.js`:

```javascript
export const COLORS = {
  headerBg: '#2a3142',
  activeBlue: '#005baa',
  // ... etc
};
```

To change branding:
1. Update `COLORS` in `src/styles/theme.js`
2. Update fonts in `index.html`
3. Styles will automatically update across the app

## 📊 Data Flow

```
User Action
    ↓
Page Component (e.g., OverviewPage)
    ↓
Custom Hook (e.g., useAssets())
    ↓
Service Layer (e.g., assetsService.getAll())
    ↓
[Currently: Mock Data] → [Future: Real API]
    ↓
State Updates
    ↓
UI Re-renders
```

## 🧪 Mock Data

All mock data is in `src/data/mockData.js`. This includes:
- 4 production assets with availability data
- Event histories with operator comments
- AI-generated insights for each asset

The mock data structure matches the expected API response format, making the transition to real data seamless.

## 🚧 TODO: Backend Integration Checklist

- [ ] Set up API endpoints (Dataverse/Azure SQL)
- [ ] Create Copilot Studio integration
- [ ] Update services to call real APIs
- [ ] Add authentication (if required)
- [ ] Implement error handling and retry logic
- [ ] Add loading states and skeleton screens
- [ ] Set up environment variables
- [ ] Update CORS configuration
- [ ] Add API request/response logging
- [ ] Implement data caching strategy

## 📝 API Expected Format

### GET /api/assets
```json
[
  {
    "id": "M300-CONV-B",
    "name": "M300 — Packout Conveyor B",
    "shortName": "M300 - Conv B",
    "type": "Conveyor",
    "shift_available": {
      "1. Shift": 72,
      "2. Shift": 81,
      "3. Shift": 58
    },
    "total_downtime_min": 247,
    "events": [...]
  }
]
```

### GET /api/insights/{assetId}
```json
{
  "assetId": "M450-VDA",
  "topComplaints": [...],
  "pattern": "...",
  "maintenanceActions": "...",
  "openActions": [...],
  "riskLevel": "HIGH",
  "recommendation": "..."
}
```

## 🛠️ Development

### Adding a New Component

1. Create file in appropriate directory (e.g., `src/components/common/NewComponent.jsx`)
2. Export component
3. Add styles inline or in `src/styles/`
4. Import and use in parent component

### Adding a New Page

1. Create file in `src/pages/` (e.g., `SettingsPage.jsx`)
2. Add route in `src/App.jsx`
3. Update navigation if needed

### Adding a New API Endpoint

1. Add endpoint to `src/config/api.js`
2. Create service in `src/services/`
3. Create hook in `src/hooks/`
4. Use hook in components

## 📦 Dependencies

- **React 18** - UI library
- **React Router** - Routing
- **Recharts** - Charts and visualizations
- **Vite** - Build tool and dev server

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📄 License

[Your License Here]

## 👥 Team

Operations Engineering Initiative - BILSTEIN Manufacturing

---

**Need help?** Contact [your-email@bilstein.com]
