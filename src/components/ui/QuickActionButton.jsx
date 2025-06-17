import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const QuickActionButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const quickActions = [
    {
      label: 'Добавить пациента',
      icon: 'UserPlus',
      action: () => navigate('/add-edit-patient'),
      color: 'bg-primary hover:bg-primary-700'
    },
    {
      label: 'Экстренное обновление',
      icon: 'AlertTriangle',
      action: () => console.log('Emergency update'),
      color: 'bg-warning hover:bg-amber-700'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleActionClick = (action) => {
    action();
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-1020" ref={buttonRef}>
      {/* Action Menu */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 mb-2 space-y-2 animate-in slide-in-from-bottom-2 duration-200">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleActionClick(action.action)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-white shadow-lg transition-all duration-200 whitespace-nowrap ${action.color}`}
            >
              <Icon name={action.icon} size={18} />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={handleToggle}
        className={`w-14 h-14 bg-primary hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center ${
          isExpanded ? 'rotate-45' : ''
        }`}
        aria-label="Быстрые действия"
      >
        <Icon name="Plus" size={24} />
      </button>
    </div>
  );
};

export default QuickActionButton;