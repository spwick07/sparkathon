import React from 'react';
import { Store, Award, Users, TrendingUp } from 'lucide-react';

interface PeerInsightsProps {
  compactView?: boolean;
  darkMode?: boolean;
}

const PeerInsights: React.FC<PeerInsightsProps> = ({ 
  compactView = false,
  darkMode = false 
}) => {
  const insights = [
    {
      id: 1,
      type: 'success',
      icon: <Store className="h-5 w-5" />,
      title: 'Store #1205 saved $1,340 yesterday',
      description: 'by coordinating banana donations with local food bank',
      color: darkMode 
        ? 'bg-green-900/30 border-green-700 text-green-300' 
        : 'bg-green-50 border-green-200 text-green-800'
    },
    {
      id: 2,
      type: 'best_practice',
      icon: <Award className="h-5 w-5" />,
      title: 'Best Practice Alert',
      description: 'Store #0987 uses 2-day discount strategy for dairy products with 89% success rate',
      color: darkMode 
        ? 'bg-blue-900/30 border-blue-700 text-blue-300' 
        : 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      id: 3,
      type: 'network',
      icon: <Users className="h-5 w-5" />,
      title: 'Network Coordination Opportunity',
      description: '5 nearby stores have excess bread - coordinate pickup to reduce waste',
      color: darkMode 
        ? 'bg-purple-900/30 border-purple-700 text-purple-300' 
        : 'bg-purple-50 border-purple-200 text-purple-800'
    },
    {
      id: 4,
      type: 'trending',
      icon: <TrendingUp className="h-5 w-5" />,
      title: 'Trending Strategy',
      description: 'Weekend produce bundle promotions showing 67% improvement in sell-through rates',
      color: darkMode 
        ? 'bg-yellow-900/30 border-yellow-700 text-yellow-300' 
        : 'bg-yellow-50 border-yellow-200 text-yellow-800'
    }
  ];

  return (
    <div className={`rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`border-b p-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Peer Insights
        </h2>
        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Success stories and best practices from your network
        </p>
      </div>
      
      <div className={`${compactView ? 'p-4' : 'p-6'}`}>
        <div className={`space-y-4 ${compactView ? 'space-y-3' : 'space-y-4'}`}>
          {insights.map((insight) => (
            <div key={insight.id} className={`p-4 rounded-lg border-2 ${insight.color}`}>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {insight.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${compactView ? 'text-sm' : 'text-sm'}`}>
                    {insight.title}
                  </h3>
                  <p className={`mt-1 opacity-90 ${compactView ? 'text-xs' : 'text-sm'}`}>
                    {insight.description}
                  </p>
                </div>
                <button className={`text-xs px-3 py-1 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75 transition-colors ${
                  compactView ? 'px-2 py-0.5' : 'px-3 py-1'
                }`}>
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeerInsights;