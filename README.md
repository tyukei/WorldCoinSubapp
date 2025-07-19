# WorldCoin Burger Quest 🍔

A delicious memory game powered by World ID - test your memory skills with our hamburger-themed game!

## 🌐 Live Demo

Visit the live demo: [https://[your-username].github.io/WorldCoinSubapp/](https://[your-username].github.io/WorldCoinSubapp/)

## ✨ Features

- **World ID Authentication**: Secure login using World ID
- **Memory Game**: Match pairs of hamburger emojis
- **Cool UI**: Modern glassmorphism design with smooth animations
- **Responsive**: Works on both desktop and mobile devices
- **Development Mode**: Test without World App in development

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- World ID Developer Account (for production)

### Installation

```bash
# Clone the repository
git clone https://github.com/[your-username]/WorldCoinSubapp.git
cd WorldCoinSubapp

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your World ID credentials
```

### Development

```bash
# Run development server
npm run dev

# Run with mobile access
npm run dev:mobile
```

Visit `http://localhost:3000` to see the app.

## 🌍 World ID Setup

1. Go to [World ID Developer Portal](https://developer.worldcoin.org)
2. Create a new application
3. Create a `login` action
4. Copy credentials to `.env`:
   ```env
   NEXT_PUBLIC_WLD_APP_ID=your_app_id
   NEXT_PUBLIC_WLD_ACTION_ID=your_action_id
   WLD_CLIENT_ID=your_client_id
   WLD_CLIENT_SECRET=your_client_secret
   DEV_PORTAL_API_KEY=your_api_key
   ```

### Force Real Authentication in Development

To use real World ID authentication in development:

```env
NEXT_PUBLIC_FORCE_REAL_AUTH=true
```

Then use ngrok or localtunnel to expose your local server.

## 📦 GitHub Pages Deployment

### Automatic Deployment (Recommended)

1. **Fork or create your repository**

2. **Add GitHub Secrets**:
   - Go to Settings → Secrets and variables → Actions
   - Add these secrets:
     - `NEXT_PUBLIC_WLD_APP_ID`
     - `NEXT_PUBLIC_WLD_ACTION_ID`

3. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: GitHub Actions

4. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

5. **Wait for deployment**:
   - Check Actions tab for build status
   - Once complete, visit `https://[your-username].github.io/WorldCoinSubapp/`

### Manual Deployment

```bash
# Build for production
npm run build

# The static files will be in the 'out' directory
# Upload contents of 'out' to your GitHub Pages branch
```

### Important Notes for GitHub Pages

- The app uses static export (`output: 'export'`)
- Base path is automatically set to `/WorldCoinSubapp` in production
- Images are unoptimized for static export compatibility
- World ID authentication requires HTTPS (provided by GitHub Pages)

## 🎮 How to Play

1. **Login**: Authenticate with World ID (or use dev mode)
2. **Flip Cards**: Click cards to reveal hamburger emojis
3. **Match Pairs**: Find matching pairs of emojis
4. **Win**: Match all 6 pairs to win!

## 🛠️ Tech Stack

- **Next.js 15.4**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling with custom animations
- **World ID MiniKit**: Authentication
- **GitHub Pages**: Free hosting

## 📁 Project Structure

```
WorldCoinSubapp/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── MiniKitProvider.tsx
│   ├── WorldIdAuth.tsx    # Authentication
│   └── MemoryGame.tsx     # Game logic
├── .github/workflows/     # GitHub Actions
│   └── deploy.yml         # Auto deployment
├── public/                # Static assets
└── next.config.mjs        # Next.js config
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [WorldCoin](https://worldcoin.org) for the authentication system
- [Next.js](https://nextjs.org) for the amazing framework
- All the hungry gamers who love burgers! 🍔

---

Made with ❤️ and 🍔