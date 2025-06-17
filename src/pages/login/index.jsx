import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock credentials for demonstration
  const mockCredentials = {
    username: 'doctor.ivanov',
    password: 'medclinic2024'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Введите имя пользователя';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Введите пароль';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (formData.username === mockCredentials.username && 
          formData.password === mockCredentials.password) {
        // Successful login
        navigate('/dashboard');
      } else {
        // Failed login
        setErrors({
          general: 'Неверное имя пользователя или пароль'
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    alert('Обратитесь к системному администратору для восстановления пароля');
  };

  const handleRegister = () => {
    alert('Для регистрации нового врача обратитесь к администратору системы');
  };

  const handleSupport = () => {
    alert('Техническая поддержка: +7 (495) 123-45-67');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563EB' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-surface rounded-2xl shadow-xl border border-border p-8">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Logo */}
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Stethoscope" size={32} color="white" />
            </div>
            
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              МедКлиника
            </h1>
            <p className="text-text-secondary text-sm">
              Система планирования гинекологических операций
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="bg-error-50 border border-error-100 rounded-lg p-3 flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} color="var(--color-error)" />
                <span className="text-sm text-error">{errors.general}</span>
              </div>
            )}

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-text-primary mb-2">
                Имя пользователя
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="User" size={18} color="var(--color-text-secondary)" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
                    errors.username ? 'border-error' : 'border-border'
                  }`}
                  placeholder="Введите имя пользователя"
                  autoComplete="username"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-error">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Пароль
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Lock" size={18} color="var(--color-text-secondary)" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
                    errors.password ? 'border-error' : 'border-border'
                  }`}
                  placeholder="Введите пароль"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Icon 
                    name={showPassword ? "EyeOff" : "Eye"} 
                    size={18} 
                    color="var(--color-text-secondary)" 
                  />
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-error">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-text-secondary">Запомнить меня</span>
              </label>
              
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
              >
                Забыли пароль?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Вход в систему...</span>
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={18} />
                  <span>Войти</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <button
                onClick={handleRegister}
                className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
              >
                Регистрация врача
              </button>
              
              <button
                onClick={handleSupport}
                className="text-sm text-text-secondary hover:text-primary transition-colors duration-200 flex items-center space-x-1"
              >
                <Icon name="HelpCircle" size={14} />
                <span>Техподдержка</span>
              </button>
            </div>
          </div>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
              <div className="text-xs text-primary">
                <p className="font-medium mb-1">Демо-доступ:</p>
                <p>Логин: doctor.ivanov</p>
                <p>Пароль: medclinic2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8">
          <p className="text-sm text-text-secondary">
            © {new Date().getFullYear()} МедКлиника. Все права защищены.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;