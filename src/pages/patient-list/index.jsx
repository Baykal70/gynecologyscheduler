import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import QuickActionButton from 'components/ui/QuickActionButton';
import Icon from 'components/AppIcon';
import PatientTable from './components/PatientTable';
import FilterSidebar from './components/FilterSidebar';
import PatientCard from './components/PatientCard';

const PatientList = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    diagnosis: '',
    surgeryType: '',
    status: '',
    admissionDateFrom: '',
    admissionDateTo: '',
    surgeryDateFrom: '',
    surgeryDateTo: '',
    referringDoctor: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'admissionDate',
    direction: 'desc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mock patient data
  const mockPatients = [
    {
      id: 1,
      surname: "Иванова",
      firstName: "Мария",
      patronymic: "Александровна",
      birthDate: "1985-03-15",
      phone: "+7 905 123-45-67",
      diagnosis: "Миома матки",
      surgeryType: "major",
      admissionDate: "2024-01-15",
      surgeryDate: "2024-01-18",
      status: "scheduled",
      referringDoctor: "Петров А.И.",
      notes: "Плановая операция, пациентка подготовлена"
    },
    {
      id: 2,
      surname: "Смирнова",
      firstName: "Елена",
      patronymic: "Викторовна",
      birthDate: "1978-07-22",
      phone: "+7 916 234-56-78",
      diagnosis: "Эндометриоз",
      surgeryType: "minor",
      admissionDate: "2024-01-16",
      surgeryDate: "2024-01-19",
      status: "completed",
      referringDoctor: "Сидорова М.П.",
      notes: "Операция прошла успешно"
    },
    {
      id: 3,
      surname: "Козлова",
      firstName: "Анна",
      patronymic: "Сергеевна",
      birthDate: "1992-11-08",
      phone: "+7 925 345-67-89",
      diagnosis: "Киста яичника",
      surgeryType: "minor",
      admissionDate: "2024-01-17",
      surgeryDate: "2024-01-20",
      status: "admitted",
      referringDoctor: "Волков Д.С.",
      notes: "Пациентка поступила, готовится к операции"
    },
    {
      id: 4,
      surname: "Петрова",
      firstName: "Ольга",
      patronymic: "Дмитриевна",
      birthDate: "1980-05-12",
      phone: "+7 903 456-78-90",
      diagnosis: "Полипы эндометрия",
      surgeryType: "minor",
      admissionDate: "2024-01-18",
      surgeryDate: "2024-01-21",
      status: "scheduled",
      referringDoctor: "Николаев В.А.",
      notes: "Требуется дополнительное обследование"
    },
    {
      id: 5,
      surname: "Федорова",
      firstName: "Татьяна",
      patronymic: "Игоревна",
      birthDate: "1975-09-30",
      phone: "+7 917 567-89-01",
      diagnosis: "Гиперплазия эндометрия",
      surgeryType: "major",
      admissionDate: "2024-01-19",
      surgeryDate: "2024-01-22",
      status: "cancelled",
      referringDoctor: "Морозов И.П.",
      notes: "Операция отменена по медицинским показаниям"
    }
  ];

  // Filter and sort patients
  const filteredAndSortedPatients = useMemo(() => {
    let filtered = mockPatients.filter(patient => {
      const fullName = `${patient.surname} ${patient.firstName} ${patient.patronymic}`.toLowerCase();
      const searchMatch = filters.search === '' || 
        fullName.includes(filters.search.toLowerCase()) ||
        patient.diagnosis.toLowerCase().includes(filters.search.toLowerCase());
      
      const diagnosisMatch = filters.diagnosis === '' || patient.diagnosis.includes(filters.diagnosis);
      const surgeryTypeMatch = filters.surgeryType === '' || patient.surgeryType === filters.surgeryType;
      const statusMatch = filters.status === '' || patient.status === filters.status;
      const referringDoctorMatch = filters.referringDoctor === '' || 
        patient.referringDoctor.toLowerCase().includes(filters.referringDoctor.toLowerCase());

      // Date filters
      const admissionDateMatch = (!filters.admissionDateFrom || patient.admissionDate >= filters.admissionDateFrom) &&
        (!filters.admissionDateTo || patient.admissionDate <= filters.admissionDateTo);
      
      const surgeryDateMatch = (!filters.surgeryDateFrom || patient.surgeryDate >= filters.surgeryDateFrom) &&
        (!filters.surgeryDateTo || patient.surgeryDate <= filters.surgeryDateTo);

      return searchMatch && diagnosisMatch && surgeryTypeMatch && statusMatch && 
             referringDoctorMatch && admissionDateMatch && surgeryDateMatch;
    });

    // Sort
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'fullName') {
          aValue = `${a.surname} ${a.firstName} ${a.patronymic}`;
          bValue = `${b.surname} ${b.firstName} ${b.patronymic}`;
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [mockPatients, filters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPatients.length / itemsPerPage);
  const paginatedPatients = filteredAndSortedPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedPatients(paginatedPatients.map(p => p.id));
    } else {
      setSelectedPatients([]);
    }
  };

  const handleSelectPatient = (patientId, checked) => {
    if (checked) {
      setSelectedPatients(prev => [...prev, patientId]);
    } else {
      setSelectedPatients(prev => prev.filter(id => id !== patientId));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for patients:`, selectedPatients);
    // Implement bulk actions here
    setSelectedPatients([]);
  };

  const handlePatientAction = (action, patientId) => {
    switch (action) {
      case 'edit':
        navigate(`/add-edit-patient?id=${patientId}`);
        break;
      case 'view':
        navigate(`/patient-details?id=${patientId}`);
        break;
      case 'delete':
        console.log('Delete patient:', patientId);
        break;
      default:
        break;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-primary-100 text-primary-700';
      case 'admitted': return 'bg-warning-100 text-warning-700';
      case 'completed': return 'bg-success-100 text-success-700';
      case 'cancelled': return 'bg-error-100 text-error-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'scheduled': return 'Запланировано';
      case 'admitted': return 'Поступил';
      case 'completed': return 'Выполнено';
      case 'cancelled': return 'Отменено';
      default: return 'Неизвестно';
    }
  };

  const getSurgeryTypeText = (type) => {
    return type === 'major' ? 'Большая' : 'Малая';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="px-4 lg:px-6 py-6">
        <Breadcrumb />
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-heading font-semibold text-text-primary mb-2">
              Список пациентов
            </h1>
            <p className="text-text-secondary">
              Управление записями пациентов и планирование операций
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-text-secondary hover:text-primary transition-colors duration-200"
            >
              <Icon name="Filter" size={20} />
            </button>
            
            <div className="flex items-center bg-secondary-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'table' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-primary'
                }`}
              >
                <Icon name="Table" size={18} />
              </button>
              <button
                onClick={() => setViewMode('card')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'card' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-primary'
                }`}
              >
                <Icon name="Grid3X3" size={18} />
              </button>
            </div>
            
            <button
              onClick={() => navigate('/add-edit-patient')}
              className="btn-primary px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Icon name="UserPlus" size={18} />
              <span>Добавить пациента</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Filter Sidebar */}
          <div className={`lg:col-span-3 ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <FilterSidebar 
              filters={filters}
              onFiltersChange={setFilters}
              onClose={() => setIsSidebarOpen(false)}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Toolbar */}
            <div className="card p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-text-secondary">
                    Найдено: {filteredAndSortedPatients.length} пациентов
                  </span>
                  
                  {selectedPatients.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-primary font-medium">
                        Выбrano: {selectedPatients.length}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleBulkAction('export')}
                          className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
                          title="Экспорт"
                        >
                          <Icon name="Download" size={16} />
                        </button>
                        <button
                          onClick={() => handleBulkAction('status')}
                          className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
                          title="Изменить статус"
                        >
                          <Icon name="Edit" size={16} />
                        </button>
                        <button
                          onClick={() => handleBulkAction('delete')}
                          className="p-1 text-error hover:text-red-700 transition-colors duration-200"
                          title="Удалить"
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <select className="form-input text-sm">
                    <option value="10">10 на странице</option>
                    <option value="25">25 на странице</option>
                    <option value="50">50 на странице</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Content */}
            {viewMode === 'table' ? (
              <PatientTable
                patients={paginatedPatients}
                selectedPatients={selectedPatients}
                sortConfig={sortConfig}
                onSort={handleSort}
                onSelectAll={handleSelectAll}
                onSelectPatient={handleSelectPatient}
                onPatientAction={handlePatientAction}
                getStatusColor={getStatusColor}
                getStatusText={getStatusText}
                getSurgeryTypeText={getSurgeryTypeText}
                formatDate={formatDate}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {paginatedPatients.map(patient => (
                  <PatientCard
                    key={patient.id}
                    patient={patient}
                    isSelected={selectedPatients.includes(patient.id)}
                    onSelect={handleSelectPatient}
                    onAction={handlePatientAction}
                    getStatusColor={getStatusColor}
                    getStatusText={getStatusText}
                    getSurgeryTypeText={getSurgeryTypeText}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="card p-4 mt-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-text-secondary">
                    Показано {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredAndSortedPatients.length)} из {filteredAndSortedPatients.length}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 text-text-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <Icon name="ChevronLeft" size={18} />
                    </button>
                    
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-md text-sm font-medium transition-colors duration-200 ${
                              currentPage === pageNum
                                ? 'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-secondary-100'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 text-text-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <Icon name="ChevronRight" size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <QuickActionButton />
    </div>
  );
};

export default PatientList;