import { generateRealisticTimestamp, getRelativeTime } from '../utils/dateUtils';

export interface StoreData {
  id: string;
  name: string;
  stats: {
    totalItems: number;
    totalItemsChange: number;
    highRiskItems: number;
    potentialSavings: number;
    potentialSavingsChange: number;
    wasteReduction: number;
  };
  products: any[];
  notifications: Array<{
    id: number;
    type: 'warning' | 'success' | 'info';
    title: string;
    message: string;
    time: string;
    timestamp: Date;
    unread: boolean;
    actionRequired?: string;
    storeId?: string;
  }>;
  recentActivity?: Array<{
    action: string;
    store: string;
    time: string;
    timestamp: Date;
    productName?: string;
  }>;
  settings: {
    notifications: {
      criticalAlerts: boolean;
      dailyReports: boolean;
      peerInsights: boolean;
      systemUpdates: boolean;
    };
    display: {
      darkMode: boolean;
      compactView: boolean;
      autoRefresh: boolean;
      refreshInterval: number;
    };
    alerts: {
      criticalThreshold: number;
      warningThreshold: number;
      advanceNotice: number;
    };
  };
}

// Generate realistic notifications with actual timestamps
const generateNotifications = (storeId: string, storeName: string) => {
  const now = new Date();
  const notifications = [];
  
  // Recent critical alerts
  if (Math.random() > 0.3) {
    const timestamp = generateRealisticTimestamp(0.5); // 30 minutes ago
    notifications.push({
      id: Math.floor(Math.random() * 10000) + 1,
      type: 'warning' as const,
      title: 'High Risk Alert',
      message: `Fresh Salmon expires in 4 hours! 8 units worth $103.92 need immediate attention.`,
      time: getRelativeTime(timestamp),
      timestamp,
      unread: true,
      actionRequired: 'Alerts',
      storeId: storeName
    });
  }

  // Success notifications
  const successTimestamp = generateRealisticTimestamp(2);
  notifications.push({
    id: Math.floor(Math.random() * 10000) + 2,
    type: 'success' as const,
    title: 'Strategy Implemented',
    message: `Organic Bananas price reduction successful. 28 units sold, $238 saved.`,
    time: getRelativeTime(successTimestamp),
    timestamp: successTimestamp,
    unread: Math.random() > 0.5,
    actionRequired: 'Dashboard',
    storeId: storeName
  });

  // AI Insights
  const insightTimestamp = generateRealisticTimestamp(4);
  notifications.push({
    id: Math.floor(Math.random() * 10000) + 3,
    type: 'info' as const,
    title: 'AI Insight',
    message: `Detected 23% increase in produce demand this week. Consider adjusting order quantities.`,
    time: getRelativeTime(insightTimestamp),
    timestamp: insightTimestamp,
    unread: false,
    actionRequired: 'Analytics',
    storeId: storeName
  });

  // System updates
  const systemTimestamp = generateRealisticTimestamp(6);
  notifications.push({
    id: Math.floor(Math.random() * 10000) + 4,
    type: 'info' as const,
    title: 'System Update',
    message: `Inventory data synchronized. ${Math.floor(Math.random() * 50) + 300} items updated.`,
    time: getRelativeTime(systemTimestamp),
    timestamp: systemTimestamp,
    unread: false,
    storeId: storeName
  });

  // Peer insights notification
  const peerTimestamp = generateRealisticTimestamp(8);
  const peerStores = ['Store #1205', 'Store #0987', 'Store #2341', 'Store #5678', 'Store #4821'];
  const randomPeerStore = peerStores[Math.floor(Math.random() * peerStores.length)];
  
  notifications.push({
    id: Math.floor(Math.random() * 10000) + 5,
    type: 'info' as const,
    title: 'Peer Insight Available',
    message: `${randomPeerStore} achieved 67% waste reduction using new donation strategy. View details.`,
    time: getRelativeTime(peerTimestamp),
    timestamp: peerTimestamp,
    unread: true,
    actionRequired: 'Insights',
    storeId: storeName
  });

  // Store-specific notifications based on performance
  if (storeId === '1205') {
    const performanceTimestamp = generateRealisticTimestamp(1);
    notifications.push({
      id: Math.floor(Math.random() * 10000) + 6,
      type: 'success' as const,
      title: 'Performance Achievement',
      message: `Congratulations! You've achieved the highest waste reduction rate in the network this month.`,
      time: getRelativeTime(performanceTimestamp),
      timestamp: performanceTimestamp,
      unread: true,
      actionRequired: 'Analytics',
      storeId: storeName
    });
  }

  if (storeId === '0987') {
    const transferTimestamp = generateRealisticTimestamp(3);
    notifications.push({
      id: Math.floor(Math.random() * 10000) + 7,
      type: 'info' as const,
      title: 'Transfer Request',
      message: `Store #4821 has requested 15 units of Greek Yogurt. Accept transfer?`,
      time: getRelativeTime(transferTimestamp),
      timestamp: transferTimestamp,
      unread: true,
      actionRequired: 'Dashboard',
      storeId: storeName
    });
  }

  return notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Generate realistic recent activity
const generateRecentActivity = (storeId: string, storeName: string) => {
  const activities = [];
  
  const baseActivities = [
    'Reviewed daily analytics report',
    'Updated alert thresholds',
    'Coordinated transfer request',
    'Approved donation strategy',
    'Implemented pricing strategy',
    'Scheduled maintenance check',
    'Updated inventory targets'
  ];

  for (let i = 0; i < 5; i++) {
    const timestamp = generateRealisticTimestamp(i * 2 + 1);
    activities.push({
      action: baseActivities[i % baseActivities.length],
      store: i === 0 ? storeName : `Store #${Math.floor(Math.random() * 9999)}`,
      time: getRelativeTime(timestamp),
      timestamp
    });
  }

  return activities;
};

// Generate realistic product data with current dates
const generateProducts = (storeId: string) => {
  const now = new Date();
  const products = [];
  
  // Base products with realistic expiry dates
  const baseProducts = [
    {
      name: "Organic Bananas",
      category: "Produce",
      baseQuantity: 45,
      costPerUnit: 0.68,
      imageColor: "#fbbf24",
      daysRange: [1, 3]
    },
    {
      name: "Greek Yogurt 32oz",
      category: "Dairy",
      baseQuantity: 23,
      costPerUnit: 4.99,
      imageColor: "#3b82f6",
      daysRange: [2, 5]
    },
    {
      name: "Fresh Strawberries",
      category: "Produce",
      baseQuantity: 34,
      costPerUnit: 3.49,
      imageColor: "#ef4444",
      daysRange: [1, 2]
    },
    {
      name: "Whole Milk Gallon",
      category: "Dairy",
      baseQuantity: 28,
      costPerUnit: 3.79,
      imageColor: "#f8fafc",
      daysRange: [3, 7]
    },
    {
      name: "Sandwich Bread",
      category: "Bakery",
      baseQuantity: 19,
      costPerUnit: 2.49,
      imageColor: "#d97706",
      daysRange: [2, 5]
    },
    {
      name: "Deli Turkey Slices",
      category: "Deli",
      baseQuantity: 41,
      costPerUnit: 6.99,
      imageColor: "#f59e0b",
      daysRange: [5, 8]
    },
    {
      name: "Organic Spinach",
      category: "Produce",
      baseQuantity: 29,
      costPerUnit: 2.99,
      imageColor: "#16a34a",
      daysRange: [2, 4]
    },
    {
      name: "Rotisserie Chicken",
      category: "Deli",
      baseQuantity: 12,
      costPerUnit: 5.98,
      imageColor: "#dc2626",
      daysRange: [1, 2]
    }
  ];

  baseProducts.forEach((base, index) => {
    const daysUntilExpiry = Math.floor(Math.random() * (base.daysRange[1] - base.daysRange[0] + 1)) + base.daysRange[0];
    const expiryDate = new Date(now);
    expiryDate.setDate(expiryDate.getDate() + daysUntilExpiry);
    
    // Calculate realistic risk score based on days until expiry and other factors
    let riskScore = 100 - (daysUntilExpiry * 15); // Base risk calculation
    riskScore += Math.random() * 20 - 10; // Add variance
    riskScore = Math.max(0, Math.min(100, Math.round(riskScore)));
    
    // Adjust quantity based on store performance
    const storeMultiplier = storeId === '1205' ? 1.2 : storeId === '0987' ? 0.8 : 1.0;
    const quantity = Math.round(base.baseQuantity * storeMultiplier * (0.8 + Math.random() * 0.4));
    
    products.push({
      id: index + 1,
      name: base.name,
      category: base.category,
      quantity,
      expiryDate: expiryDate.toISOString().split('T')[0],
      riskScore,
      costPerUnit: base.costPerUnit,
      daysUntilExpiry,
      imageColor: base.imageColor,
      recommendations: generateRecommendations(base.name, riskScore, quantity, base.costPerUnit)
    });
  });

  return products;
};

const generateRecommendations = (productName: string, riskScore: number, quantity: number, costPerUnit: number) => {
  const recommendations = [];
  const totalValue = quantity * costPerUnit;
  
  if (riskScore >= 70) {
    // Price cut recommendation
    const discount = riskScore >= 90 ? 40 : riskScore >= 80 ? 30 : 20;
    const expectedSales = Math.round(quantity * (0.6 + (discount / 100)));
    recommendations.push({
      type: "price_cut",
      discount,
      expectedSales,
      savings: Math.round(expectedSales * costPerUnit * 0.8),
      description: `${discount}% discount expected to sell ${expectedSales}/${quantity} units before expiry`
    });
  }

  if (riskScore >= 80) {
    // Donation recommendation
    recommendations.push({
      type: "donate",
      organization: Math.random() > 0.5 ? "Local Food Bank" : "Community Kitchen",
      timeSlot: Math.random() > 0.5 ? "2-4 PM" : "3-5 PM",
      savings: Math.round(totalValue * 0.7),
      description: "Donation pickup available today, full tax deduction benefit"
    });
  }

  if (quantity > 20 && riskScore >= 60) {
    // Transfer recommendation
    const stores = ["Store #1205", "Store #0987", "Store #2341"];
    const randomStore = stores[Math.floor(Math.random() * stores.length)];
    recommendations.push({
      type: "relocate",
      store: randomStore,
      demand: Math.random() > 0.5 ? "High" : "Medium",
      distance: `${(Math.random() * 5 + 1).toFixed(1)} miles`,
      savings: Math.round(totalValue * 0.6),
      description: `Transfer to location with higher demand for ${productName.toLowerCase()}`
    });
  }

  return recommendations;
};

// Store-specific settings with different configurations
const getStoreSettings = (storeId: string) => {
  const baseSettings = {
    notifications: {
      criticalAlerts: true,
      dailyReports: true,
      peerInsights: true,
      systemUpdates: true
    },
    display: {
      darkMode: false,
      compactView: false,
      autoRefresh: true,
      refreshInterval: 30
    },
    alerts: {
      criticalThreshold: 80,
      warningThreshold: 60,
      advanceNotice: 2
    }
  };

  // Customize settings per store
  switch (storeId) {
    case '1205':
      return {
        ...baseSettings,
        display: {
          ...baseSettings.display,
          compactView: true,
          refreshInterval: 20
        },
        alerts: {
          criticalThreshold: 85,
          warningThreshold: 65,
          advanceNotice: 3
        }
      };
    case '0987':
      return {
        ...baseSettings,
        display: {
          ...baseSettings.display,
          darkMode: true,
          refreshInterval: 45
        },
        alerts: {
          criticalThreshold: 75,
          warningThreshold: 55,
          advanceNotice: 1
        },
        notifications: {
          ...baseSettings.notifications,
          systemUpdates: false
        }
      };
    case '2341':
      return {
        ...baseSettings,
        display: {
          ...baseSettings.display,
          compactView: true,
          autoRefresh: false,
          refreshInterval: 60
        },
        notifications: {
          ...baseSettings.notifications,
          dailyReports: false,
          peerInsights: false
        }
      };
    case '5678':
      return {
        ...baseSettings,
        display: {
          ...baseSettings.display,
          refreshInterval: 25
        },
        alerts: {
          criticalThreshold: 85,
          warningThreshold: 70,
          advanceNotice: 3
        }
      };
    default:
      return baseSettings;
  }
};

export const storeDataMap: Record<string, StoreData> = {
  "Store #4821 - Main Street": {
    id: "4821",
    name: "Store #4821 - Main Street",
    stats: {
      totalItems: 324,
      totalItemsChange: 12,
      highRiskItems: 18,
      potentialSavings: 2847,
      potentialSavingsChange: 340,
      wasteReduction: 47
    },
    products: generateProducts("4821"),
    notifications: generateNotifications("4821", "Store #4821 - Main Street"),
    recentActivity: generateRecentActivity("4821", "Store #4821 - Main Street"),
    settings: getStoreSettings("4821")
  },
  "Store #1205 - Oak Avenue": {
    id: "1205",
    name: "Store #1205 - Oak Avenue",
    stats: {
      totalItems: 298,
      totalItemsChange: 8,
      highRiskItems: 12,
      potentialSavings: 3240,
      potentialSavingsChange: 420,
      wasteReduction: 67
    },
    products: generateProducts("1205"),
    notifications: generateNotifications("1205", "Store #1205 - Oak Avenue"),
    recentActivity: generateRecentActivity("1205", "Store #1205 - Oak Avenue"),
    settings: getStoreSettings("1205")
  },
  "Store #0987 - Downtown": {
    id: "0987",
    name: "Store #0987 - Downtown",
    stats: {
      totalItems: 412,
      totalItemsChange: 18,
      highRiskItems: 24,
      potentialSavings: 2180,
      potentialSavingsChange: 280,
      wasteReduction: 41
    },
    products: generateProducts("0987"),
    notifications: generateNotifications("0987", "Store #0987 - Downtown"),
    recentActivity: generateRecentActivity("0987", "Store #0987 - Downtown"),
    settings: getStoreSettings("0987")
  },
  "Store #2341 - Westside Mall": {
    id: "2341",
    name: "Store #2341 - Westside Mall",
    stats: {
      totalItems: 356,
      totalItemsChange: 15,
      highRiskItems: 21,
      potentialSavings: 1890,
      potentialSavingsChange: 220,
      wasteReduction: 38
    },
    products: generateProducts("2341"),
    notifications: generateNotifications("2341", "Store #2341 - Westside Mall"),
    recentActivity: generateRecentActivity("2341", "Store #2341 - Westside Mall"),
    settings: getStoreSettings("2341")
  },
  "Store #5678 - North Plaza": {
    id: "5678",
    name: "Store #5678 - North Plaza",
    stats: {
      totalItems: 289,
      totalItemsChange: 6,
      highRiskItems: 14,
      potentialSavings: 2650,
      potentialSavingsChange: 310,
      wasteReduction: 52
    },
    products: generateProducts("5678"),
    notifications: generateNotifications("5678", "Store #5678 - North Plaza"),
    recentActivity: generateRecentActivity("5678", "Store #5678 - North Plaza"),
    settings: getStoreSettings("5678")
  }
};