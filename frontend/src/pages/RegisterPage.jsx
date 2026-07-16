import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Phone, User, Store } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { theme } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    shopName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!formData.fullName.trim()) {
      setError('Full name jaroori hai.');
      return;
    }

    if (!formData.shopName.trim()) {
      setError('Shop name jaroori hai.');
      return;
    }

    if (!formData.mobile.trim()) {
      setError('Mobile number jaroori hai.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Valid email darj karen.');
      return;
    }

    if (!formData.password) {
      setError('Password jaroori hai.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password kam se kam 6 characters ka hona chahiye.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords match nahi kar rahe.');
      return;
    }

    try {
      await register(formData);
      navigate('/business-selection', { replace: true });
    } catch (authError) {
      setError(authError.message || 'Registration failed.');
    }
  };

  const cardStyle = useMemo(() => ({
    maxWidth: '620px',
    margin: '0 auto',
    padding: theme.spacing.xl,
  }), []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background, padding: `${theme.spacing.xl} ${theme.spacing.md}` }}>
      <Section style={{ width: '100%' }}>
        <Container>
          <Card style={cardStyle}>
            <PageHeader title="Register" subtitle="Naya account banayein" />
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
              {error && <div style={{ color: '#B91C1C', fontWeight: 600 }}>{error}</div>}
              <label style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, border: `1px solid ${theme.colors.border}`, borderRadius: theme.borderRadius.md, padding: `0 ${theme.spacing.sm}` }}>
                <User size={18} color={theme.colors.primary} />
                <Input placeholder="Full Name" value={formData.fullName} onChange={(event) => setFormData((previous) => ({ ...previous, fullName: event.target.value }))} style={{ border: 'none', boxShadow: 'none', paddingLeft: 0 }} />
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, border: `1px solid ${theme.colors.border}`, borderRadius: theme.borderRadius.md, padding: `0 ${theme.spacing.sm}` }}>
                <Store size={18} color={theme.colors.primary} />
                <Input placeholder="Shop Name" value={formData.shopName} onChange={(event) => setFormData((previous) => ({ ...previous, shopName: event.target.value }))} style={{ border: 'none', boxShadow: 'none', paddingLeft: 0 }} />
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, border: `1px solid ${theme.colors.border}`, borderRadius: theme.borderRadius.md, padding: `0 ${theme.spacing.sm}` }}>
                <Phone size={18} color={theme.colors.primary} />
                <Input placeholder="Mobile Number" value={formData.mobile} onChange={(event) => setFormData((previous) => ({ ...previous, mobile: event.target.value }))} style={{ border: 'none', boxShadow: 'none', paddingLeft: 0 }} />
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, border: `1px solid ${theme.colors.border}`, borderRadius: theme.borderRadius.md, padding: `0 ${theme.spacing.sm}` }}>
                <Mail size={18} color={theme.colors.primary} />
                <Input type="email" placeholder="Email" value={formData.email} onChange={(event) => setFormData((previous) => ({ ...previous, email: event.target.value }))} style={{ border: 'none', boxShadow: 'none', paddingLeft: 0 }} />
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, border: `1px solid ${theme.colors.border}`, borderRadius: theme.borderRadius.md, padding: `0 ${theme.spacing.sm}` }}>
                <Lock size={18} color={theme.colors.primary} />
                <Input type="password" placeholder="Password" value={formData.password} onChange={(event) => setFormData((previous) => ({ ...previous, password: event.target.value }))} style={{ border: 'none', boxShadow: 'none', paddingLeft: 0 }} />
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, border: `1px solid ${theme.colors.border}`, borderRadius: theme.borderRadius.md, padding: `0 ${theme.spacing.sm}` }}>
                <Lock size={18} color={theme.colors.primary} />
                <Input type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(event) => setFormData((previous) => ({ ...previous, confirmPassword: event.target.value }))} style={{ border: 'none', boxShadow: 'none', paddingLeft: 0 }} />
              </label>
              <Button type="submit" disabled={loading} style={{ width: '100%' }}>
                {loading ? 'Processing...' : 'Register'}
              </Button>
              <div style={{ textAlign: 'center', color: theme.colors.text.secondary }}>
                Pehle se account hai? <Link to="/login" style={{ color: theme.colors.primary, fontWeight: 600 }}>Login karein</Link>
              </div>
            </form>
          </Card>
        </Container>
      </Section>
    </div>
  );
};

export default RegisterPage;
