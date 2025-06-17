import React from 'react';
import Icon from 'components/AppIcon';

const FilterSidebar = ({ filters, onFiltersChange, onClose }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    onFiltersChange({
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
  };

  const diagnosisOptions = [
    'Миома матки',
    'Эндометриоз',
    'Киста яичника',
    'Полипы эндометрия',
    'Гиперплазия эндометрия',
    'Аденомиоз',
    'Овариальная киста',
    'Эрозия шейки матки'
  ];

  const referringDoctors = [
    'Петров А.И.',
    'Сидорова М.П.',
    'Волков Д.С.',
    'Николаев В.А.',
    'Морозов И.П.',
    'Кузнецова Е.В.',
    'Попов С.М.'
  ];

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-medium text-text-primary">
          Фильтры
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearFilters}
            className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
          >
            Очистить
          </button>
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-text-secondary hover:text-primary transition-colors duration-200"
          >
            <Icon name="X" size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Поиск
          </label>
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <input
              type="text"
              placeholder="Имя, диагноз..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="form-input pl-10 w-full"
            />
          </div>
        </div>

        {/* Diagnosis */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Диагноз
          </label>
          <select
            value={filters.diagnosis}
            onChange={(e) => handleFilterChange('diagnosis', e.target.value)}
            className="form-input w-full"
          >
            <option value="">Все диагнозы</option>
            {diagnosisOptions.map(diagnosis => (
              <option key={diagnosis} value={diagnosis}>
                {diagnosis}
              </option>
            ))}
          </select>
        </div>

        {/* Surgery Type */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Тип операции
          </label>
          <select
            value={filters.surgeryType}
            onChange={(e) => handleFilterChange('surgeryType', e.target.value)}
            className="form-input w-full"
          >
            <option value="">Все типы</option>
            <option value="minor">Малая операция</option>
            <option value="major">Большая операция</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Статус
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="form-input w-full"
          >
            <option value="">Все статусы</option>
            <option value="scheduled">Запланировано</option>
            <option value="admitted">Поступил</option>
            <option value="completed">Выполнено</option>
            <option value="cancelled">Отменено</option>
          </select>
        </div>

        {/* Admission Date Range */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Дата поступления
          </label>
          <div className="space-y-2">
            <input
              type="date"
              placeholder="От"
              value={filters.admissionDateFrom}
              onChange={(e) => handleFilterChange('admissionDateFrom', e.target.value)}
              className="form-input w-full"
            />
            <input
              type="date"
              placeholder="До"
              value={filters.admissionDateTo}
              onChange={(e) => handleFilterChange('admissionDateTo', e.target.value)}
              className="form-input w-full"
            />
          </div>
        </div>

        {/* Surgery Date Range */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Дата операции
          </label>
          <div className="space-y-2">
            <input
              type="date"
              placeholder="От"
              value={filters.surgeryDateFrom}
              onChange={(e) => handleFilterChange('surgeryDateFrom', e.target.value)}
              className="form-input w-full"
            />
            <input
              type="date"
              placeholder="До"
              value={filters.surgeryDateTo}
              onChange={(e) => handleFilterChange('surgeryDateTo', e.target.value)}
              className="form-input w-full"
            />
          </div>
        </div>

        {/* Referring Doctor */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Направивший врач
          </label>
          <select
            value={filters.referringDoctor}
            onChange={(e) => handleFilterChange('referringDoctor', e.target.value)}
            className="form-input w-full"
          >
            <option value="">Все врачи</option>
            {referringDoctors.map(doctor => (
              <option key={doctor} value={doctor}>
                {doctor}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;