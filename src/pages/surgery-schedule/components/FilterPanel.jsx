import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ filters, onFiltersChange, doctors }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const surgeryTypeOptions = [
    { value: 'all', label: 'Все типы операций' },
    { value: 'minor', label: 'Малые операции' },
    { value: 'major', label: 'Большие операции' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Все статусы' },
    { value: 'scheduled', label: 'Запланировано' },
    { value: 'completed', label: 'Выполнено' },
    { value: 'cancelled', label: 'Отменено' }
  ];

  const doctorOptions = [
    { value: 'all', label: 'Все врачи' },
    ...doctors.map(doctor => ({ value: doctor.name, label: doctor.name }))
  ];

  const handleFilterChange = (filterType, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    onFiltersChange({
      surgeryType: 'all',
      doctor: 'all',
      status: 'all'
    });
  };

  const hasActiveFilters = () => {
    return filters.surgeryType !== 'all' || filters.doctor !== 'all' || filters.status !== 'all';
  };

  return (
    <div className="card mb-6">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-text-secondary" />
            <h3 className="font-medium text-text-primary">Фильтры</h3>
            {hasActiveFilters() && (
              <span className="px-2 py-1 bg-primary-100 text-primary text-xs rounded-full">
                Активны
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {hasActiveFilters() && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
              >
                Сбросить все
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-secondary-100 rounded transition-colors duration-200"
            >
              <Icon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-text-secondary" 
              />
            </button>
          </div>
        </div>

        {/* Quick Filters - Always Visible */}
        <div className="flex flex-wrap gap-2 mt-4">
          <select
            value={filters.surgeryType}
            onChange={(e) => handleFilterChange('surgeryType', e.target.value)}
            className="text-sm border border-border rounded-md px-3 py-1 bg-surface focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {surgeryTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="text-sm border border-border rounded-md px-3 py-1 bg-surface focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Тип операции
                </label>
                <select
                  value={filters.surgeryType}
                  onChange={(e) => handleFilterChange('surgeryType', e.target.value)}
                  className="form-input w-full"
                >
                  {surgeryTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Врач
                </label>
                <select
                  value={filters.doctor}
                  onChange={(e) => handleFilterChange('doctor', e.target.value)}
                  className="form-input w-full"
                >
                  {doctorOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Статус
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="form-input w-full"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Summary */}
            {hasActiveFilters() && (
              <div className="mt-4 p-3 bg-primary-50 rounded-lg">
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="Info" size={16} className="text-primary" />
                  <span className="text-primary font-medium">Активные фильтры:</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {filters.surgeryType !== 'all' && (
                    <span className="px-2 py-1 bg-primary text-white text-xs rounded">
                      {surgeryTypeOptions.find(opt => opt.value === filters.surgeryType)?.label}
                    </span>
                  )}
                  {filters.doctor !== 'all' && (
                    <span className="px-2 py-1 bg-primary text-white text-xs rounded">
                      {filters.doctor}
                    </span>
                  )}
                  {filters.status !== 'all' && (
                    <span className="px-2 py-1 bg-primary text-white text-xs rounded">
                      {statusOptions.find(opt => opt.value === filters.status)?.label}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;