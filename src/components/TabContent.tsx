import React from 'react';
import StatsGrid from './StatsGrid';
import AlertsFeed from './AlertsFeed';
import AnalyticsSection from './AnalyticsSection';
import PeerInsights from './PeerInsights';
import { Product } from '../data/mockData';

interface TabContentProps {
  activeTab: string;
  stats: any;
  products: Product[];
  onProductClick: (product: Product) => void;
  storeName: string;
  compactView?: boolean;
  darkMode?: boolean;
  alertThresholds?: {
    criticalThreshold: number;
    warningThreshold: number;
    advanceNotice: number;
  };
}

const TabContent: React.FC<TabContentProps> = ({ 
  activeTab, 
  stats, 
  products, 
  onProductClick, 
  storeName,
  compactView = false,
  darkMode = false,
  alertThresholds = { criticalThreshold: 80, warningThreshold: 60, advanceNotice: 2 }
}) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <>
            <StatsGrid 
              stats={stats} 
              products={products}
              storeName={storeName}
              compactView={compactView}
              darkMode={darkMode}
            />
            <div className={`grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8 ${compactView ? 'gap-4' : 'gap-8'}`}>
              <div className="xl:col-span-2">
                <AlertsFeed 
                  products={products} 
                  onProductClick={onProductClick}
                  compactView={compactView}
                  darkMode={darkMode}
                  alertThresholds={alertThresholds}
                />
              </div>
              <div>
                <PeerInsights 
                  compactView={compactView}
                  darkMode={darkMode}
                />
              </div>
            </div>
            <AnalyticsSection 
              compactView={compactView}
              darkMode={darkMode}
            />
          </>
        );
      
      case 'Alerts':
        return (
          <div className="space-y-8">
            <div>
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Alert Management
              </h2>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Monitor and manage all product alerts for {storeName}
              </p>
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-blue-800'}`}>
                  <strong>Alert Thresholds:</strong> Critical: {alertThresholds.criticalThreshold}% • 
                  Warning: {alertThresholds.warningThreshold}% • 
                  Advance Notice: {alertThresholds.advanceNotice} days
                </p>
              </div>
            </div>
            <StatsGrid 
              stats={stats} 
              products={products}
              storeName={storeName}
              compactView={compactView}
              darkMode={darkMode}
            />
            <AlertsFeed 
              products={products} 
              onProductClick={onProductClick}
              compactView={compactView}
              darkMode={darkMode}
              alertThresholds={alertThresholds}
            />
          </div>
        );
      
      case 'Analytics':
        return (
          <div className="space-y-8">
            <div>
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Analytics Dashboard
              </h2>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Comprehensive insights for {storeName}
              </p>
            </div>
            <StatsGrid 
              stats={stats} 
              products={products}
              storeName={storeName}
              compactView={compactView}
              darkMode={darkMode}
            />
            <AnalyticsSection 
              compactView={compactView}
              darkMode={darkMode}
            />
          </div>
        );
      
      case 'Insights':
        return (
          <div className="space-y-8">
            <div>
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Peer Insights & Best Practices
              </h2>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Learn from successful strategies across the network
              </p>
            </div>
            <div className={`grid grid-cols-1 lg:grid-cols-2 ${compactView ? 'gap-4' : 'gap-8'}`}>
              <PeerInsights 
                compactView={compactView}
                darkMode={darkMode}
              />
              <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Network Performance
                </h3>
                <div className="space-y-4">
                  <div className={`flex justify-between items-center p-4 rounded-lg ${darkMode ? 'bg-green-900/30' : 'bg-green-50'}`}>
                    <div>
                      <h4 className={`font-semibold ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
                        Top Performer
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                        Store #1205 - 67% waste reduction
                      </p>
                    </div>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      $3,240
                    </div>
                  </div>
                  <div className={`flex justify-between items-center p-4 rounded-lg ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                    <div>
                      <h4 className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                        Most Improved
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        Store #0987 - 45% improvement
                      </p>
                    </div>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      $2,180
                    </div>
                  </div>
                  <div className={`flex justify-between items-center p-4 rounded-lg ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50'}`}>
                    <div>
                      <h4 className={`font-semibold ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                        Your Store
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                        {storeName}
                      </p>
                    </div>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                      ${stats.potentialSavings}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>;
};

export default TabContent;