import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const ScheduleSurgeryModal = ({ isOpen, onClose, selectedDate, doctors }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientId: '',
    surgeryType: 'minor',
    surgeryName: '',
    date: selectedDate.toISOString().split('T')[0],
    time: '09:00',
    duration: 60,
    doctor: '',
    room: '',
    preparation: '',
    notes: ''
  });

  // Mock patients data
  const patients = [
    { id: 1, name: "Иванова Мария Петровна", phone: "+7 (495) 123-45-67" },
    { id: 2, name: "Сидорова Анна Владимировна", phone: "+7 (495) 234-56-78" },
    { id: 3, name: "Козлова Елена Сергеевна", phone: "+7 (495) 345-67-89" },
    { id: 4, name: "Морозова Ольга Николаевна", phone: "+7 (495) 456-78-90" },
    { id: 5, name: "Волкова Татьяна Александровна", phone: "+7 (495) 567-89-01" }
  ];

  const surgeryTypes = [
    { value: 'minor', label: 'Малая операция' },
    { value: 'major', label: 'Большая операция' }
  ];

  const commonSurgeries = {
    minor: [
      'Биопсия эндометрия',
      'Лапароскопия диагностическая',
      'Гистероскопия',
      'Удаление полипов',
      'Конизация шейки матки'
    ],
    major: [
      'Гистерэктомия',
      'Миомэктомия',
      'Овариэктомия',
      'Сальпингэктомия',
      'Операция при эндометриозе'
    ]
  };

  const rooms = [
    'Операционная №1',
    'Операционная №2',
    'Процедурная №1',
    'Процедурная №2'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically save the surgery to your backend
    console.log('Scheduling surgery:', formData);
    
    // Show success message and close modal
    alert('Операция успешно запланирована!');
    onClose();
  };

  const handleAddNewPatient = () => {
    navigate('/add-edit-patient');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1030 p-4">
      <div className="bg-surface rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Запланировать операцию
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Patient Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Пациент *
            </label>
            <div className="flex space-x-2">
              <select
                name="patientId"
                value={formData.patientId}
                onChange={handleInputChange}
                required
                className="flex-1 form-input"
              >
                <option value="">Выберите пациента</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddNewPatient}
                className="px-4 py-2 bg-secondary-100 hover:bg-secondary-200 text-text-secondary rounded-md transition-colors duration-200 flex items-center space-x-1"
              >
                <Icon name="Plus" size={16} />
                <span>Новый</span>
              </button>
            </div>
          </div>

          {/* Surgery Type */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Тип операции *
            </label>
            <select
              name="surgeryType"
              value={formData.surgeryType}
              onChange={handleInputChange}
              required
              className="form-input w-full"
            >
              {surgeryTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Surgery Name */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Название операции *
            </label>
            <div className="space-y-2">
              <input
                type="text"
                name="surgeryName"
                value={formData.surgeryName}
                onChange={handleInputChange}
                placeholder="Введите название операции"
                required
                className="form-input w-full"
              />
              <div className="text-xs text-text-secondary">
                Популярные операции:
                <div className="flex flex-wrap gap-1 mt-1">
                  {commonSurgeries[formData.surgeryType].map(surgery => (
                    <button
                      key={surgery}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, surgeryName: surgery }))}
                      className="px-2 py-1 bg-secondary-100 hover:bg-secondary-200 text-xs rounded transition-colors duration-200"
                    >
                      {surgery}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Дата *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="form-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Время *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                className="form-input w-full"
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Продолжительность (минуты) *
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              min="15"
              max="480"
              step="15"
              required
              className="form-input w-full"
            />
          </div>

          {/* Doctor and Room */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Врач *
              </label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleInputChange}
                required
                className="form-input w-full"
              >
                <option value="">Выберите врача</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.name}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Операционная *
              </label>
              <select
                name="room"
                value={formData.room}
                onChange={handleInputChange}
                required
                className="form-input w-full"
              >
                <option value="">Выберите операционную</option>
                {rooms.map(room => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Preparation */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Подготовка к операции
            </label>
            <textarea
              name="preparation"
              value={formData.preparation}
              onChange={handleInputChange}
              rows="3"
              placeholder="Укажите требования к подготовке пациента"
              className="form-input w-full resize-none"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Примечания
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="3"
              placeholder="Дополнительные заметки"
              className="form-input w-full resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 btn-primary px-4 py-2 rounded-lg flex items-center justify-center space-x-2"
            >
              <Icon name="Calendar" size={18} />
              <span>Запланировать операцию</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-secondary-100 hover:bg-secondary-200 text-text-secondary rounded-lg transition-colors duration-200"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleSurgeryModal;