import React from 'react';
import { theme } from '../../constants/theme';

const Card = ({ children, style = {}, onClick, ...props }) => {
  return (
    <div 
      onClick={onClick}
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.xl,
        boxShadow: theme.shadows.soft,
        border: `1px solid ${theme.colors.border}`,
        transition: theme.transitions.transform,
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
      onMouseOver={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = theme.shadows.medium;
        }
      }}
      onMouseOut={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = theme.shadows.soft;
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
