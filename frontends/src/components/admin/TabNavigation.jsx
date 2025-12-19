import React from 'react';
import { Hotel, Users, Calendar, TrendingUp, BarChart3, Settings, Bell } from 'lucide-react';

const TabNavigation = ({ activeTab, setActiveTab, setShowAddHotel, setEditingHotel }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'stats', label: 'Statistics', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: Settings }
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-2 mb-8 border border-gray-700">
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              if (tab.id !== 'hotels') {
                setShowAddHotel(false);
                setEditingHotel(null);
              }
            }}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
