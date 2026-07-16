import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { theme } from '../../constants/theme';
import Container from '../ui/Container';

const MainLayout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return <Outlet />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: theme.colors.background }}>
      <header style={{ padding: theme.spacing.md, backgroundColor: theme.colors.surface, borderBottom: `1px solid ${theme.colors.border}` }}>
        <Container>
          <h1 style={{ color: theme.colors.primary, margin: 0, fontSize: theme.typography.sizes.xl }}>EasyHisaab</h1>
        </Container>
      </header>
      <main style={{ flex: 1, padding: `${theme.spacing.xl} 0` }}>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default MainLayout;
