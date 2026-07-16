import React from 'react';
import { theme } from '../../constants/theme';

const Container = ({ children, style = {}, ...props }) => {
  return (
    <div 
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `0 ${theme.spacing.lg}`,
        width: '100%',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
