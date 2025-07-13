import React from 'react';
import { Rocket, Clock, Bell, Settings, User, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentTime: Date;
  activeTab: string;
  selectedStore: string;
  onTabChange: (tab: string) => void;
  onStoreChange: (store: string) => void;
  onNotificationClick: () => void;
  onSettingsClick: () => void;
  onProfileClick: () => void;
  notificationCount: number;
  darkMode?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  currentTime, 
  activeTab, 
  selectedStore,
  onTabChange,
  onStoreChange,
  onNotificationClick,
  onSettingsClick,
  onProfileClick,
  notificationCount,
  darkMode = false
}) => {
  const stores = [
    "Store #4821 - Main Street",
    "Store #1205 - Oak Avenue", 
    "Store #0987 - Downtown",
    "Store #2341 - Westside Mall",
    "Store #5678 - North Plaza"
  ];

  const tabs = ["Dashboard", "Alerts", "Analytics", "Insights"];

  return (
    <header className={`shadow-lg transition-colors duration-300 ${
      darkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-blue-600 to-purple-700 text-white'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white/10'}`}>
                <Rocket className="h-8 w-8 text-orange-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Datanauts</h1>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  darkMode 
                    ? 'bg-orange-400 text-gray-900' 
                    : 'bg-orange-400 text-gray-900'
                }`}>
                  AI Waste Management
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <select 
                  value={selectedStore}
                  onChange={(e) => onStoreChange(e.target.value)}
                  className={`border rounded-lg px-3 py-2 text-sm pr-8 appearance-none cursor-pointer transition-colors ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white'
                      : 'bg-white/10 border-white/20 hover:bg-white/20 text-white backdrop-blur-sm'
                  }`}
                >
                  {stores.map((store) => (
                    <option key={store} value={store} className="bg-white text-gray-900">
                      {store}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 text-sm rounded-lg px-3 py-2 ${
              darkMode ? 'bg-gray-700' : 'bg-white/10 backdrop-blur-sm'
            }`}>
              <Clock className="h-4 w-4" />
              <span className="font-mono">
                {currentTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </span>
            </div>
            <button 
              onClick={onNotificationClick}
              className={`relative p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-white/10'
              }`}
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {notificationCount}
                </span>
              )}
            </button>
            <button 
              onClick={onSettingsClick}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-white/10'
              }`}
            >
              <Settings className="h-5 w-5" />
            </button>
            <button 
              onClick={onProfileClick}
              className={`flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-white/10'
              }`}
            >
              <User className="h-5 w-5" />
              <span className="hidden sm:block text-sm">Manager</span>
            </button>
          </div>
        </div>
        
        <div className="mt-4">
          <nav className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`pb-2 border-b-2 transition-all duration-300 font-medium ${
                  activeTab === tab
                    ? darkMode
                      ? 'border-orange-400 text-orange-400 transform scale-105'
                      : 'border-orange-400 text-orange-400 transform scale-105'
                    : darkMode
                      ? 'border-transparent hover:border-gray-400 hover:text-gray-300 hover:scale-105'
                      : 'border-transparent hover:border-white/50 hover:text-white/90 hover:scale-105'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;