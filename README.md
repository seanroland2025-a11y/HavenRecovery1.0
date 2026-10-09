├── package.json               # Dependencies & build scripts (Vite, React, Lucide, Tailwind)
├── vite.config.ts             # Vite bundler configuration
├── vercel.json                # Vercel deployment routes and security headers
├── tailwind.config.js         # Styling system & theme colors
├── postcss.config.js          # Tailwind CSS processing
├── tsconfig.json              # TypeScript configuration
├── index.html                 # App HTML shell and viewport settings
├── .gitignore                 # Excludes node_modules and dist
├── DEPLOYMENT.md              # Domain mapping & production guide
├── public/
│   ├── haven-icon.svg         # Haven sanctuary branding icon
│   ├── manifest.json          # PWA web app manifest
│   └── sw.js                  # Offline Service Worker cache
└── src/
    ├── App.tsx                # Main application layout and view controller
    ├── main.tsx               # React 18 DOM mount point
    ├── index.css              # Custom themes and calming animations
    ├── types.ts               # Data types (reflections, quotes, tools)
    ├── components/            # UI modules (Grounding 5-4-3-2-1, Box Breathing,
    │                          # Streak Tracker, Quick Exit Camouflage, Library, etc.)
    ├── data/                  # Curated crisis hotlines, quotes, stories, books
    └── services/              # Streak calculator and ambient audio synthesizers
