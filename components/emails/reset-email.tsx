import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';

interface PasswordResetEmailProps {
  userName: string;
  resetUrl: string;
  companyName?: string;
}

const PasswordResetEmail = ({
  userName,
  resetUrl,
  companyName = "Note Forge",
}: PasswordResetEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Reset your password for {companyName}</Preview>
      
      <Body style={{ 
        backgroundColor: '#f8fafc', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        padding: '40px 20px',
        margin: 0
      }}>
        <Container style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          maxWidth: '600px',
          margin: '0 auto',
          overflow: 'hidden',
          border: '1px solid #e5e7eb'
        }}>
          
          {/* Header Section */}
          <Section style={{
            background: 'linear-gradient(to right, #dc2626, #ea580c, #d97706)',
            padding: '40px',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto'
              }}>
                🔒
              </div>
            </div>
            
            <Heading style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '8px',
              margin: 0
            }}>
              Password Reset Request
            </Heading>
            
            <Text style={{
              fontSize: '18px',
              color: '#fed7c3',
              margin: 0
            }}>
              Secure your account with a new password
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={{ padding: '40px' }}>
            <Text style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '16px',
              margin: '0 0 16px 0'
            }}>
              Hi {userName} 👋
            </Text>
            
            <Text style={{
              fontSize: '16px',
              color: '#4b5563',
              lineHeight: '26px',
              marginBottom: '24px',
              margin: '0 0 24px 0'
            }}>
              We received a request to reset your password for your <strong style={{ color: '#dc2626' }}>{companyName}</strong> account. 
              If you didn&apos;t make this request, you can safely ignore this email.
            </Text>

            {/* Security Notice */}
            <Section style={{
              background: 'linear-gradient(to right, #fef3c7, #fde68a)',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '32px',
              border: '1px solid #f59e0b'
            }}>
              <Text style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#92400e',
                marginBottom: '16px',
                margin: '0 0 16px 0'
              }}>
                🛡️ Security Information:
              </Text>
              
              <Text style={{
                fontSize: '14px',
                color: '#b45309',
                marginBottom: '8px',
                margin: '0 0 8px 0'
              }}>
                • This link will expire in 1 hour for security
              </Text>
              <Text style={{
                fontSize: '14px',
                color: '#b45309',
                marginBottom: '8px',
                margin: '0 0 8px 0'
              }}>
                • Only use this link if you requested it
              </Text>
              <Text style={{
                fontSize: '14px',
                color: '#b45309',
                margin: 0
              }}>
                • Choose a strong, unique password
              </Text>
            </Section>
            
            {/* CTA Button */}
            <Section style={{ textAlign: 'center', marginBottom: '32px' }}>
              <Button
                href={resetUrl}
                style={{
                  background: 'linear-gradient(to right, #dc2626, #ea580c)',
                  color: '#ffffff',
                  padding: '16px 40px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                }}
              >
                🔑 Reset My Password
              </Button>
              
              <Text style={{
                fontSize: '12px',
                color: '#6b7280',
                marginTop: '16px',
                margin: '16px 0 0 0'
              }}>
                This link will expire in 1 hour for your security
              </Text>
            </Section>

            <Hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '32px 0' }} />
            
            {/* Alternative Link Section */}
            <Section style={{
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '32px'
            }}>
              <Text style={{
                fontSize: '14px',
                color: '#4b5563',
                lineHeight: '20px',
                marginBottom: '12px',
                margin: '0 0 12px 0'
              }}>
                <strong>Button not working?</strong> Copy and paste this link into your browser:
              </Text>
              
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '12px',
                wordBreak: 'break-all'
              }}>
                <Link 
                  href={resetUrl}
                  style={{
                    fontSize: '13px',
                    color: '#dc2626',
                    textDecoration: 'none'
                  }}
                >
                  {resetUrl}
                </Link>
              </div>
            </Section>
            
            {/* Important Notice */}
            <Section style={{
              backgroundColor: '#fef2f2',
              borderLeft: '4px solid #dc2626',
              padding: '16px',
              marginBottom: '32px'
            }}>
              <Text style={{
                fontSize: '14px',
                color: '#991b1b',
                fontWeight: '500',
                marginBottom: '8px',
                margin: '0 0 8px 0'
              }}>
                ⚠️ Important Security Notice
              </Text>
              <Text style={{
                fontSize: '13px',
                color: '#b91c1c',
                lineHeight: '18px',
                margin: 0
              }}>
                {/* ✅ FIXED: Escaped apostrophe */}
                If you didn&apos;t request a password reset, please ignore this email or contact our support team immediately. 
                Your account security is important to us.
              </Text>
            </Section>
            
            {/* Closing */}
            <Text style={{
              fontSize: '16px',
              color: '#374151',
              marginBottom: '8px',
              margin: '0 0 8px 0'
            }}>
              Need help?
            </Text>
            <Text style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#dc2626',
              marginBottom: '32px',
              margin: '0 0 32px 0'
            }}>
              Contact The {companyName} Support Team 🛟
            </Text>
          </Section>
          
          {/* Footer */}
          <Section style={{
            backgroundColor: '#111827',
            padding: '32px 40px',
            textAlign: 'center'
          }}>
            <Text style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '16px',
              margin: '0 0 16px 0'
            }}>
              {companyName}
            </Text>
            
            <Text style={{
              fontSize: '14px',
              color: '#d1d5db',
              lineHeight: '22px',
              marginBottom: '20px',
              margin: '0 0 20px 0'
            }}>
              Protecting your notes, securing your future.<br />
              Advanced security for modern productivity.
            </Text>
            
            <Hr style={{ border: 'none', borderTop: '1px solid #374151', margin: '24px 0' }} />
            
            <Text style={{
              fontSize: '12px',
              color: '#9ca3af',
              marginBottom: '16px',
              margin: '0 0 16px 0'
            }}>
              📍 123 Business Street, Suite 100<br />
              Surat, Gujarat 395007, India
            </Text>
            
            <Text style={{
              fontSize: '12px',
              color: '#9ca3af',
              margin: 0
            }}>
              <Link href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Privacy Policy</Link>
              {' • '}
              <Link href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Terms of Service</Link>
              {' • '}
              <Link href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Contact Support</Link>
            </Text>
            
            <Text style={{
              fontSize: '11px',
              color: '#6b7280',
              marginTop: '16px',
              margin: '16px 0 0 0'
            }}>
              © 2025 {companyName}. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default PasswordResetEmail;
