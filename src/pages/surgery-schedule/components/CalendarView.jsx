import React from 'react';


const CalendarView = ({ 
  currentDate, 
  selectedDate, 
  onDateSelect, 
  viewMode, 
  surgeries, 
  onSurgeryClick,
  getSurgeryTypeColor,
  getStatusColor,
  formatTime 
}) => {
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  const getSurgeriesForDate = (date) => {
    if (!date) return [];
    return surgeries.filter(surgery => {
      const surgeryDate = new Date(surgery.date);
      return surgeryDate.toDateString() === date.toDateString();
    });
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

    return (
      <div className="card">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-medium text-text-primary">
            {currentDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
          </h3>
        </div>
        
        <div className="p-4">
          {/* Week day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-text-secondary">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              const daySurgeries = getSurgeriesForDate(date);
              
              return (
                <div
                  key={index}
                  className={`min-h-24 p-1 border border-border-light rounded-md cursor-pointer transition-colors duration-200 ${
                    date ? 'hover:bg-secondary-100' : ''
                  } ${
                    isSelected(date) ? 'bg-primary-50 border-primary' : ''
                  } ${
                    isToday(date) ? 'bg-accent-50' : ''
                  }`}
                  onClick={() => date && onDateSelect(date)}
                >
                  {date && (
                    <>
                      <div className={`text-sm font-medium mb-1 ${
                        isToday(date) ? 'text-accent-600' : 'text-text-primary'
                      }`}>
                        {date.getDate()}
                      </div>
                      
                      <div className="space-y-1">
                        {daySurgeries.slice(0, 2).map((surgery) => (
                          <div
                            key={surgery.id}
                            className={`text-xs px-1 py-0.5 rounded truncate cursor-pointer ${getSurgeryTypeColor(surgery.surgeryType)}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSurgeryClick(surgery);
                            }}
                            title={`${surgery.patientName} - ${surgery.surgeryName}`}
                          >
                            {formatTime(surgery.date)} {surgery.patientName.split(' ')[0]}
                          </div>
                        ))}
                        
                        {daySurgeries.length > 2 && (
                          <div className="text-xs text-text-secondary">
                            +{daySurgeries.length - 2} еще
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const days = getWeekDays(currentDate);
    const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    return (
      <div className="card">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-medium text-text-primary">
            Неделя {days[0].toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })} - {days[6].toLocaleDateString('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' })}
          </h3>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-7 gap-4">
            {days.map((date, index) => {
              const daySurgeries = getSurgeriesForDate(date);
              
              return (
                <div
                  key={index}
                  className={`min-h-32 p-3 border border-border-light rounded-md cursor-pointer transition-colors duration-200 hover:bg-secondary-100 ${
                    isSelected(date) ? 'bg-primary-50 border-primary' : ''
                  } ${
                    isToday(date) ? 'bg-accent-50' : ''
                  }`}
                  onClick={() => onDateSelect(date)}
                >
                  <div className="text-center mb-2">
                    <div className="text-xs text-text-secondary">{weekDays[index].slice(0, 3)}</div>
                    <div className={`text-lg font-medium ${
                      isToday(date) ? 'text-accent-600' : 'text-text-primary'
                    }`}>
                      {date.getDate()}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    {daySurgeries.map((surgery) => (
                      <div
                        key={surgery.id}
                        className={`text-xs px-2 py-1 rounded cursor-pointer ${getSurgeryTypeColor(surgery.surgeryType)}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSurgeryClick(surgery);
                        }}
                        title={`${surgery.patientName} - ${surgery.surgeryName}`}
                      >
                        <div className="font-medium">{formatTime(surgery.date)}</div>
                        <div className="truncate">{surgery.patientName.split(' ')[0]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const daySurgeries = getSurgeriesForDate(currentDate).sort((a, b) => new Date(a.date) - new Date(b.date));
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

    return (
      <div className="card">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-medium text-text-primary">
            {currentDate.toLocaleDateString('ru-RU', { 
              weekday: 'long', 
              day: '2-digit', 
              month: 'long', 
              year: 'numeric' 
            })}
          </h3>
        </div>
        
        <div className="p-4">
          <div className="space-y-2">
            {hours.map((hour) => {
              const hourSurgeries = daySurgeries.filter(surgery => {
                const surgeryHour = new Date(surgery.date).getHours();
                return surgeryHour === hour;
              });

              return (
                <div key={hour} className="flex border-b border-border-light pb-2">
                  <div className="w-16 text-sm text-text-secondary font-medium">
                    {hour}:00
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    {hourSurgeries.length > 0 ? (
                      hourSurgeries.map((surgery) => (
                        <div
                          key={surgery.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 hover:opacity-80 ${getSurgeryTypeColor(surgery.surgeryType)}`}
                          onClick={() => onSurgeryClick(surgery)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{surgery.patientName}</div>
                              <div className="text-sm opacity-80">{surgery.surgeryName}</div>
                              <div className="text-xs opacity-70">
                                {formatTime(surgery.date)} - {surgery.doctor}
                              </div>
                            </div>
                            
                            <div className={`px-2 py-1 rounded text-xs ${getStatusColor(surgery.status)}`}>
                              {surgery.status === 'scheduled' && 'Запланировано'}
                              {surgery.status === 'completed' && 'Выполнено'}
                              {surgery.status === 'cancelled' && 'Отменено'}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-text-secondary italic py-2">
                        Нет запланированных операций
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {viewMode === 'month' && renderMonthView()}
      {viewMode === 'week' && renderWeekView()}
      {viewMode === 'day' && renderDayView()}
    </>
  );
};

export default CalendarView;