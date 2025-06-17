import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Главная',
      path: '/dashboard',
      icon: 'LayoutDashboard'
    },
    {
      label: 'Пациенты',
      path: '/patient-list',
      icon: 'Users'
    },
    {
      label: 'Расписание операций',
      path: '/surgery-schedule',
      icon: 'Calendar'
    }
  ];

  const isActivePath = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/';
    }
    if (path === '/patient-list') {
      return location.pathname === '/patient-list' || 
             location.pathname === '/add-edit-patient' || 
             location.pathname === '/patient-details';
    }
    return location.pathname === path;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    // Logout logic here
    console.log('Logout clicked');
    setIsProfileOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-1000">
        <div className="px-4 lg:px-6">
          <div className="flex items-center justify-between h-15">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Stethoscope" size={20} color="white" />
                </div>
                <span className="text-xl font-heading font-semibold text-text-primary hidden sm:block">
                  МедКлиника
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-secondary-100'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 text-text-secondary hover:text-primary transition-colors duration-200 relative">
                <Icon name="Bell" size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={handleProfileToggle}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary-100 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="#2563EB" />
                  </div>
                  <span className="text-sm font-medium text-text-primary hidden lg:block">
                    Доктор Иванов
                  </span>
                  <Icon 
                    name="ChevronDown" 
                    size={16} 
                    className={`text-text-secondary transition-transform duration-200 ${
                      isProfileOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg z-1010">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-sm font-medium text-text-primary">Доктор Иванов</p>
                        <p className="text-xs text-text-secondary">ivanov@medclinic.ru</p>
                      </div>
                      <button className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-secondary-100 hover:text-text-primary transition-colors duration-200 flex items-center space-x-2">
                        <Icon name="User" size={16} />
                        <span>Профиль</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-secondary-100 hover:text-text-primary transition-colors duration-200 flex items-center space-x-2">
                        <Icon name="Settings" size={16} />
                        <span>Настройки</span>
                      </button>
                      <div className="border-t border-border">
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error-50 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <Icon name="LogOut" size={16} />
                          <span>Выйти</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={handleMobileMenuToggle}
                className="md:hidden p-2 text-text-secondary hover:text-primary transition-colors duration-200"
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface">
            <nav className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-secondary-100'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Spacer to prevent content overlap */}
      <div className="h-15"></div>
    </>
  );
};

export default Header;