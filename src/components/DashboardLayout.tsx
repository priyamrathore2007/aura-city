import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Globe, LayoutDashboard, MapPin, Camera, Cpu, Server,
  CloudRain, Building2, Send, TrendingUp, Bell,
  Search, LogOut
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { path: '/dashboard/map', label: 'Satellite & GIS Map', icon: MapPin },
  { path: '/dashboard/dashcam', label: 'Dashcam Intelligence', icon: Camera },
  { path: '/dashboard/approvals', label: 'AI Approval Engine', icon: Cpu },
  { path: '/dashboard/floods', label: 'Drainage & Floods', icon: CloudRain },
  { path: '/dashboard/landuse', label: 'Buildings & Land-Use', icon: Building2 },
  { path: '/dashboard/citizens', label: 'Citizen Portal', icon: Send },
  { path: '/dashboard/budget', label: 'Budget & Priorities', icon: TrendingUp },
  { path: '/dashboard/apis', label: 'API & Datasets', icon: Server },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex h-screen bg-[#eef2e3] text-[#000000] overflow-hidden font-sans">

      {/* SIDEBAR */}
      <aside className={`${collapsed ? 'w-16' : 'w-60'} bg-[#fcfcfc] border-r border-[#000000]/10 flex flex-col transition-all duration-200 shrink-0`}>
        {/* Logo / Globe Button (Clicking toggles collapse/expand) */}
        <div
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center ${collapsed ? 'justify-center px-0' : 'space-x-2.5 px-5'} py-4 border-b border-[#000000]/10 cursor-pointer hover:bg-[#eef2e3]/40 transition`}
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <div className="h-8 w-8 shrink-0 rounded-[4px] bg-[#043f2e] flex items-center justify-center shadow-sm">
            <Globe className="h-4 w-4 text-[#c8f169]" />
          </div>
          {!collapsed && (
            <span className="font-serif text-[#043f2e] tracking-tight text-base">
              AuraCity
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center ${collapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-2.5 rounded-[4px] text-xs font-medium transition group relative ${
                    isActive
                      ? 'bg-[#c8f169] text-[#000000] font-semibold'
                      : 'text-[#242423] hover:bg-[#eef2e3]'
                  }`
                }
                title={collapsed ? item.label : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-[#000000]/10 p-3 bg-[#fcfcfc]">
          <button
            onClick={() => navigate('/')}
            className={`w-full flex items-center ${collapsed ? 'justify-center' : 'space-x-3 px-1'} py-2 rounded-[4px] text-xs text-rose-700 hover:bg-rose-50 transition`}
            title="Back to Landing"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Exit Dashboard</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#eef2e3]">
        {/* Top Bar */}
        <header className="bg-[#fcfcfc] border-b border-[#000000]/10 px-6 py-3 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#242423]" />
              <input
                type="text"
                placeholder="Search wards, assets, sensors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#eef2e3] border border-[#000000]/10 rounded-[4px] pl-8 pr-4 py-2 text-xs text-[#000000] placeholder-[#242423] focus:outline-none focus:border-[#043f2e] transition w-64"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 bg-[#c8f169] text-[#000000] text-xs px-3 py-1.5 rounded-[4px] font-mono font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-[#043f2e] animate-ping inline-block"></span>
              <span>45 Dashcams Active</span>
            </div>

            <button className="relative p-2 rounded-[4px] hover:bg-[#eef2e3] text-[#043f2e] transition border border-[#000000]/10">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#c8f169]"></span>
            </button>

            <div className="flex items-center space-x-2 pl-3 border-l border-[#000000]/10">
              <div className="h-8 w-8 rounded-[4px] bg-[#043f2e] text-[#c8f169] flex items-center justify-center text-xs font-bold">
                RC
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-serif text-[#043f2e]">Raipur Municipal Corp</div>
                <div className="text-[10px] text-[#242423] font-mono">Command Officer</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto bg-[#eef2e3]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
