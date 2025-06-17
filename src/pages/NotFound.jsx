import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="FileQuestion" size={48} color="var(--color-primary)" />
          </div>
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Страница не найдена
          </h2>
          <p className="text-text-secondary mb-8">
            Запрашиваемая страница не существует или была перемещена.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center space-x-2 w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <Icon name="Home" size={20} />
            <span>Вернуться на главную</span>
          </Link>
          
          <Link
            to="/patient-list"
            className="inline-flex items-center justify-center space-x-2 w-full px-6 py-3 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-200"
          >
            <Icon name="Users" size={20} />
            <span>Список пациентов</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;