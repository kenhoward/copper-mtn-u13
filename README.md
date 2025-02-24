# U13 Copper Mountain


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Folder Structure (WIP)
```src
│── app
│   │── admin
│   │   └── page.tsx
│   │   └── Admin.module.scss
│   │── matches
│   │   └── previous
│   │   │   └── page.tsx
│   │   │   └── PreviousMatches.module.scss
│   │   └── page.tsx
│   │   └── Matches.module.tsx
│   │── stats
│   │   └── page.tsx
│   │   └── Stats.module.scss
│   │── table
│   │── favicon.ico
│   │── layout.tsx
│   └── page.tsx
│── components
│   │── Layout.tsx
│   │── Logo.tsx
│   │── MainTable.module.scss
│   │── MainTable.tsx
│   │── Navbar.module.scss
│   │── Navbar.tsx
│   │── NexMatch.tsx
│   │── NexMatch.module.scss
│   │── SeasonTable.module.scss
│   │── SeasonTable.tsx
│   │── ThemeToggle.module.scss
│   └── ThemeToggle.tsx
│── context
│   │── GlobalContext.tsx
│── styles
│   │── colors.scss
│   └── globals.scss
│── types
│── .eslintrc.json
│── .gitignore
│── next-env.d.ts
│── next.config.mjs
│── package.json
│── README.md
│── tsconfig.json
└── yarn.lock
```