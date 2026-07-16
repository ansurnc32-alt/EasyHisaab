import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, FileText, CheckCircle, Zap, ShieldCheck, HeartHandshake, Play } from 'lucide-react';
import { theme } from '../constants/theme';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. HERO SECTION */}
      <Section bg="surface" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <Container>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            gap: theme.spacing.xxl,
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: '1 1 400px' }}>
              <h1 style={{ 
                fontSize: theme.typography.sizes.hero, 
                color: theme.colors.primary,
                marginBottom: theme.spacing.md,
                fontWeight: theme.typography.weights.bold
              }}>
                Hindi mein bolo.<br/>Invoice turant banao.
              </h1>
              <p style={{ 
                fontSize: theme.typography.sizes.xl, 
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing.xl,
                maxWidth: '500px'
              }}>
                EasyHisaab converts your normal Hindi speech into a professional invoice.
              </p>
              <div style={{ display: 'flex', gap: theme.spacing.md, flexWrap: 'wrap' }}>
                <Button size="lg" onClick={() => navigate('/business-selection')}>
                  Shuru Karein
                </Button>
                <Button variant="outline" size="lg" onClick={() => {}}>
                  <Play size={20} style={{ marginRight: theme.spacing.sm }} />
                  Demo Dekhein
                </Button>
              </div>
            </div>
            
            <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
              {/* Illustration Placeholder */}
              <div style={{
                width: '100%',
                maxWidth: '400px',
                aspectRatio: '1',
                backgroundColor: `${theme.colors.primary}10`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `2px dashed ${theme.colors.primary}40`
              }}>
                <Mic size={100} color={theme.colors.primary} opacity={0.5} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. HOW IT WORKS SECTION */}
      <Section>
        <Container>
          <PageHeader 
            title="Kaise Kaam Karta Hai?" 
            subtitle="Sirf 4 asaan steps mein apna invoice banayein" 
          />
          
          <div style={{ 
            display: 'flex', 
            gap: theme.spacing.lg, 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[
              { step: 1, title: 'Choose Business', icon: <HeartHandshake size={32} /> },
              { step: 2, title: 'Speak Naturally', icon: <Mic size={32} /> },
              { step: 3, title: 'Review Items', icon: <CheckCircle size={32} /> },
              { step: 4, title: 'Generate PDF', icon: <FileText size={32} /> }
            ].map((item) => (
              <React.Fragment key={item.step}>
                <Card style={{ flex: '1 1 200px', textAlign: 'center', minWidth: '200px' }}>
                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: '64px', height: '64px',
                    borderRadius: '50%',
                    backgroundColor: `${theme.colors.primary}10`,
                    color: theme.colors.primary,
                    marginBottom: theme.spacing.md
                  }}>
                    {item.icon}
                  </div>
                  <h3 style={{ fontSize: theme.typography.sizes.lg, color: theme.colors.text.main }}>
                    {item.title}
                  </h3>
                </Card>
              </React.Fragment>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. WHY EASYHISAAB SECTION */}
      <Section bg="surface">
        <Container>
          <PageHeader 
            title="EasyHisaab Kyun?" 
          />
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: theme.spacing.xl 
          }}>
            <Card>
              <Zap size={40} color={theme.colors.accent} style={{ marginBottom: theme.spacing.sm }} />
              <h3 style={{ marginBottom: theme.spacing.sm }}>No typing</h3>
              <p>Type karne ki jhanjhat khatam. Bas boliye aur invoice tayyar.</p>
            </Card>
            <Card>
              <HeartHandshake size={40} color={theme.colors.accent} style={{ marginBottom: theme.spacing.sm }} />
              <h3 style={{ marginBottom: theme.spacing.sm }}>Hindi First</h3>
              <p>Aapki bhasha mein samajhta hai. "Do kilo aalu" boliye, system samajh jayega.</p>
            </Card>
            <Card>
              <Zap size={40} color={theme.colors.accent} style={{ marginBottom: theme.spacing.sm }} />
              <h3 style={{ marginBottom: theme.spacing.sm }}>Fast</h3>
              <p>10 second se bhi kam samay mein customer ko invoice bhejein.</p>
            </Card>
            <Card>
              <ShieldCheck size={40} color={theme.colors.accent} style={{ marginBottom: theme.spacing.sm }} />
              <h3 style={{ marginBottom: theme.spacing.sm }}>Simple</h3>
              <p>Koi technical knowledge ki zaroorat nahi. Chalane mein behad asaan.</p>
            </Card>
            <Card style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: theme.spacing.lg, flexWrap: 'wrap' }}>
              <div style={{ 
                padding: theme.spacing.md, 
                backgroundColor: theme.colors.primary, 
                borderRadius: theme.borderRadius.full,
                color: 'white'
              }}>
                <Zap size={32} />
              </div>
              <div>
                <h3 style={{ color: theme.colors.primary, marginBottom: theme.spacing.xs }}>AI Powered</h3>
                <p style={{ margin: 0 }}>Advanced artificial intelligence ensure karta hai ki aapka bill hamesha 100% accurate ho.</p>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 4. FOOTER */}
      <footer style={{ 
        backgroundColor: theme.colors.primary, 
        color: 'white', 
        padding: `${theme.spacing.xl} 0`,
        textAlign: 'center'
      }}>
        <Container>
          <h2 style={{ color: 'white', marginBottom: theme.spacing.md }}>EasyHisaab</h2>
          <p style={{ color: `${theme.colors.surface}CC` }}>Aapka smart hisaab-kitab partner.</p>
          <div style={{ marginTop: theme.spacing.lg, color: `${theme.colors.surface}80`, fontSize: theme.typography.sizes.sm }}>
            &copy; 2026 EasyHisaab. All rights reserved.
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
