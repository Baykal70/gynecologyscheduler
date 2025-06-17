import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActionButton from '../../components/ui/QuickActionButton';
import Icon from '../../components/AppIcon';
import RecentActivity from './components/RecentActivity';
import TodaySchedule from './components/TodaySchedule';
import StatsCard from './components/StatsCard';
import UpcomingAppointments from './components/UpcomingAppointments';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock data for dashboard stats
  const dashboardStats = [
    {
      id: 1,
      title: "Операции сегодня",
      value: 8,
      icon: "Calendar",
      color: "bg-primary",
      textColor: "text-white",
      change: "+2 от вчера",
      changeType: "positive"
    },
    {
      id: 2,
      title: "Ожидающие операции",
      value: 15,
      icon: "Clock",
      color: "bg-warning",
      textColor: "text-white",
      change: "-3 от вчера",
      changeType: "negative"
    },
    {
      id: 3,
      title: "Всего пациентов",
      value: 142,
      icon: "Users",
      color: "bg-accent",
      textColor: "text-white",
      change: "+12 за неделю",
      changeType: "positive"
    }
  ];

  // Mock data for today's surgeries
  const todaySurgeries = [
    {
      id: 1,
      patientName: "Иванова Мария Петровна",
      surgeryType: "Лапароскопическая гистерэктомия",
      time: "09:00",
      status: "completed",
      doctor: "Доктор Петров",
      room: "Операционная 1"
    },
    {
      id: 2,
      patientName: "Сидорова Анна Ивановна",
      surgeryType: "Удаление кисты яичника",
      time: "11:30",
      status: "in-progress",
      doctor: "Доктор Иванов",
      room: "Операционная 2"
    },
    {
      id: 3,
      patientName: "Козлова Елена Александровна",
      surgeryType: "Диагностическая лапароскопия",
      time: "14:00",
      status: "scheduled",
      doctor: "Доктор Смирнов",
      room: "Операционная 1"
    },
    {
      id: 4,
      patientName: "Морозова Ольга Викторовна",
      surgeryType: "Миомэктомия",
      time: "16:30",
      status: "scheduled",
      doctor: "Доктор Петров",
      room: "Операционная 3"
    }
  ];

  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      patientName: "Волкова Татьяна Сергеевна",
      date: "2024-12-20",
      time: "10:00",
      type: "Консультация",
      isUrgent: false
    },
    {
      id: 2,
      patientName: "Новикова Светлана Дмитриевна",
      date: "2024-12-20",
      time: "14:30",
      type: "Предоперационный осмотр",
      isUrgent: true
    },
    {
      id: 3,
      patientName: "Федорова Наталья Владимировна",
      date: "2024-12-21",
      time: "09:15",
      type: "Послеоперационный контроль",
      isUrgent: false
    }
  ];

  // Mock data for recent activity
  const recentActivities = [
    {
      id: 1,
      type: "surgery_completed",
      message: "Операция завершена для пациента Иванова М.П.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      icon: "CheckCircle",
      color: "text-success"
    },
    {
      id: 2,
      type: "patient_added",
      message: "Добавлен новый пациент Сидорова А.И.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      icon: "UserPlus",
      color: "text-primary"
    },
    {
      id: 3,
      type: "schedule_updated",
      message: "Обновлено расписание операций на завтра",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      icon: "Calendar",
      color: "text-warning"
    },
    {
      id: 4,
      type: "surgery_delayed",
      message: "Операция отложена для пациента Козлова Е.А.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      icon: "AlertTriangle",
      color: "text-error"
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getCurrentDateFormatted = () => {
    const today = new Date();
    return today.toLocaleDateString('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="px-4 lg:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb />
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                Панель управления
              </h1>
              <p className="text-text-secondary">
                {getCurrentDateFormatted()}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={20} className="text-text-secondary" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="form-input text-sm"
                />
              </div>
              
              <Link
                to="/add-edit-patient"
                className="btn-primary px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2"
              >
                <Icon name="Plus" size={16} />
                <span>Добавить пациента</span>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {dashboardStats.map((stat) => (
              <StatsCard key={stat.id} stat={stat} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Today's Schedule - Center */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <TodaySchedule 
                surgeries={todaySurgeries} 
                selectedDate={selectedDate}
                formatDate={formatDate}
              />
            </div>

            {/* Right Panel */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              {/* Upcoming Appointments */}
              <UpcomingAppointments 
                appointments={upcomingAppointments}
                formatDate={formatDate}
              />
              
              {/* Recent Activity */}
              <RecentActivity activities={recentActivities} />
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/patient-list"
              className="card p-6 hover:shadow-md transition-shadow duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                  <Icon name="Users" size={24} color="var(--color-primary)" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Список пациентов</h3>
                  <p className="text-sm text-text-secondary">Управление пациентами</p>
                </div>
              </div>
            </Link>

            <Link
              to="/surgery-schedule"
              className="card p-6 hover:shadow-md transition-shadow duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center group-hover:bg-accent-200 transition-colors duration-200">
                  <Icon name="Calendar" size={24} color="var(--color-accent)" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Расписание операций</h3>
                  <p className="text-sm text-text-secondary">Планирование операций</p>
                </div>
              </div>
            </Link>

            <div className="card p-6 hover:shadow-md transition-shadow duration-200 group cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center group-hover:bg-warning-200 transition-colors duration-200">
                  <Icon name="FileText" size={24} color="var(--color-warning)" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Отчеты</h3>
                  <p className="text-sm text-text-secondary">Медицинские отчеты</p>
                </div>
              </div>
            </div>

            <div className="card p-6 hover:shadow-md transition-shadow duration-200 group cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary-200 rounded-lg flex items-center justify-center group-hover:bg-secondary-300 transition-colors duration-200">
                  <Icon name="Settings" size={24} color="var(--color-secondary)" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Настройки</h3>
                  <p className="text-sm text-text-secondary">Системные настройки</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <QuickActionButton />
    </div>
  );
};

export default Dashboard;