import React from 'react';
import { theme } from '../../constants/theme';

const PageHeader = ({ title, subtitle, style = {}, ...props }) => {
  return (
    <div style={{ marginBottom: theme.spacing.xxl, textAlign: 'center', ...style }} {...props}>
      <h2 style={{ 
        fontSize: theme.typography.sizes.xxl, 
        color: theme.colors.primary,
        marginBottom: theme.spacing.sm
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ 
          fontSize: theme.typography.sizes.lg, 
          color: theme.colors.text.secondary 
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
