import React from 'react';
import { X, Bell, Clock, AlertTriangle, CheckCircle, Info, ChevronRight } from 'lucide-react';

interface Notification {
  id: number;
  type: 'warning' | 'success' | 'info';
  title: string;
  message: string;
  time: string;
  unread: boolean;
  actionRequired?: string; // Which tab/section to navigate to
  storeId?: string; // Which store this notification belongs to
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  storeName: string;
  darkMode?: boolean;
  onNotificationClick?: (actionRequired?: string, notificationId?: number) => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ 
  isOpen, 
  onClose, 
  notifications, 
  storeName,
  darkMode = false,
  onNotificationClick
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleNotificationClick = (notification: Notification) => {
    if (onNotificationClick) {
      onNotificationClick(notification.actionRequired, notification.id);
    }
  };

  const getActionBadgeColor = (actionRequired?: string) => {
    switch (actionRequired) {
      case 'Dashboard':
        return darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800';
      case 'Alerts':
        return darkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-800';
      case 'Analytics':
        return darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800';
      case 'Insights':
        return darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-800';
      default:
        return darkMode ? 'bg-orange-900/50 text-orange-300' : 'bg-orange-100 text-orange-800';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className={`w-full max-w-md h-full shadow-xl transform transition-transform duration-300 ease-in-out ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white'
      }`}>
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-6 w-6 text-orange-500" />
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Notifications
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {storeName}
                </p>
              </div>
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
          {unreadCount > 0 && (
            <div className="mt-2 text-sm text-orange-500 font-medium">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </div>
          )}
        </div>
        
        <div className="overflow-y-auto h-full pb-20">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className={`h-12 w-12 mx-auto mb-4 ${
                darkMode ? 'text-gray-600' : 'text-gray-300'
              }`} />
              <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                No notifications for this store
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 border-b transition-all duration-200 group ${
                  darkMode ? 'border-gray-700' : 'border-gray-100'
                } ${notification.unread ? (darkMode ? 'bg-blue-900/20' : 'bg-blue-50') : ''}
                ${notification.actionRequired ? 'cursor-pointer hover:scale-[1.02] hover:bg-opacity-80' : ''}
                ${notification.actionRequired ? (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50') : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-semibold truncate ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {notification.unread && (
                          <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 animate-pulse"></span>
                        )}
                        {notification.actionRequired && (
                          <ChevronRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                        )}
                      </div>
                    </div>
                    <p className={`text-sm mt-1 leading-relaxed ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {notification.message}
                    </p>
                    <div className={`flex items-center justify-between mt-2`}>
                      <div className={`flex items-center text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{notification.time}</span>
                      </div>
                      {notification.actionRequired && (
                        <span className={`text-xs px-2 py-1 rounded-full font-medium transition-all duration-200 group-hover:scale-105 ${
                          getActionBadgeColor(notification.actionRequired)
                        }`}>
                          Go to {notification.actionRequired}
                        </span>
                      )}
                    </div>
                    {notification.storeId && notification.storeId !== storeName && (
                      <div className={`mt-2 text-xs px-2 py-1 rounded-full inline-block ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        From: {notification.storeId}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;