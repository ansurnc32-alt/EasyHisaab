import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { theme } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import Container from '../ui/Container';
import Button from '../ui/Button';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isLandingPage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isLandingPage) {
    return <Outlet />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: theme.colors.background }}>
      <header style={{ padding: theme.spacing.md, backgroundColor: theme.colors.surface, borderBottom: `1px solid ${theme.colors.border}` }}>
        <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: theme.spacing.md, flexWrap: 'wrap' }}>
          <h1 style={{ color: theme.colors.primary, margin: 0, fontSize: theme.typography.sizes.xl }}>EasyHisaab</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
            {user ? (
              <>
                <span style={{ color: theme.colors.text.secondary, fontWeight: 600 }}>{user.fullName}</span>
                <Button variant="outline" size="sm" onClick={async () => { await logout(); navigate('/login'); }}>
                  Logout
                </Button>
              </>
            ) : !isAuthPage ? (
              <Link to="/login" style={{ color: theme.colors.primary, fontWeight: 600, textDecoration: 'none' }}>Login</Link>
            ) : null}
          </div>
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
