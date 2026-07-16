import React from 'react';
import { theme } from '../../constants/theme';

const Input = ({ placeholder, type = 'text', style = {}, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '16px',
        borderRadius: theme.borderRadius.md,
        border: `1px solid ${theme.colors.border}`,
        fontSize: theme.typography.sizes.base,
        fontFamily: theme.typography.fontFamily,
        outline: 'none',
        transition: theme.transitions.colors,
        ...style
      }}
      onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
      onBlur={(e) => e.target.style.borderColor = theme.colors.border}
      {...props}
    />
  );
};

export default Input;
