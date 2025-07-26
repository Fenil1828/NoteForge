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

interface VerificationEmailProps {
  userName: string;
  verificationUrl: string;
  companyName?: string;
}

const VerificationEmail = ({
  userName,
  verificationUrl,
  companyName = "Note Forge",
}: VerificationEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Verify your email address to complete your registration</Preview>
      
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
            background: 'linear-gradient(to right, #2563eb, #4f46e5, #7c3aed)',
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
                📧
              </div>
            </div>
            
            <Heading style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '8px',
              margin: 0
            }}>
              Welcome to {companyName}!
            </Heading>
            
            <Text style={{
              fontSize: '18px',
              color: '#ddd6fe',
              margin: 0
            }}>
              {/* ✅ FIXED: Escaped apostrophe */}
              You&apos;re just one step away from getting started
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
              {/* ✅ FIXED: Escaped apostrophe */}
              Thank you for choosing <strong style={{ color: '#4f46e5' }}>{companyName}</strong>! 
              We&apos;re excited to have you on board. To ensure the security of your account and complete your registration, 
              please verify your email address.
            </Text>

            {/* Feature Highlights */}
            <Section style={{
              background: 'linear-gradient(to right, #eff6ff, #eef2ff)',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '32px',
              border: '1px solid #dbeafe'
            }}>
              <Text style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '16px',
                margin: '0 0 16px 0'
              }}>
                {/* ✅ FIXED: Escaped apostrophe */}
                🚀 What&apos;s waiting for you:
              </Text>
              
              <Text style={{
                fontSize: '14px',
                color: '#4b5563',
                marginBottom: '8px',
                margin: '0 0 8px 0'
              }}>
                • Access to all premium features
              </Text>
              <Text style={{
                fontSize: '14px',
                color: '#4b5563',
                marginBottom: '8px',
                margin: '0 0 8px 0'
              }}>
                • Secure cloud storage for your notes
              </Text>
              <Text style={{
                fontSize: '14px',
                color: '#4b5563',
                margin: 0
              }}>
                • 24/7 customer support
              </Text>
            </Section>
            
            {/* CTA Button */}
            <Section style={{ textAlign: 'center', marginBottom: '32px' }}>
              <Button
                href={verificationUrl}
                style={{
                  background: 'linear-gradient(to right, #2563eb, #4f46e5)',
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
                ✅ Verify Email Address
              </Button>
              
              <Text style={{
                fontSize: '12px',
                color: '#6b7280',
                marginTop: '16px',
                margin: '16px 0 0 0'
              }}>
                This button will redirect you to our secure verification page
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
                <strong>Having trouble with the button?</strong> Copy and paste this link into your browser:
              </Text>
              
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '12px',
                wordBreak: 'break-all'
              }}>
                <Link 
                  href={verificationUrl}
                  style={{
                    fontSize: '13px',
                    color: '#2563eb',
                    textDecoration: 'none'
                  }}
                >
                  {verificationUrl}
                </Link>
              </div>
            </Section>
            
            {/* Security Notice */}
            <Section style={{
              backgroundColor: '#fffbeb',
              borderLeft: '4px solid #f59e0b',
              padding: '16px',
              marginBottom: '32px'
            }}>
              <Text style={{
                fontSize: '14px',
                color: '#92400e',
                fontWeight: '500',
                marginBottom: '8px',
                margin: '0 0 8px 0'
              }}>
                🔒 Security Notice
              </Text>
              <Text style={{
                fontSize: '13px',
                color: '#b45309',
                lineHeight: '18px',
                margin: 0
              }}>
                This verification link will expire in <strong>24 hours</strong> for security reasons. 
                {/* ✅ FIXED: Escaped apostrophe */}
                If you didn&apos;t create an account with us, you can safely ignore this email.
              </Text>
            </Section>
            
            {/* Closing */}
            <Text style={{
              fontSize: '16px',
              color: '#374151',
              marginBottom: '8px',
              margin: '0 0 8px 0'
            }}>
              Best regards,
            </Text>
            <Text style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#4f46e5',
              marginBottom: '32px',
              margin: '0 0 32px 0'
            }}>
              The {companyName} Team 💙
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
              Empowering your productivity, one note at a time.<br />
              Building the future of digital note-taking.
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
              <Link href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Unsubscribe</Link>
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

export default VerificationEmail;
