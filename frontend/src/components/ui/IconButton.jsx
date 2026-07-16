import React from 'react';
import { theme } from '../../constants/theme';

const IconButton = ({ children, onClick, style = {}, ...props }) => {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        cursor: 'pointer',
        transition: theme.transitions.default,
        color: theme.colors.primary,
        ...style
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = `${theme.colors.primary}10`;
        e.currentTarget.style.borderColor = theme.colors.primary;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = theme.colors.surface;
        e.currentTarget.style.borderColor = theme.colors.border;
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
