import React from 'react';
import Icon from 'components/AppIcon';

const ScheduleDetailsPanel = ({ 
  selectedDate, 
  surgeries, 
  onSurgeryClick,
  formatDate,
  formatTime,
  getStatusColor,
  getStatusText,
  getSurgeryTypeColor,
  getSurgeryTypeText
}) => {

  const getTotalDuration = () => {
    return surgeries.reduce((total, surgery) => total + surgery.duration, 0);
  };

  const getScheduledCount = () => {
    return surgeries.filter(surgery => surgery.status === 'scheduled').length;
  };

  const getCompletedCount = () => {
    return surgeries.filter(surgery => surgery.status === 'completed').length;
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}ч ${mins > 0 ? `${mins}м` : ''}`;
    }
    return `${mins}м`;
  };

  return (
    <div className="card">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-medium text-text-primary mb-2">
          Расписание на {formatDate(selectedDate)}
        </h3>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-semibold text-primary">{surgeries.length}</div>
            <div className="text-xs text-text-secondary">Всего операций</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-accent-600">{getScheduledCount()}</div>
            <div className="text-xs text-text-secondary">Запланировано</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-success">{getCompletedCount()}</div>
            <div className="text-xs text-text-secondary">Выполнено</div>
          </div>
        </div>

        {surgeries.length > 0 && (
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <span>Общее время: {formatDuration(getTotalDuration())}</span>
            <span>{surgeries.filter(s => s.status === 'scheduled').length} активных</span>
          </div>
        )}
      </div>

      <div className="p-4">
        {surgeries.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Calendar" size={32} className="text-text-secondary" />
            </div>
            <h4 className="text-lg font-medium text-text-primary mb-2">
              Нет запланированных операций
            </h4>
            <p className="text-text-secondary">
              На выбранную дату операции не запланированы
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {surgeries.map((surgery) => (
              <div
                key={surgery.id}
                className="p-4 border border-border-light rounded-lg hover:bg-secondary-50 cursor-pointer transition-colors duration-200"
                onClick={() => onSurgeryClick(surgery)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary mb-1">
                      {surgery.patientName}
                    </h4>
                    <p className="text-sm text-text-secondary mb-2">
                      {surgery.surgeryName}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{formatTime(surgery.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Timer" size={14} />
                        <span>{formatDuration(surgery.duration)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={14} />
                        <span>{surgery.room}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(surgery.status)}`}>
                      {getStatusText(surgery.status)}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSurgeryTypeColor(surgery.surgeryType)}`}>
                      {getSurgeryTypeText(surgery.surgeryType)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border-light pt-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-text-secondary">
                      <Icon name="UserCheck" size={14} />
                      <span>{surgery.doctor}</span>
                    </div>
                    
                    <button className="text-primary hover:text-primary-700 transition-colors duration-200">
                      <Icon name="ChevronRight" size={16} />
                    </button>
                  </div>
                  
                  {surgery.notes && (
                    <div className="mt-2 text-xs text-text-secondary bg-secondary-50 p-2 rounded">
                      <Icon name="FileText" size={12} className="inline mr-1" />
                      {surgery.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {surgeries.length > 0 && (
        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <button className="flex-1 px-3 py-2 text-sm bg-primary-50 text-primary hover:bg-primary-100 rounded-md transition-colors duration-200 flex items-center justify-center space-x-1">
              <Icon name="Download" size={14} />
              <span>Экспорт</span>
            </button>
            <button className="flex-1 px-3 py-2 text-sm bg-secondary-100 text-text-secondary hover:bg-secondary-200 rounded-md transition-colors duration-200 flex items-center justify-center space-x-1">
              <Icon name="Printer" size={14} />
              <span>Печать</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleDetailsPanel;