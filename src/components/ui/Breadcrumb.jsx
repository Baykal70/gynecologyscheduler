import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  const getBreadcrumbs = () => {
    const path = location.pathname;
    const breadcrumbs = [
      { label: 'Главная', path: '/dashboard', icon: 'Home' }
    ];

    switch (path) {
      case '/dashboard':
        return [{ label: 'Главная', path: '/dashboard', icon: 'Home', current: true }];
      
      case '/patient-list':
        breadcrumbs.push({ label: 'Пациенты', path: '/patient-list', current: true });
        break;
      
      case '/add-edit-patient':
        breadcrumbs.push(
          { label: 'Пациенты', path: '/patient-list' },
          { label: 'Добавить пациента', path: '/add-edit-patient', current: true }
        );
        break;
      
      case '/patient-details':
        breadcrumbs.push(
          { label: 'Пациенты', path: '/patient-list' },
          { label: 'Детали пациента', path: '/patient-details', current: true }
        );
        break;
      
      case '/surgery-schedule':
        breadcrumbs.push({ label: 'Расписание операций', path: '/surgery-schedule', current: true });
        break;
      
      default:
        return breadcrumbs;
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length <= 1 && breadcrumbs[0]?.current) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-text-secondary mx-2" 
              />
            )}
            
            {breadcrumb.current ? (
              <span className="flex items-center space-x-1 text-text-primary font-medium">
                {breadcrumb.icon && index === 0 && (
                  <Icon name={breadcrumb.icon} size={16} />
                )}
                <span>{breadcrumb.label}</span>
              </span>
            ) : (
              <Link
                to={breadcrumb.path}
                className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors duration-200"
              >
                {breadcrumb.icon && index === 0 && (
                  <Icon name={breadcrumb.icon} size={16} />
                )}
                <span>{breadcrumb.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;