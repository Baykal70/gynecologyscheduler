import React from 'react';
import Icon from 'components/AppIcon';

const PatientTable = ({
  patients,
  selectedPatients,
  sortConfig,
  onSort,
  onSelectAll,
  onSelectPatient,
  onPatientAction,
  getStatusColor,
  getStatusText,
  getSurgeryTypeText,
  formatDate
}) => {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <Icon name="ArrowUpDown" size={14} className="text-text-secondary" />;
    }
    return sortConfig.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const isAllSelected = patients.length > 0 && selectedPatients.length === patients.length;
  const isIndeterminate = selectedPatients.length > 0 && selectedPatients.length < patients.length;

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={input => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-border focus:ring-primary-500"
                />
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => onSort('fullName')}
              >
                <div className="flex items-center space-x-2">
                  <span>ФИО</span>
                  {getSortIcon('fullName')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => onSort('birthDate')}
              >
                <div className="flex items-center space-x-2">
                  <span>Дата рождения</span>
                  {getSortIcon('birthDate')}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-primary">
                Телефон
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => onSort('diagnosis')}
              >
                <div className="flex items-center space-x-2">
                  <span>Диагноз</span>
                  {getSortIcon('diagnosis')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => onSort('surgeryType')}
              >
                <div className="flex items-center space-x-2">
                  <span>Тип операции</span>
                  {getSortIcon('surgeryType')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => onSort('admissionDate')}
              >
                <div className="flex items-center space-x-2">
                  <span>Дата поступления</span>
                  {getSortIcon('admissionDate')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => onSort('surgeryDate')}
              >
                <div className="flex items-center space-x-2">
                  <span>Дата операции</span>
                  {getSortIcon('surgeryDate')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-text-primary cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
                onClick={() => onSort('status')}
              >
                <div className="flex items-center space-x-2">
                  <span>Статус</span>
                  {getSortIcon('status')}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text-primary">
                Направивший врач
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-text-primary">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {patients.map((patient) => (
              <tr 
                key={patient.id}
                className="hover:bg-secondary-50 transition-colors duration-200"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedPatients.includes(patient.id)}
                    onChange={(e) => onSelectPatient(patient.id, e.target.checked)}
                    className="rounded border-border focus:ring-primary-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-text-primary">
                    {patient.surname} {patient.firstName}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {patient.patronymic}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {formatDate(patient.birthDate)}
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {patient.phone}
                </td>
                <td className="px-4 py-3 text-sm text-text-primary">
                  {patient.diagnosis}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    patient.surgeryType === 'major' ?'bg-error-100 text-error-700' :'bg-warning-100 text-warning-700'
                  }`}>
                    {getSurgeryTypeText(patient.surgeryType)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {formatDate(patient.admissionDate)}
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {formatDate(patient.surgeryDate)}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                    {getStatusText(patient.status)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {patient.referringDoctor}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <button
                      onClick={() => onPatientAction('view', patient.id)}
                      className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
                      title="Просмотр"
                    >
                      <Icon name="Eye" size={16} />
                    </button>
                    <button
                      onClick={() => onPatientAction('edit', patient.id)}
                      className="p-1 text-text-secondary hover:text-primary transition-colors duration-200"
                      title="Редактировать"
                    >
                      <Icon name="Edit" size={16} />
                    </button>
                    <button
                      onClick={() => onPatientAction('delete', patient.id)}
                      className="p-1 text-text-secondary hover:text-error transition-colors duration-200"
                      title="Удалить"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {patients.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            Пациенты не найдены
          </h3>
          <p className="text-text-secondary">
            Попробуйте изменить параметры фильтрации
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientTable;