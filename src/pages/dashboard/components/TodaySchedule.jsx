import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const TodaySchedule = ({ surgeries, selectedDate, formatDate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-white';
      case 'in-progress':
        return 'bg-warning text-white';
      case 'scheduled':
        return 'bg-primary text-white';
      case 'delayed':
        return 'bg-error text-white';
      default:
        return 'bg-secondary-200 text-secondary-700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Завершена';
      case 'in-progress':
        return 'В процессе';
      case 'scheduled':
        return 'Запланирована';
      case 'delayed':
        return 'Отложена';
      default:
        return 'Неизвестно';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'scheduled':
        return 'Calendar';
      case 'delayed':
        return 'AlertTriangle';
      default:
        return 'HelpCircle';
    }
  };

  return (
    <div className="card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              Операции на сегодня
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              {formatDate(selectedDate)}
            </p>
          </div>
          <Link
            to="/surgery-schedule"
            className="text-primary hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
          >
            <span>Все операции</span>
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </div>

      <div className="p-6">
        {surgeries.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Calendar" size={32} className="text-secondary-400" />
            </div>
            <p className="text-text-secondary">Операций на выбранную дату не запланировано</p>
          </div>
        ) : (
          <div className="space-y-4">
            {surgeries.map((surgery) => (
              <div
                key={surgery.id}
                className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-text-primary">
                        {surgery.patientName}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(surgery.status)}`}>
                        <Icon name={getStatusIcon(surgery.status)} size={12} className="inline mr-1" />
                        {getStatusText(surgery.status)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-text-secondary mb-2">
                      {surgery.surgeryType}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{surgery.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="User" size={12} />
                        <span>{surgery.doctor}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{surgery.room}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    to="/patient-details"
                    className="ml-4 p-2 text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    <Icon name="ExternalLink" size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaySchedule;