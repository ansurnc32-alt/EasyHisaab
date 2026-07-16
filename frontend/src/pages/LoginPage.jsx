import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Phone } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { theme } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!formData.identifier.trim()) {
      setError('Email ya mobile number darj karen.');
      return;
    }

    if (!formData.password) {
      setError('Password darj karen.');
      return;
    }

    try {
      await login({ identifier: formData.identifier, password: formData.password });
      navigate('/business-selection', { replace: true });
    } catch (authError) {
      setError(authError.message || 'Login failed.');
    }
  };

  const cardStyle = useMemo(() => ({
    maxWidth: '520px',
    margin: '0 auto',
    padding: theme.spacing.xl,
  }), []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background, padding: `${theme.spacing.xl} ${theme.spacing.md}` }}>
      <Section style={{ width: '100%' }}>
        <Container>
          <Card style={cardStyle}>
            <PageHeader title="Login" subtitle="Apni account mein enter karen" />
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
              {error && <div style={{ color: '#B91C1C', fontWeight: 600 }}>{error}</div>}
              <label style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, border: `1px solid ${theme.colors.border}`, borderRadius: theme.borderRadius.md, padding: `0 ${theme.spacing.sm}` }}>
                <Mail size={18} color={theme.colors.primary} />
                <Input
                  placeholder="Email ya Mobile"
                  value={formData.identifier}
                  onChange={(event) => setFormData((previous) => ({ ...previous, identifier: event.target.value }))}
                  style={{ border: 'none', boxShadow: 'none', paddingLeft: 0 }}
                />
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, border: `1px solid ${theme.colors.border}`, borderRadius: theme.borderRadius.md, padding: `0 ${theme.spacing.sm}` }}>
                <Lock size={18} color={theme.colors.primary} />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(event) => setFormData((previous) => ({ ...previous, password: event.target.value }))}
                  style={{ border: 'none', boxShadow: 'none', paddingLeft: 0 }}
                />
              </label>
              <Button type="submit" disabled={loading} style={{ width: '100%' }}>
                {loading ? 'Processing...' : 'Login'}
              </Button>
              <div style={{ textAlign: 'center', color: theme.colors.text.secondary }}>
                Naye account ke liye <Link to="/register" style={{ color: theme.colors.primary, fontWeight: 600 }}>Register karein</Link>
              </div>
            </form>
          </Card>
        </Container>
      </Section>
    </div>
  );
};

export default LoginPage;
