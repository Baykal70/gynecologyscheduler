import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ stat }) => {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">
            {stat.title}
          </p>
          <p className="text-3xl font-bold text-text-primary mb-2">
            {stat.value}
          </p>
          <div className="flex items-center space-x-1">
            <Icon 
              name={stat.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
              size={16} 
              className={stat.changeType === 'positive' ? 'text-success' : 'text-error'} 
            />
            <span className={`text-sm ${stat.changeType === 'positive' ? 'text-success' : 'text-error'}`}>
              {stat.change}
            </span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
          <Icon name={stat.icon} size={24} color="white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;