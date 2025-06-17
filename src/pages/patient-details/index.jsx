import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActionButton from '../../components/ui/QuickActionButton';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const PatientDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState('');

  // Mock patient data
  const patientData = {
    id: 1,
    surname: 'Петрова',
    firstName: 'Анна',
    patronymic: 'Сергеевна',
    birthDate: '1985-03-15',
    phone: '+7 495 123-45-67',
    email: 'anna.petrova@email.ru',
    address: 'г. Москва, ул. Тверская, д. 15, кв. 42',
    photo: 'https://randomuser.me/api/portraits/women/32.jpg',
    diagnosis: 'Миома матки больших размеров',
    surgeryType: 'major',
    surgeryTypeName: 'Лапароскопическая миомэктомия',
    admissionDate: '2024-01-15',
    surgeryDate: '2024-01-18',
    status: 'scheduled',
    referringDoctor: 'Доктор Смирнов А.В.',
    department: 'Поликлиника №1',
    bloodType: 'A(II) Rh+',
    allergies: 'Пенициллин',
    weight: '65 кг',
    height: '168 см',
    emergencyContact: 'Петров Сергей (муж) - +7 495 987-65-43'
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-warning-100 text-warning-600';
      case 'completed':
        return 'bg-success-100 text-success-600';
      case 'cancelled':
        return 'bg-error-100 text-error-600';
      default:
        return 'bg-secondary-100 text-secondary-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'scheduled':
        return 'Запланирована';
      case 'completed':
        return 'Выполнена';
      case 'cancelled':
        return 'Отменена';
      default:
        return 'Неизвестно';
    }
  };

  const getSurgeryTypeText = (type) => {
    return type === 'major' ? 'Большая операция' : 'Малая операция';
  };

  // Mock history data
  const historyData = [
    {
      id: 1,
      date: '2024-01-10',
      type: 'consultation',
      title: 'Первичная консультация',
      description: 'Проведен осмотр, назначены дополнительные обследования',
      doctor: 'Доктор Смирнов А.В.'
    },
    {
      id: 2,
      date: '2024-01-12',
      type: 'examination',
      title: 'УЗИ органов малого таза',
      description: 'Подтверждена миома матки, размеры 8x6 см',
      doctor: 'Доктор Козлова М.И.'
    },
    {
      id: 3,
      date: '2024-01-14',
      type: 'appointment',
      title: 'Предоперационная подготовка',
      description: 'Сданы анализы, получено согласие на операцию',
      doctor: 'Доктор Иванов П.С.'
    }
  ];

  // Mock documents data
  const documentsData = [
    {
      id: 1,
      name: 'Согласие на операцию',
      type: 'consent',
      date: '2024-01-14',
      size: '245 КБ'
    },
    {
      id: 2,
      name: 'Результаты анализов',
      type: 'results',
      date: '2024-01-13',
      size: '1.2 МБ'
    },
    {
      id: 3,
      name: 'УЗИ заключение',
      type: 'imaging',
      date: '2024-01-12',
      size: '890 КБ'
    }
  ];

  // Mock communication data
  const communicationData = [
    {
      id: 1,
      date: '2024-01-16',
      type: 'call',
      title: 'Телефонный звонок',
      description: 'Напоминание о предоперационной подготовке',
      staff: 'Медсестра Волкова Е.А.'
    },
    {
      id: 2,
      date: '2024-01-14',
      type: 'sms',
      title: 'SMS уведомление',
      description: 'Подтверждение даты операции',
      staff: 'Автоматическая система'
    }
  ];

  const handleEditPatient = () => {
    navigate('/add-edit-patient', { state: { patient: patientData, isEdit: true } });
  };

  const handleScheduleSurgery = () => {
    navigate('/surgery-schedule', { state: { patientId: patientData.id } });
  };

  const handleStatusUpdate = () => {
    // Mock status update
    console.log('Status update modal would open here');
  };

  const handleGenerateReport = () => {
    // Mock report generation
    console.log('Report generation would start here');
  };

  const handleNotesEdit = () => {
    setIsEditingNotes(true);
    setNotes('Пациентка готова к операции. Все анализы в норме. Аллергия на пенициллин учтена.');
  };

  const handleNotesSave = () => {
    setIsEditingNotes(false);
    // Save notes logic here
  };

  const handleNotesCancel = () => {
    setIsEditingNotes(false);
    setNotes('');
  };

  const tabs = [
    { id: 'overview', label: 'Обзор', icon: 'FileText' },
    { id: 'history', label: 'История', icon: 'Clock' },
    { id: 'documents', label: 'Документы', icon: 'FileText' },
    { id: 'communication', label: 'Связь', icon: 'MessageCircle' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        <Breadcrumb />
        
        {/* Patient Header */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-secondary-100 flex-shrink-0">
                <Image
                  src={patientData.photo}
                  alt={`${patientData.surname} ${patientData.firstName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h1 className="text-2xl font-heading font-semibold text-text-primary mb-1">
                  {patientData.surname} {patientData.firstName} {patientData.patronymic}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size={16} />
                    {calculateAge(patientData.birthDate)} лет
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Phone" size={16} />
                    {patientData.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Mail" size={16} />
                    {patientData.email}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(patientData.status)}`}>
                {getStatusText(patientData.status)}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-600">
                {getSurgeryTypeText(patientData.surgeryType)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-3">
            {/* Tabs */}
            <div className="card mb-6">
              <div className="border-b border-border">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                      }`}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Medical Summary */}
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                        Медицинская информация
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-text-secondary">Диагноз</label>
                            <p className="text-text-primary">{patientData.diagnosis}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-secondary">Тип операции</label>
                            <p className="text-text-primary">{patientData.surgeryTypeName}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-secondary">Дата поступления</label>
                            <p className="text-text-primary">{formatDate(patientData.admissionDate)}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-secondary">Дата операции</label>
                            <p className="text-text-primary">{formatDate(patientData.surgeryDate)}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-text-secondary">Направивший врач</label>
                            <p className="text-text-primary">{patientData.referringDoctor}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-secondary">Отделение</label>
                            <p className="text-text-primary">{patientData.department}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-secondary">Группа крови</label>
                            <p className="text-text-primary">{patientData.bloodType}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-secondary">Аллергии</label>
                            <p className="text-text-primary text-error">{patientData.allergies}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Physical Parameters */}
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                        Физические параметры
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-secondary-50 p-4 rounded-lg">
                          <label className="text-sm font-medium text-text-secondary">Вес</label>
                          <p className="text-lg font-semibold text-text-primary">{patientData.weight}</p>
                        </div>
                        <div className="bg-secondary-50 p-4 rounded-lg">
                          <label className="text-sm font-medium text-text-secondary">Рост</label>
                          <p className="text-lg font-semibold text-text-primary">{patientData.height}</p>
                        </div>
                        <div className="bg-secondary-50 p-4 rounded-lg">
                          <label className="text-sm font-medium text-text-secondary">ИМТ</label>
                          <p className="text-lg font-semibold text-text-primary">23.0</p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                        Контактная информация
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Адрес</label>
                          <p className="text-text-primary">{patientData.address}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-text-secondary">Экстренный контакт</label>
                          <p className="text-text-primary">{patientData.emergencyContact}</p>
                        </div>
                      </div>
                    </div>

                    {/* Notes Section */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-heading font-semibold text-text-primary">
                          Заметки
                        </h3>
                        {!isEditingNotes && (
                          <button
                            onClick={handleNotesEdit}
                            className="flex items-center space-x-1 text-primary hover:text-primary-700 transition-colors duration-200"
                          >
                            <Icon name="Edit" size={16} />
                            <span className="text-sm">Редактировать</span>
                          </button>
                        )}
                      </div>
                      
                      {isEditingNotes ? (
                        <div className="space-y-3">
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full h-32 form-input resize-none"
                            placeholder="Введите заметки о пациенте..."
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={handleNotesSave}
                              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
                            >
                              Сохранить
                            </button>
                            <button
                              onClick={handleNotesCancel}
                              className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-md hover:bg-secondary-200 transition-colors duration-200"
                            >
                              Отмена
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-secondary-50 p-4 rounded-lg">
                          <p className="text-text-primary">
                            Пациентка готова к операции. Все анализы в норме. Аллергия на пенициллин учтена.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">
                      История лечения
                    </h3>
                    <div className="space-y-4">
                      {historyData.map((item) => (
                        <div key={item.id} className="border border-border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <h4 className="font-medium text-text-primary">{item.title}</h4>
                            </div>
                            <span className="text-sm text-text-secondary">{formatDate(item.date)}</span>
                          </div>
                          <p className="text-text-secondary mb-2">{item.description}</p>
                          <p className="text-sm text-primary">{item.doctor}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Documents Tab */}
                {activeTab === 'documents' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-heading font-semibold text-text-primary">
                        Документы
                      </h3>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200">
                        <Icon name="Upload" size={16} />
                        <span>Загрузить</span>
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {documentsData.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                              <Icon name="FileText" size={20} color="var(--color-primary)" />
                            </div>
                            <div>
                              <p className="font-medium text-text-primary">{doc.name}</p>
                              <p className="text-sm text-text-secondary">{formatDate(doc.date)} • {doc.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-text-secondary hover:text-primary transition-colors duration-200">
                              <Icon name="Download" size={16} />
                            </button>
                            <button className="p-2 text-text-secondary hover:text-primary transition-colors duration-200">
                              <Icon name="Eye" size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Communication Tab */}
                {activeTab === 'communication' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-heading font-semibold text-text-primary">
                        История связи
                      </h3>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200">
                        <Icon name="Plus" size={16} />
                        <span>Добавить запись</span>
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {communicationData.map((item) => (
                        <div key={item.id} className="border border-border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Icon 
                                name={item.type === 'call' ? 'Phone' : 'MessageSquare'} 
                                size={16} 
                                className="text-primary" 
                              />
                              <h4 className="font-medium text-text-primary">{item.title}</h4>
                            </div>
                            <span className="text-sm text-text-secondary">{formatDate(item.date)}</span>
                          </div>
                          <p className="text-text-secondary mb-2">{item.description}</p>
                          <p className="text-sm text-primary">{item.staff}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                Быстрые действия
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={handleEditPatient}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  <Icon name="Edit" size={18} />
                  <span>Редактировать</span>
                </button>
                
                <button
                  onClick={handleScheduleSurgery}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-accent text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                >
                  <Icon name="Calendar" size={18} />
                  <span>Планировать операцию</span>
                </button>
                
                <button
                  onClick={handleStatusUpdate}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-warning text-white rounded-lg hover:bg-amber-700 transition-colors duration-200"
                >
                  <Icon name="RefreshCw" size={18} />
                  <span>Обновить статус</span>
                </button>
                
                <button
                  onClick={handleGenerateReport}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200"
                >
                  <Icon name="FileText" size={18} />
                  <span>Создать отчет</span>
                </button>
              </div>

              {/* Patient Stats */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-medium text-text-primary mb-3">Статистика</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Всего визитов:</span>
                    <span className="text-text-primary font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Операций:</span>
                    <span className="text-text-primary font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Документов:</span>
                    <span className="text-text-primary font-medium">{documentsData.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuickActionButton />
    </div>
  );
};

export default PatientDetails;