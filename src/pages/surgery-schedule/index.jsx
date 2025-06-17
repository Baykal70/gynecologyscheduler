import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import QuickActionButton from 'components/ui/QuickActionButton';
import Icon from 'components/AppIcon';
import CalendarView from './components/CalendarView';
import ScheduleDetailsPanel from './components/ScheduleDetailsPanel';
import ScheduleSurgeryModal from './components/ScheduleSurgeryModal';
import FilterPanel from './components/FilterPanel';

const SurgerySchedule = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, week, day
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedSurgery, setSelectedSurgery] = useState(null);
  const [filters, setFilters] = useState({
    surgeryType: 'all',
    doctor: 'all',
    status: 'all'
  });

  // Mock surgery data
  const surgeries = [
    {
      id: 1,
      patientId: 1,
      patientName: "Иванова Мария Петровна",
      surgeryType: "major",
      surgeryName: "Гистерэктомия",
      date: new Date(2024, 11, 15, 9, 0),
      duration: 180,
      status: "scheduled",
      doctor: "Доктор Петров А.И.",
      room: "Операционная №1",
      preparation: "Общий наркоз, предоперационная подготовка 2 часа",
      notes: "Плановая операция, пациентка подготовлена"
    },
    {
      id: 2,
      patientId: 2,
      patientName: "Сидорова Анна Владимировна",
      surgeryType: "minor",
      surgeryName: "Лапароскопия диагностическая",
      date: new Date(2024, 11, 15, 14, 30),
      duration: 60,
      status: "scheduled",
      doctor: "Доктор Иванов С.М.",
      room: "Операционная №2",
      preparation: "Местная анестезия, подготовка 30 минут",
      notes: "Диагностическая процедура"
    },
    {
      id: 3,
      patientId: 3,
      patientName: "Козлова Елена Сергеевна",
      surgeryType: "major",
      surgeryName: "Миомэктомия",
      date: new Date(2024, 11, 16, 10, 0),
      duration: 120,
      status: "completed",
      doctor: "Доктор Петров А.И.",
      room: "Операционная №1",
      preparation: "Общий наркоз, предоперационная подготовка 2 часа",
      notes: "Операция прошла успешно"
    },
    {
      id: 4,
      patientId: 4,
      patientName: "Морозова Ольга Николаевна",
      surgeryType: "minor",
      surgeryName: "Биопсия эндометрия",
      date: new Date(2024, 11, 17, 11, 0),
      duration: 30,
      status: "cancelled",
      doctor: "Доктор Иванов С.М.",
      room: "Процедурная №1",
      preparation: "Местная анестезия",
      notes: "Отменено по просьбе пациентки"
    },
    {
      id: 5,
      patientId: 5,
      patientName: "Волкова Татьяна Александровна",
      surgeryType: "major",
      surgeryName: "Овариэктомия",
      date: new Date(2024, 11, 18, 8, 30),
      duration: 150,
      status: "scheduled",
      doctor: "Доктор Петров А.И.",
      room: "Операционная №1",
      preparation: "Общий наркоз, предоперационная подготовка 2 часа",
      notes: "Требуется консультация анестезиолога"
    }
  ];

  const doctors = [
    { id: 1, name: "Доктор Петров А.И.", specialization: "Гинеколог-хирург" },
    { id: 2, name: "Доктор Иванов С.М.", specialization: "Гинеколог" },
    { id: 3, name: "Доктор Сидорова Е.В.", specialization: "Гинеколог-эндокринолог" }
  ];

  const getFilteredSurgeries = () => {
    return surgeries.filter(surgery => {
      if (filters.surgeryType !== 'all' && surgery.surgeryType !== filters.surgeryType) {
        return false;
      }
      if (filters.doctor !== 'all' && surgery.doctor !== filters.doctor) {
        return false;
      }
      if (filters.status !== 'all' && surgery.status !== filters.status) {
        return false;
      }
      return true;
    });
  };

  const getSelectedDateSurgeries = () => {
    const filtered = getFilteredSurgeries();
    return filtered.filter(surgery => {
      const surgeryDate = new Date(surgery.date);
      return surgeryDate.toDateString() === selectedDate.toDateString();
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const handleDateNavigation = (direction) => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const handleSurgeryClick = (surgery) => {
    setSelectedSurgery(surgery);
    navigate('/patient-details', { state: { patientId: surgery.patientId } });
  };

  const handleScheduleSurgery = () => {
    setIsScheduleModalOpen(true);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'text-primary bg-primary-50';
      case 'completed':
        return 'text-success bg-success-50';
      case 'cancelled':
        return 'text-error bg-error-50';
      default:
        return 'text-secondary-500 bg-secondary-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'scheduled':
        return 'Запланировано';
      case 'completed':
        return 'Выполнено';
      case 'cancelled':
        return 'Отменено';
      default:
        return 'Неизвестно';
    }
  };

  const getSurgeryTypeColor = (type) => {
    return type === 'major' ? 'bg-error-100 text-error' : 'bg-accent-100 text-accent-600';
  };

  const getSurgeryTypeText = (type) => {
    return type === 'major' ? 'Большая операция' : 'Малая операция';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="px-4 lg:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb />
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-heading font-semibold text-text-primary mb-2">
                Расписание операций
              </h1>
              <p className="text-text-secondary">
                Планирование и управление хирургическими вмешательствами
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <button
                onClick={handleScheduleSurgery}
                className="btn-primary px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Icon name="Plus" size={18} />
                <span>Запланировать операцию</span>
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="card p-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Date Navigation */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleDateNavigation('prev')}
                  className="p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-200"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                
                <div className="text-lg font-medium text-text-primary min-w-48 text-center">
                  {viewMode === 'month' && formatDate(currentDate).replace(/\d+/, '')}
                  {viewMode === 'week' && `Неделя ${formatDate(currentDate)}`}
                  {viewMode === 'day' && formatDate(currentDate)}
                </div>
                
                <button
                  onClick={() => handleDateNavigation('next')}
                  className="p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-200"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
                
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-1 text-sm bg-secondary-100 hover:bg-secondary-200 rounded-md transition-colors duration-200"
                >
                  Сегодня
                </button>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-secondary-100 rounded-lg p-1">
                {['month', 'week', 'day'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                      viewMode === mode
                        ? 'bg-surface text-primary shadow-sm'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {mode === 'month' && 'Месяц'}
                    {mode === 'week' && 'Неделя'}
                    {mode === 'day' && 'День'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          <FilterPanel 
            filters={filters}
            onFiltersChange={setFilters}
            doctors={doctors}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Calendar View */}
            <div className="xl:col-span-7">
              <CalendarView
                currentDate={currentDate}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                viewMode={viewMode}
                surgeries={getFilteredSurgeries()}
                onSurgeryClick={handleSurgeryClick}
                getSurgeryTypeColor={getSurgeryTypeColor}
                getStatusColor={getStatusColor}
                formatTime={formatTime}
              />
            </div>

            {/* Schedule Details Panel */}
            <div className="xl:col-span-5">
              <ScheduleDetailsPanel
                selectedDate={selectedDate}
                surgeries={getSelectedDateSurgeries()}
                onSurgeryClick={handleSurgeryClick}
                formatDate={formatDate}
                formatTime={formatTime}
                getStatusColor={getStatusColor}
                getStatusText={getStatusText}
                getSurgeryTypeColor={getSurgeryTypeColor}
                getSurgeryTypeText={getSurgeryTypeText}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Schedule Surgery Modal */}
      {isScheduleModalOpen && (
        <ScheduleSurgeryModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          selectedDate={selectedDate}
          doctors={doctors}
        />
      )}

      <QuickActionButton />
    </div>
  );
};

export default SurgerySchedule;