import React from 'react';
import Icon from 'components/AppIcon';

const PatientCard = ({
  patient,
  isSelected,
  onSelect,
  onAction,
  getStatusColor,
  getStatusText,
  getSurgeryTypeText,
  formatDate
}) => {
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

  return (
    <div className={`card p-4 transition-all duration-200 hover:shadow-md ${
      isSelected ? 'ring-2 ring-primary-500 bg-primary-50' : ''
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(patient.id, e.target.checked)}
            className="rounded border-border focus:ring-primary-500"
          />
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <Icon name="User" size={20} color="var(--color-primary)" />
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onAction('view', patient.id)}
            className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
            title="Просмотр"
          >
            <Icon name="Eye" size={16} />
          </button>
          <button
            onClick={() => onAction('edit', patient.id)}
            className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
            title="Редактировать"
          >
            <Icon name="Edit" size={16} />
          </button>
          <button
            onClick={() => onAction('delete', patient.id)}
            className="p-1 text-text-secondary hover:text-error transition-colors duration-200"
            title="Удалить"
          >
            <Icon name="Trash2" size={16} />
          </button>
        </div>
      </div>

      <div className="mb-3">
        <h3 className="font-medium text-text-primary mb-1">
          {patient.surname} {patient.firstName}
        </h3>
        <p className="text-sm text-text-secondary mb-1">
          {patient.patronymic}
        </p>
        <p className="text-sm text-text-secondary">
          {calculateAge(patient.birthDate)} лет • {formatDate(patient.birthDate)}
        </p>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Phone" size={14} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">{patient.phone}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={14} className="text-text-secondary" />
          <span className="text-sm text-text-primary">{patient.diagnosis}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={14} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">
            Поступление: {formatDate(patient.admissionDate)}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Scissors" size={14} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">
            Операция: {formatDate(patient.surgeryDate)}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="UserCheck" size={14} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">{patient.referringDoctor}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          patient.surgeryType === 'major' ?'bg-error-100 text-error-700' :'bg-warning-100 text-warning-700'
        }`}>
          {getSurgeryTypeText(patient.surgeryType)}
        </span>
        
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
          {getStatusText(patient.status)}
        </span>
      </div>

      {patient.notes && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-sm text-text-secondary">
            {patient.notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientCard;