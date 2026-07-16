import React from 'react';
import { theme } from '../../constants/theme';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'lg', 
  fullWidth = false, 
  onClick, 
  style = {},
  ...props 
}) => {
  const isPrimary = variant === 'primary';
  
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: theme.typography.weights.semibold,
    borderRadius: theme.borderRadius.full,
    cursor: 'pointer',
    transition: theme.transitions.default,
    border: isPrimary ? 'none' : `2px solid ${theme.colors.primary}`,
    backgroundColor: isPrimary ? theme.colors.primary : 'transparent',
    color: isPrimary ? theme.colors.surface : theme.colors.primary,
    width: fullWidth ? '100%' : 'auto',
    fontFamily: theme.typography.fontFamily,
    ...style
  };

  const sizes = {
    sm: { padding: '8px 16px', fontSize: theme.typography.sizes.sm },
    md: { padding: '12px 24px', fontSize: theme.typography.sizes.base },
    lg: { padding: '16px 32px', fontSize: theme.typography.sizes.lg },
  };

  return (
    <button 
      style={{ ...baseStyle, ...sizes[size] }}
      onClick={onClick}
      onMouseOver={(e) => {
        if (isPrimary) e.currentTarget.style.backgroundColor = theme.colors.primaryHover;
        else e.currentTarget.style.backgroundColor = `${theme.colors.primary}10`;
      }}
      onMouseOut={(e) => {
        if (isPrimary) e.currentTarget.style.backgroundColor = theme.colors.primary;
        else e.currentTarget.style.backgroundColor = 'transparent';
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
