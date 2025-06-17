import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';

const AddEditPatient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    surname: '',
    firstName: '',
    patronymic: '',
    birthDate: '',
    phoneNumber: '',
    diagnosis: '',
    surgeryType: '',
    referringDoctor: '',
    admissionDate: '',
    surgeryDate: '',
    admissionStatus: 'planned',
    surgeryStatus: 'not_performed'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data for dropdowns
  const surgeryTypes = [
    { value: 'minor', label: 'Малые гинекологические операции' },
    { value: 'major', label: 'Большие гинекологические операции' }
  ];

  const referringDoctors = [
    { value: 'dr_petrov', label: 'Доктор Петров А.И.' },
    { value: 'dr_sidorova', label: 'Доктор Сидорова М.В.' },
    { value: 'dr_kozlov', label: 'Доктор Козлов В.П.' },
    { value: 'dr_morozova', label: 'Доктор Морозова Е.С.' }
  ];

  const diagnosisOptions = [
    'Миома матки',
    'Эндометриоз',
    'Киста яичника',
    'Полипы эндометрия',
    'Аденомиоз',
    'Дисплазия шейки матки',
    'Бесплодие',
    'Нарушения менструального цикла'
  ];

  const admissionStatuses = [
    { value: 'planned', label: 'Плановая' },
    { value: 'urgent', label: 'Срочная' },
    { value: 'emergency', label: 'Экстренная' }
  ];

  useEffect(() => {
    // Check if editing mode based on URL params or state
    const urlParams = new URLSearchParams(location.search);
    const patientId = urlParams.get('id');
    
    if (patientId) {
      setIsEditing(true);
      // Mock patient data for editing
      setFormData({
        surname: 'Иванова',
        firstName: 'Мария',
        patronymic: 'Александровна',
        birthDate: '1985-03-15',
        phoneNumber: '+7 916 123-45-67',
        diagnosis: 'Миома матки',
        surgeryType: 'major',
        referringDoctor: 'dr_petrov',
        admissionDate: '2024-02-15',
        surgeryDate: '2024-02-20',
        admissionStatus: 'planned',
        surgeryStatus: 'not_performed'
      });
    }
  }, [location]);

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.surname.trim()) {
      newErrors.surname = 'Фамилия обязательна для заполнения';
    } else if (!/^[а-яёА-ЯЁ\s-]+$/.test(formData.surname)) {
      newErrors.surname = 'Фамилия должна содержать только кириллические символы';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Имя обязательно для заполнения';
    } else if (!/^[а-яёА-ЯЁ\s-]+$/.test(formData.firstName)) {
      newErrors.firstName = 'Имя должно содержать только кириллические символы';
    }

    if (!formData.patronymic.trim()) {
      newErrors.patronymic = 'Отчество обязательно для заполнения';
    } else if (!/^[а-яёА-ЯЁ\s-]+$/.test(formData.patronymic)) {
      newErrors.patronymic = 'Отчество должно содержать только кириллические символы';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'Дата рождения обязательна для заполнения';
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18 || age > 100) {
        newErrors.birthDate = 'Возраст должен быть от 18 до 100 лет';
      }
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Номер телефона обязателен для заполнения';
    } else if (!/^\+7\s\d{3}\s\d{3}-\d{2}-\d{2}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Неверный формат номера телефона (+7 XXX XXX-XX-XX)';
    }

    if (!formData.diagnosis.trim()) {
      newErrors.diagnosis = 'Диагноз обязателен для заполнения';
    }

    if (!formData.surgeryType) {
      newErrors.surgeryType = 'Тип операции обязателен для выбора';
    }

    if (!formData.referringDoctor) {
      newErrors.referringDoctor = 'Направивший врач обязателен для выбора';
    }

    if (!formData.admissionDate) {
      newErrors.admissionDate = 'Дата поступления обязательна для заполнения';
    }

    if (!formData.surgeryDate) {
      newErrors.surgeryDate = 'Дата операции обязательна для заполнения';
    } else if (formData.admissionDate && new Date(formData.surgeryDate) < new Date(formData.admissionDate)) {
      newErrors.surgeryDate = 'Дата операции не может быть раньше даты поступления';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as +7 XXX XXX-XX-XX
    if (digits.length >= 1) {
      let formatted = '+7';
      if (digits.length > 1) {
        formatted += ` ${digits.slice(1, 4)}`;
      }
      if (digits.length > 4) {
        formatted += ` ${digits.slice(4, 7)}`;
      }
      if (digits.length > 7) {
        formatted += `-${digits.slice(7, 9)}`;
      }
      if (digits.length > 9) {
        formatted += `-${digits.slice(9, 11)}`;
      }
      return formatted;
    }
    return value;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    handleInputChange('phoneNumber', formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Patient data:', formData);
      navigate('/patient-list');
    } catch (error) {
      console.error('Error saving patient:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Patient deleted');
      navigate('/patient-list');
    } catch (error) {
      console.error('Error deleting patient:', error);
    } finally {
      setIsSubmitting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleCancel = () => {
    navigate('/patient-list');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="px-4 lg:px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                {isEditing ? 'Редактировать пациента' : 'Добавить пациента'}
              </h1>
              <p className="text-text-secondary">
                {isEditing 
                  ? 'Обновите информацию о пациенте и медицинские данные' :'Заполните форму для добавления нового пациента в систему'
                }
              </p>
            </div>
            
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <Icon name="X" size={20} />
              <span>Закрыть</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Personal Information */}
              <div className="card p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Icon name="User" size={20} color="var(--color-primary)" />
                  <h2 className="text-xl font-heading font-semibold text-text-primary">
                    Персональная информация
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Surname */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Фамилия <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.surname}
                      onChange={(e) => handleInputChange('surname', e.target.value)}
                      className={`form-input w-full ${errors.surname ? 'border-error focus:ring-error' : ''}`}
                      placeholder="Введите фамилию"
                    />
                    {errors.surname && (
                      <p className="mt-1 text-sm text-error">{errors.surname}</p>
                    )}
                  </div>

                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Имя <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`form-input w-full ${errors.firstName ? 'border-error focus:ring-error' : ''}`}
                      placeholder="Введите имя"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-error">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Patronymic */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Отчество <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.patronymic}
                      onChange={(e) => handleInputChange('patronymic', e.target.value)}
                      className={`form-input w-full ${errors.patronymic ? 'border-error focus:ring-error' : ''}`}
                      placeholder="Введите отчество"
                    />
                    {errors.patronymic && (
                      <p className="mt-1 text-sm text-error">{errors.patronymic}</p>
                    )}
                  </div>

                  {/* Birth Date */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Дата рождения <span className="text-error">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className={`form-input w-full ${errors.birthDate ? 'border-error focus:ring-error' : ''}`}
                    />
                    {errors.birthDate && (
                      <p className="mt-1 text-sm text-error">{errors.birthDate}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Номер телефона <span className="text-error">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange}
                      className={`form-input w-full ${errors.phoneNumber ? 'border-error focus:ring-error' : ''}`}
                      placeholder="+7 XXX XXX-XX-XX"
                      maxLength={18}
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-error">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Medical Information */}
              <div className="card p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Icon name="Stethoscope" size={20} color="var(--color-primary)" />
                  <h2 className="text-xl font-heading font-semibold text-text-primary">
                    Медицинская информация
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Diagnosis */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Диагноз <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      list="diagnosis-options"
                      value={formData.diagnosis}
                      onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                      className={`form-input w-full ${errors.diagnosis ? 'border-error focus:ring-error' : ''}`}
                      placeholder="Введите или выберите диагноз"
                    />
                    <datalist id="diagnosis-options">
                      {diagnosisOptions.map((option, index) => (
                        <option key={index} value={option} />
                      ))}
                    </datalist>
                    {errors.diagnosis && (
                      <p className="mt-1 text-sm text-error">{errors.diagnosis}</p>
                    )}
                  </div>

                  {/* Surgery Type */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Тип операции <span className="text-error">*</span>
                    </label>
                    <select
                      value={formData.surgeryType}
                      onChange={(e) => handleInputChange('surgeryType', e.target.value)}
                      className={`form-input w-full ${errors.surgeryType ? 'border-error focus:ring-error' : ''}`}
                    >
                      <option value="">Выберите тип операции</option>
                      {surgeryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.surgeryType && (
                      <p className="mt-1 text-sm text-error">{errors.surgeryType}</p>
                    )}
                  </div>

                  {/* Referring Doctor */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Направивший врач <span className="text-error">*</span>
                    </label>
                    <select
                      value={formData.referringDoctor}
                      onChange={(e) => handleInputChange('referringDoctor', e.target.value)}
                      className={`form-input w-full ${errors.referringDoctor ? 'border-error focus:ring-error' : ''}`}
                    >
                      <option value="">Выберите врача</option>
                      {referringDoctors.map((doctor) => (
                        <option key={doctor.value} value={doctor.value}>
                          {doctor.label}
                        </option>
                      ))}
                    </select>
                    {errors.referringDoctor && (
                      <p className="mt-1 text-sm text-error">{errors.referringDoctor}</p>
                    )}
                  </div>

                  {/* Admission Status */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Статус поступления
                    </label>
                    <select
                      value={formData.admissionStatus}
                      onChange={(e) => handleInputChange('admissionStatus', e.target.value)}
                      className="form-input w-full"
                    >
                      {admissionStatuses.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Admission Date */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Дата поступления <span className="text-error">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.admissionDate}
                      onChange={(e) => handleInputChange('admissionDate', e.target.value)}
                      className={`form-input w-full ${errors.admissionDate ? 'border-error focus:ring-error' : ''}`}
                    />
                    {errors.admissionDate && (
                      <p className="mt-1 text-sm text-error">{errors.admissionDate}</p>
                    )}
                  </div>

                  {/* Surgery Date */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Дата операции <span className="text-error">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.surgeryDate}
                      onChange={(e) => handleInputChange('surgeryDate', e.target.value)}
                      className={`form-input w-full ${errors.surgeryDate ? 'border-error focus:ring-error' : ''}`}
                    />
                    {errors.surgeryDate && (
                      <p className="mt-1 text-sm text-error">{errors.surgeryDate}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <div>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center space-x-2 px-4 py-2 text-error hover:bg-error-50 rounded-lg transition-colors duration-200"
                  >
                    <Icon name="Trash2" size={18} />
                    <span>Удалить пациента</span>
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 text-text-secondary hover:text-text-primary border border-border hover:border-secondary-300 rounded-lg transition-colors duration-200"
                >
                  Отмена
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting && <Icon name="Loader2" size={18} className="animate-spin" />}
                  <span>{isEditing ? 'Сохранить изменения' : 'Добавить пациента'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1030 p-4">
          <div className="bg-surface rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error-100 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">
                Подтвердите удаление
              </h3>
            </div>
            
            <p className="text-text-secondary mb-6">
              Вы уверены, что хотите удалить данного пациента? Это действие нельзя отменить.
            </p>
            
            <div className="flex items-center justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border hover:border-secondary-300 rounded-lg transition-colors duration-200"
              >
                Отмена
              </button>
              <button
                onClick={handleDelete}
                disabled={isSubmitting}
                className="px-4 py-2 bg-error text-white hover:bg-red-700 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting && <Icon name="Loader2" size={16} className="animate-spin" />}
                <span>Удалить</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEditPatient;