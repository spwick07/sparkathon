import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TabContent from './components/TabContent';
import RecommendationModal from './components/RecommendationModal';
import NotificationPanel from './components/NotificationPanel';
import SettingsPanel from './components/SettingsPanel';
import ProfilePanel from './components/ProfilePanel';
import Toast from './components/Toast';
import { storeDataMap, StoreData } from './data/storeData';
import { Product } from './data/mockData';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedStore, setSelectedStore] = useState("Store #4821 - Main Street");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentStoreData, setCurrentStoreData] = useState<StoreData>(storeDataMap[selectedStore]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning'; isVisible: boolean }>({
    message: '',
    type: 'info',
    isVisible: false
  });

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update store data when store selection changes
  useEffect(() => {
    const newStoreData = storeDataMap[selectedStore];
    if (newStoreData) {
      setCurrentStoreData(newStoreData);
      setToast({
        message: `Switched to ${selectedStore}`,
        type: 'info',
        isVisible: true
      });
    }
  }, [selectedStore]);

  // Apply dark mode class to document root
  useEffect(() => {
    const root = document.documentElement;
    if (currentStoreData.settings.display.darkMode) {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#111827';
      document.body.style.color = '#ffffff';
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#f9fafb';
      document.body.style.color = '#111827';
    }
  }, [currentStoreData.settings.display.darkMode]);

  // Auto-refresh data based on store settings (but only update product quantities, not analytics)
  useEffect(() => {
    if (!currentStoreData.settings.display.autoRefresh) return;

    const interval = currentStoreData.settings.display.refreshInterval * 1000;
    const timer = setInterval(() => {
      // Only simulate minor product updates, not major analytics changes
      setCurrentStoreData(prev => {
        const updated = {
          ...prev,
          stats: {
            ...prev.stats,
            // Only small changes to stats
            totalItems: prev.stats.totalItems + Math.floor(Math.random() * 3) - 1,
            potentialSavings: prev.stats.potentialSavings + Math.floor(Math.random() * 50) - 25,
            highRiskItems: Math.max(0, prev.stats.highRiskItems + Math.floor(Math.random() * 2) - 1)
          },
          products: prev.products.map(product => ({
            ...product,
            // Only minor quantity adjustments
            quantity: Math.max(0, product.quantity + Math.floor(Math.random() * 2) - 1),
            // Very small risk score changes
            riskScore: Math.min(100, Math.max(0, product.riskScore + Math.floor(Math.random() * 3) - 1))
          }))
        };
        
        // Update global store data
        storeDataMap[selectedStore] = updated;
        return updated;
      });

      if (currentStoreData.settings.notifications.systemUpdates) {
        setToast({
          message: `${selectedStore}: Inventory data updated`,
          type: 'info',
          isVisible: true
        });
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [currentStoreData.settings.display.autoRefresh, currentStoreData.settings.display.refreshInterval, selectedStore, currentStoreData.settings.notifications.systemUpdates]);

  // Show critical alerts based on store settings
  useEffect(() => {
    if (!currentStoreData.settings.notifications.criticalAlerts) return;

    const timer = setInterval(() => {
      const criticalProducts = currentStoreData.products.filter(p => 
        p.riskScore >= currentStoreData.settings.alerts.criticalThreshold
      );

      if (criticalProducts.length > 0) {
        const randomProduct = criticalProducts[Math.floor(Math.random() * criticalProducts.length)];
        setToast({
          message: `${selectedStore}: Critical alert - ${randomProduct.name} needs immediate attention! (Risk: ${randomProduct.riskScore}%)`,
          type: 'warning',
          isVisible: true
        });
      }
    }, 90000); // Every 1.5 minutes

    return () => clearInterval(timer);
  }, [selectedStore, currentStoreData.settings.notifications.criticalAlerts, currentStoreData.settings.alerts.criticalThreshold, currentStoreData.products]);

  // Daily reports notification
  useEffect(() => {
    if (!currentStoreData.settings.notifications.dailyReports) return;

    const now = new Date();
    const isReportTime = now.getHours() === 9 && now.getMinutes() === 0; // 9 AM daily report

    if (isReportTime) {
      setToast({
        message: `${selectedStore}: Daily waste management report is ready for review`,
        type: 'info',
        isVisible: true
      });
    }
  }, [currentTime, currentStoreData.settings.notifications.dailyReports, selectedStore]);

  // Peer insights notifications
  useEffect(() => {
    if (!currentStoreData.settings.notifications.peerInsights) return;

    const timer = setInterval(() => {
      const insights = [
        `Store #1205 achieved 67% waste reduction using banana donation strategy`,
        `Store #0987 improved seafood sales with 40% discount timing`,
        `Network coordination saved $2,340 across 3 stores yesterday`,
        `Best practice alert: Weekend produce bundles showing 85% success rate`,
        `Store #2341 reduced dairy waste by 45% with smart pricing algorithms`,
        `Peer insight: Morning bakery discounts increase sell-through by 60%`
      ];

      const randomInsight = insights[Math.floor(Math.random() * insights.length)];
      setToast({
        message: `Peer Insight: ${randomInsight}`,
        type: 'info',
        isVisible: true
      });
    }, 180000); // Every 3 minutes

    return () => clearInterval(timer);
  }, [currentStoreData.settings.notifications.peerInsights]);

  const addRecentActivity = (action: string, productName?: string) => {
    const newActivity = {
      action,
      store: selectedStore,
      time: 'Just now',
      timestamp: new Date(),
      productName
    };

    // Update current store data
    const updatedStoreData = {
      ...currentStoreData,
      recentActivity: [newActivity, ...(currentStoreData.recentActivity || [])].slice(0, 10)
    };

    setCurrentStoreData(updatedStoreData);
    storeDataMap[selectedStore] = updatedStoreData;

    // Also update all other stores' global data to maintain consistency
    Object.keys(storeDataMap).forEach(storeKey => {
      if (storeKey !== selectedStore) {
        const storeData = storeDataMap[storeKey];
        storeData.recentActivity = [newActivity, ...(storeData.recentActivity || [])].slice(0, 10);
      }
    });
  };

  const addNotification = (type: 'warning' | 'success' | 'info', title: string, message: string, actionRequired?: string) => {
    const newNotification = {
      id: Date.now(),
      type,
      title,
      message,
      time: 'Just now',
      timestamp: new Date(),
      unread: true,
      actionRequired,
      storeId: selectedStore
    };

    const updatedStoreData = {
      ...currentStoreData,
      notifications: [newNotification, ...currentStoreData.notifications]
    };

    setCurrentStoreData(updatedStoreData);
    storeDataMap[selectedStore] = updatedStoreData;
  };

  const markNotificationAsRead = (notificationId: number) => {
    const updatedNotifications = currentStoreData.notifications.map(notification =>
      notification.id === notificationId ? { ...notification, unread: false } : notification
    );

    const updatedStoreData = {
      ...currentStoreData,
      notifications: updatedNotifications
    };

    setCurrentStoreData(updatedStoreData);
    storeDataMap[selectedStore] = updatedStoreData;
  };

  const handleStoreChange = (store: string) => {
    setSelectedStore(store);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setToast({
      message: `Switched to ${tab} view for ${selectedStore}`,
      type: 'info',
      isVisible: true
    });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
  };

  const handleNotificationClick = () => {
    setShowNotifications(true);
    setShowSettings(false);
    setShowProfile(false);
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
    setShowNotifications(false);
    setShowProfile(false);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowNotifications(false);
    setShowSettings(false);
  };

  const handleSettingsUpdate = (newSettings: any) => {
    const updatedStoreData = {
      ...currentStoreData,
      settings: newSettings
    };
    
    setCurrentStoreData(updatedStoreData);
    
    // Update the global store data immediately
    storeDataMap[selectedStore] = updatedStoreData;

    setToast({
      message: `Settings updated successfully for ${selectedStore}`,
      type: 'success',
      isVisible: true
    });
  };

  const handleActionTaken = (action: string) => {
    let message = '';
    let savingsIncrease = 0;
    let actionDescription = '';
    
    switch (action) {
      case 'price_cut':
        message = `${selectedStore}: Price reduction applied successfully! Customers are responding well.`;
        actionDescription = `Applied price reduction for ${selectedProduct?.name}`;
        savingsIncrease = Math.floor(Math.random() * 150) + 50;
        break;
      case 'donate':
        message = `${selectedStore}: Donation pickup scheduled successfully! Partner notified.`;
        actionDescription = `Scheduled donation pickup for ${selectedProduct?.name}`;
        savingsIncrease = Math.floor(Math.random() * 200) + 75;
        break;
      case 'relocate':
        message = `${selectedStore}: Transfer request sent to partner store! Pickup confirmed.`;
        actionDescription = `Initiated transfer for ${selectedProduct?.name}`;
        savingsIncrease = Math.floor(Math.random() * 180) + 60;
        break;
      case 'promote':
        message = `${selectedStore}: Promotion activated successfully! Featured in displays.`;
        actionDescription = `Activated promotion for ${selectedProduct?.name}`;
        savingsIncrease = Math.floor(Math.random() * 120) + 40;
        break;
      default:
        message = `${selectedStore}: Action completed successfully! System updated.`;
        actionDescription = `Completed action for ${selectedProduct?.name}`;
        savingsIncrease = Math.floor(Math.random() * 100) + 25;
    }
    
    // Add to recent activity
    addRecentActivity(actionDescription, selectedProduct?.name);
    
    // Add success notification
    addNotification('success', 'Strategy Implemented', `${actionDescription} - Expected savings: $${savingsIncrease}`, 'Dashboard');
    
    setToast({
      message,
      type: 'success',
      isVisible: true
    });

    // Update current store stats
    const updatedStats = {
      ...currentStoreData.stats,
      potentialSavings: currentStoreData.stats.potentialSavings + savingsIncrease,
      highRiskItems: Math.max(0, currentStoreData.stats.highRiskItems - 1),
      potentialSavingsChange: currentStoreData.stats.potentialSavingsChange + savingsIncrease
    };

    const updatedProducts = currentStoreData.products.map(product => 
      product.id === selectedProduct?.id 
        ? { ...product, riskScore: Math.max(0, product.riskScore - 20) }
        : product
    );

    const updatedStoreData = {
      ...currentStoreData,
      stats: updatedStats,
      products: updatedProducts
    };

    setCurrentStoreData(updatedStoreData);
    storeDataMap[selectedStore] = updatedStoreData;
  };

  const handleNotificationNavigation = (actionRequired?: string, notificationId?: number) => {
    if (notificationId) {
      markNotificationAsRead(notificationId);
    }
    
    if (actionRequired) {
      setActiveTab(actionRequired);
      setShowNotifications(false);
      setToast({
        message: `Navigated to ${actionRequired} section`,
        type: 'info',
        isVisible: true
      });
    }
  };

  const handleToastClose = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      currentStoreData.settings.display.darkMode 
        ? 'dark bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <Header 
        currentTime={currentTime}
        activeTab={activeTab}
        selectedStore={selectedStore}
        onTabChange={handleTabChange}
        onStoreChange={handleStoreChange}
        onNotificationClick={handleNotificationClick}
        onSettingsClick={handleSettingsClick}
        onProfileClick={handleProfileClick}
        notificationCount={currentStoreData.notifications.filter(n => n.unread).length}
        darkMode={currentStoreData.settings.display.darkMode}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            AI Waste Management Dashboard
          </h1>
          <p className={`text-lg ${currentStoreData.settings.display.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Intelligent insights for {selectedStore} • Last updated: {currentTime.toLocaleTimeString()}
            {currentStoreData.settings.display.autoRefresh && (
              <span className="ml-2 text-sm bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-2 py-1 rounded-full">
                Auto-refresh: {currentStoreData.settings.display.refreshInterval}s
              </span>
            )}
          </p>
        </div>

        <TabContent 
          activeTab={activeTab}
          stats={currentStoreData.stats}
          products={currentStoreData.products}
          onProductClick={handleProductClick}
          storeName={selectedStore}
          compactView={currentStoreData.settings.display.compactView}
          darkMode={currentStoreData.settings.display.darkMode}
          alertThresholds={currentStoreData.settings.alerts}
        />
      </main>

      <RecommendationModal
        product={selectedProduct}
        onClose={handleModalClose}
        onActionTaken={handleActionTaken}
        darkMode={currentStoreData.settings.display.darkMode}
      />

      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={currentStoreData.notifications}
        storeName={selectedStore}
        darkMode={currentStoreData.settings.display.darkMode}
        onNotificationClick={handleNotificationNavigation}
      />

      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={currentStoreData.settings}
        onSettingsUpdate={handleSettingsUpdate}
        storeName={selectedStore}
        darkMode={currentStoreData.settings.display.darkMode}
      />

      <ProfilePanel
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        currentStore={selectedStore}
        darkMode={currentStoreData.settings.display.darkMode}
        recentActivity={currentStoreData.recentActivity || []}
        onQuickAction={(action) => {
          if (action === 'analytics') setActiveTab('Analytics');
          if (action === 'alerts') setActiveTab('Alerts');
          if (action === 'insights') setActiveTab('Insights');
          if (action === 'settings') setShowSettings(true);
          setShowProfile(false);
        }}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={handleToastClose}
        darkMode={currentStoreData.settings.display.darkMode}
      />
    </div>
  );
}

export default App;