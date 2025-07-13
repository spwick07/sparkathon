import React from 'react';
import { X, User, MapPin, Clock, Award, BarChart3, Settings, LogOut, Rocket, AlertTriangle, TrendingUp, Eye, Bell } from 'lucide-react';

interface RecentActivity {
  action: string;
  store: string;
  time: string;
  timestamp: Date;
  productName?: string;
}

interface ProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentStore: string;
  darkMode?: boolean;
  recentActivity?: RecentActivity[];
  onQuickAction?: (action: string) => void;
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({ 
  isOpen, 
  onClose, 
  currentStore,
  darkMode = false,
  recentActivity = [],
  onQuickAction
}) => {
  const managerStats = {
    storesManaged: 5,
    totalSavings: 28470,
    wasteReduction: 47,
    efficiency: 94
  };

  const defaultActivity = [
    { action: 'Reviewed daily analytics report', store: currentStore, time: '1 hour ago', timestamp: new Date(), productName: undefined },
    { action: 'Updated alert thresholds', store: 'All Stores', time: '3 hours ago', timestamp: new Date(), productName: undefined },
    { action: 'Coordinated transfer request', store: 'Store #0987', time: '1 day ago', timestamp: new Date(), productName: undefined },
    { action: 'Approved donation strategy', store: 'Store #1205', time: '2 days ago', timestamp: new Date(), productName: undefined }
  ];

  const displayActivity = recentActivity.length > 0 ? recentActivity : defaultActivity;

  const storePerformance = {
    "Store #4821 - Main Street": { savings: 2847, reduction: 47, efficiency: 89 },
    "Store #1205 - Oak Avenue": { savings: 3240, reduction: 67, efficiency: 95 },
    "Store #0987 - Downtown": { savings: 2180, reduction: 41, efficiency: 87 },
    "Store #2341 - Westside Mall": { savings: 1890, reduction: 38, efficiency: 82 },
    "Store #5678 - North Plaza": { savings: 2650, reduction: 52, efficiency: 91 }
  };

  const quickActions = [
    { id: 'analytics', label: 'View Analytics Dashboard', icon: BarChart3, color: 'blue' },
    { id: 'alerts', label: 'Check Critical Alerts', icon: AlertTriangle, color: 'red' },
    { id: 'insights', label: 'Peer Insights Report', icon: TrendingUp, color: 'green' },
    { id: 'settings', label: 'System Settings', icon: Settings, color: 'gray' }
  ];

  const handleQuickAction = (actionId: string) => {
    if (onQuickAction) {
      onQuickAction(actionId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className={`w-full max-w-md h-full shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white'
      }`}>
        <div className={`p-6 border-b sticky top-0 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-6 w-6 text-orange-500" />
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Profile
              </h2>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Profile Info */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-10 w-10 text-white" />
            </div>
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Team Lead
            </h3>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Regional Manager - Datanauts
            </p>
            <div className={`flex items-center justify-center space-x-1 mt-2 text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <MapPin className="h-4 w-4" />
              <span>Northwest Region</span>
            </div>
            <div className="flex items-center justify-center space-x-1 mt-1 text-sm text-orange-500">
              <Rocket className="h-4 w-4" />
              <span>Currently viewing: {currentStore}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Quick Actions
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const IconComponent = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.id)}
                    className={`p-4 rounded-lg text-center transition-all duration-200 hover:scale-105 ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className={`h-6 w-6 mx-auto mb-2 ${
                      action.color === 'blue' ? 'text-blue-500' :
                      action.color === 'red' ? 'text-red-500' :
                      action.color === 'green' ? 'text-green-500' :
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`} />
                    <span className={`text-xs font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Overall Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg text-center ${
              darkMode ? 'bg-blue-900/30' : 'bg-blue-50'
            }`}>
              <div className="text-2xl font-bold text-orange-500">{managerStats.storesManaged}</div>
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Stores Managed
              </div>
            </div>
            <div className={`p-4 rounded-lg text-center ${
              darkMode ? 'bg-green-900/30' : 'bg-green-50'
            }`}>
              <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                ${managerStats.totalSavings.toLocaleString()}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Savings
              </div>
            </div>
            <div className={`p-4 rounded-lg text-center ${
              darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50'
            }`}>
              <div className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                {managerStats.wasteReduction}%
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Avg. Reduction
              </div>
            </div>
            <div className={`p-4 rounded-lg text-center ${
              darkMode ? 'bg-purple-900/30' : 'bg-purple-50'
            }`}>
              <div className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                {managerStats.efficiency}%
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Efficiency
              </div>
            </div>
          </div>

          {/* Current Store Performance */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 flex items-center ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <Rocket className={`h-5 w-5 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              Current Store Performance
            </h4>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h5 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {currentStore}
              </h5>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                    ${storePerformance[currentStore as keyof typeof storePerformance]?.savings || 0}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Savings
                  </div>
                </div>
                <div>
                  <div className={`text-lg font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {storePerformance[currentStore as keyof typeof storePerformance]?.reduction || 0}%
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Reduction
                  </div>
                </div>
                <div>
                  <div className={`text-lg font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                    {storePerformance[currentStore as keyof typeof storePerformance]?.efficiency || 0}%
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Efficiency
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 flex items-center ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <Clock className={`h-5 w-5 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              Recent Activity
            </h4>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {displayActivity.slice(0, 8).map((activity, index) => (
                <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg transition-colors hover:scale-[1.02] ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                }`}>
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {activity.action}
                      {activity.productName && (
                        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                          darkMode ? 'bg-orange-900/50 text-orange-300' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {activity.productName}
                        </span>
                      )}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {activity.store} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Quick Actions */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Management Tools
            </h4>
            <div className="space-y-2">
              <button 
                onClick={() => handleQuickAction('analytics')}
                className={`w-full flex items-center space-x-3 p-3 text-left rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}
              >
                <BarChart3 className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  View Regional Report
                </span>
              </button>
              <button 
                onClick={() => handleQuickAction('alerts')}
                className={`w-full flex items-center space-x-3 p-3 text-left rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}
              >
                <Award className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Performance Dashboard
                </span>
              </button>
              <button 
                onClick={() => handleQuickAction('settings')}
                className={`w-full flex items-center space-x-3 p-3 text-left rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}
              >
                <Settings className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Account Settings
                </span>
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className={`pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button className={`w-full flex items-center justify-center space-x-2 p-3 text-red-600 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-red-900/20' : 'hover:bg-red-50'
            }`}>
              <LogOut className="h-5 w-5" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;