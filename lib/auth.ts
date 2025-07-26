import { db } from "@/db/drizzle";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { schema } from '@/db/schema'
import { nextCookies } from "better-auth/next-js";
import nodemailer from 'nodemailer';
import { render } from '@react-email/components';
import VerificationEmail from "@/components/emails/verification-email";
import PasswordResetEmail from "@/components/emails/reset-email";
// import PasswordResetEmail from "@/components/emails/password-reset-email"; // 👈 Add this import

// ✅ Create Gmail transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      console.log("=== EMAIL VERIFICATION START ===");
      console.log("Attempting to send verification email to:", user.email);
      console.log("User name:", user.name);
      console.log("Verification URL:", url);

      try {
        const emailHtml = await render(
          VerificationEmail({
            userName: user.name || "User",
            verificationUrl: url,
            companyName: "Note Forge",
          })
        );

        await transporter.sendMail({
          from: '"Note Forge" <jasanifenil4@gmail.com>',
          to: user.email,
          subject: "Verify your email address - Note Forge",
          html: emailHtml,
        });

        console.log("✅ Email sent successfully via Gmail!");
        console.log("=== EMAIL VERIFICATION END ===");
      } catch (error) {
        console.error("❌ Error sending verification email:", error);
        console.log("=== EMAIL VERIFICATION FAILED ===");
        throw error;
      }
    },
    sendOnSignUp: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      console.log("=== PASSWORD RESET EMAIL START ===");
      console.log("Attempting to send reset email to:", user.email);
      console.log("User name:", user.name);
      console.log("Reset URL:", url);

      try {
        // 🎯 Render your custom password reset email template
        const emailHtml = await render(
          PasswordResetEmail({
            userName: user.name || "User",
            resetUrl: url,
            companyName: "Note Forge",
          })
        );

        await transporter.sendMail({
          from: '"Note Forge Security" <jasanifenil4@gmail.com>',
          to: user.email,
          subject: "🔒 Reset your Note Forge password",
          html: emailHtml,
        });

        console.log("✅ Password reset email sent successfully!");
        console.log("=== PASSWORD RESET EMAIL END ===");
      } catch (error) {
        console.error("❌ Error sending password reset email:", error);
        console.log("=== PASSWORD RESET EMAIL FAILED ===");
        throw error;
      }
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  plugins: [nextCookies()],
});
