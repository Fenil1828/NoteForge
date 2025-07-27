# 📝 NoteForge

A modern, feature-rich note-taking application built with Next.js that transforms the way you create, organize, and manage your notebooks and notes. NoteForge combines powerful functionality with an intuitive interface to provide an enhanced note-taking experience.

## ✨ Features

- 📚 **Smart Notebooks** - Organize your notes into customizable notebooks
- ✍️ **Rich Text Editor** - Advanced text editing with TipTap
- 🔍 **Powerful Search** - Find your notes instantly with smart search
- 🔐 **Secure Authentication** - Protected access to your personal notes
- 📧 **Email Integration** - Seamless email notifications and sharing
- ☁️ **Cloud Storage** - Access your notes from anywhere
- 🎨 **Modern UI** - Beautiful, responsive design with dark/light themes

## 🛠️ Tech Stack

### Frontend & Framework
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### UI Components & Styling
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Database & ORM
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![Neon](https://img.shields.io/badge/Neon-00E599?style=for-the-badge&logo=neon&logoColor=white)

### Authentication & Communication
![Better Auth](https://img.shields.io/badge/Better_Auth-FF6B6B?style=for-the-badge&logo=auth0&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white)

### Rich Text & State Management
![TipTap](https://img.shields.io/badge/TipTap-000000?style=for-the-badge&logo=tiptap&logoColor=white)
![nuqs](https://img.shields.io/badge/nuqs-4A90E2?style=for-the-badge&logo=react&logoColor=white)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- Node.js (v18.0.0 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/noteforge.git
   cd noteforge
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables:
   ```env
   DATABASE_URL=your_neon_database_url
   NEXTAUTH_SECRET=your_auth_secret
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Run database migrations**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see NoteForge in action!

## 📁 Project Structure

```
noteforge/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Main application pages
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── ui/                # shadcn/ui components
│   ├── editor/            # TipTap editor components
│   └── notebooks/         # Notebook-specific components
├── lib/                   # Utility functions and configurations
│   ├── db/                # Drizzle ORM setup
│   ├── auth/              # Better Auth configuration
│   └── utils.ts           # Helper functions
├── public/                # Static assets
└── styles/                # Global styles
```

## 🔧 Key Features Breakdown

### 📚 Enhanced Notebooks
- Create and organize multiple notebooks
- Customizable notebook covers and themes
- Hierarchical note organization

### ✍️ Rich Text Editing
- Powered by TipTap editor
- Support for markdown shortcuts
- Images, tables, and formatting options
- Real-time collaboration features

### 🔍 Smart Search
- Powered by nuqs for URL state management
- Full-text search across all notes
- Filter by notebooks, tags, and dates
- Search history and suggestions

### 🔐 Authentication & Security
- Secure authentication with Better Auth
- Password reset via Resend email service
- Session management and protection

## 🚀 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy NoteForge is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy automatically with every push

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/noteforge)

### Environment Variables for Production

Make sure to set these environment variables in your deployment platform:

- `DATABASE_URL` - Your Neon database connection string
- `NEXTAUTH_SECRET` - Secret for authentication
- `NEXTAUTH_URL` - Your production domain
- `RESEND_API_KEY` - API key for email service

## 🤝 Contributing

We welcome contributions to NoteForge! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio

## 📚 Learn More

To learn more about the technologies used in NoteForge:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM for SQL databases
- [TipTap](https://tiptap.dev/) - The headless editor framework for web artisans
- [Better Auth](https://better-auth.com/) - Authentication library for TypeScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to the Next.js team for the amazing framework
- shadcn for the beautiful UI components
- The open-source community for the incredible tools and libraries

---

<div align="center">
  <p>Made with ❤️ by the NoteForge team</p>
  <p>
    <a href="#-noteforge">Back to top</a>
  </p>
</div>
