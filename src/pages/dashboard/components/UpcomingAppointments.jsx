import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const UpcomingAppointments = ({ appointments, formatDate }) => {
  return (
    <div className="card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">
            Предстоящие приемы
          </h2>
          <Link
            to="/patient-list"
            className="text-primary hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
          >
            <span>Все приемы</span>
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </div>

      <div className="p-6">
        {appointments.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CalendarDays" size={32} className="text-secondary-400" />
            </div>
            <p className="text-text-secondary">Предстоящих приемов нет</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={16} color="var(--color-primary)" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-text-primary truncate">
                      {appointment.patientName}
                    </h3>
                    {appointment.isUrgent && (
                      <span className="px-2 py-1 bg-error text-white text-xs rounded-full">
                        Срочно
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-text-secondary">
                    {appointment.type}
                  </p>
                  
                  <div className="flex items-center space-x-3 text-xs text-text-secondary mt-1">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{formatDate(appointment.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </div>
                
                <Link
                  to="/patient-details"
                  className="p-2 text-text-secondary hover:text-primary transition-colors duration-200 flex-shrink-0"
                >
                  <Icon name="ExternalLink" size={16} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingAppointments;