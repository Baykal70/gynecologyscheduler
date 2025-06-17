import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'только что';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} мин назад`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} ч назад`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} дн назад`;
    }
  };

  return (
    <div className="card">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-text-primary">
          Последняя активность
        </h2>
      </div>

      <div className="p-6">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Activity" size={32} className="text-secondary-400" />
            </div>
            <p className="text-text-secondary">Нет недавней активности</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                    <Icon 
                      name={activity.icon} 
                      size={14} 
                      className={activity.color}
                    />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary">
                    {activity.message}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>
                
                {index < activities.length - 1 && (
                  <div className="absolute left-10 mt-8 w-px h-4 bg-border"></div>
                )}
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-6 pt-4 border-t border-border">
          <button className="text-primary hover:text-primary-700 text-sm font-medium flex items-center space-x-1 w-full justify-center">
            <span>Показать всю активность</span>
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;