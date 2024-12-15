
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";

import OverviewPage from "./pages/OverviewPage";
import PlansPage from "./pages/PlansPage";
import UsersPage from "./pages/UsersPage";
import VisitorsPage from "./pages/VisitorsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import VisitPage from "./pages/VisitPage";


function App() {
  return (
      <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        <Sidebar />
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/visitpage" element={<VisitPage />} />
          <Route path="/visitors" element={<VisitorsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
  );
}

export default App;
