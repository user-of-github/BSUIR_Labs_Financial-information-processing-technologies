# _Online Banking Web App_

---

#### _Created by [@user-of-github](github.com/user-of-github)_

---  

## Technologies stack:

- _[Next.js](https://nextjs.org/)_
- _[TypeScript](https://www.typescriptlang.org/)_
- _[Supabase](https://supabase.com/)_
- _[Tailwind CSS](https://tailwindcss.com/)_
- _[Jest](https://jestjs.io/)_  
  _And:_
- _[GitHub Actions](https://github.com/features/actions)_
- _[Vercel deploy](https://vercel.com/docs/deployments/overview)_  

[![Made with Supabase](https://supabase.com/badge-made-with-supabase.svg)](https://supabase.com)  
---

## Some other interesting features:

- _Used Postgres stored functions and triggers_
- _Created similar to responsive layout, comfortable to use on the go_
- _Deployed to Vercel_
- _Set up prettier with formatting rules_
- _Set up restrictions of access to table on level of Database (Supabase RLS)_
- _Create tests of Supabase-JS functionality (RLS, procedures) and some core functions_
- _GitHub Actions CI used for running tests on push_

---

## Getting Started

- **_! Minimum NodeJS version required -- NodeJS 18 !_**
- `npm install`
- _Set up ENV variables for Supabase connection in `.env.local`: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`_
- _**To run tests**: Set up ENV variables for Jest tests `.jest/setEnvVars.js`: `process.env.DB_URL`, `process.env.DB_KEY`, `process.env.DB_KEY_ADMIN`_
- `npm run dev`
- _Open [http://localhost:3000](http://localhost:3000) with your browser to see the result._
