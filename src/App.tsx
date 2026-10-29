import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import DashboardLayout from './components/DashboardLayout';
import Overview from './pages/Overview';
import MapPage from './pages/MapPage';
import DashcamPage from './pages/DashcamPage';
import ApprovalsPage from './pages/ApprovalsPage';
import FloodsPage from './pages/FloodsPage';
import LandusePage from './pages/LandusePage';
import CitizensPage from './pages/CitizensPage';
import BudgetPage from './pages/BudgetPage';
import ApiRegistryPage from './pages/ApiRegistryPage';
import AnimatedPage from './components/AnimatedPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<AnimatedPage><Overview /></AnimatedPage>} />
          <Route path="map" element={<AnimatedPage><MapPage /></AnimatedPage>} />
          <Route path="dashcam" element={<AnimatedPage><DashcamPage /></AnimatedPage>} />
          <Route path="approvals" element={<AnimatedPage><ApprovalsPage /></AnimatedPage>} />
          <Route path="floods" element={<AnimatedPage><FloodsPage /></AnimatedPage>} />
          <Route path="landuse" element={<AnimatedPage><LandusePage /></AnimatedPage>} />
          <Route path="citizens" element={<AnimatedPage><CitizensPage /></AnimatedPage>} />
          <Route path="budget" element={<AnimatedPage><BudgetPage /></AnimatedPage>} />
          <Route path="apis" element={<AnimatedPage><ApiRegistryPage /></AnimatedPage>} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
