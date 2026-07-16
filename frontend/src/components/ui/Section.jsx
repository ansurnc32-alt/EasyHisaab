import React from 'react';
import { theme } from '../../constants/theme';

const Section = ({ children, style = {}, bg = 'transparent', ...props }) => {
  return (
    <section 
      style={{
        padding: `${theme.spacing.xxxl} 0`,
        backgroundColor: bg === 'surface' ? theme.colors.surface : bg === 'primary' ? theme.colors.primary : 'transparent',
        ...style
      }}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
