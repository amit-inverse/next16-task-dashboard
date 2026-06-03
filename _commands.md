## Create the project
```
npx create-next-app@latest task-dashboard --typescript --tailwind --eslint
```

## Install extra dependencies
```
npm install zod bcryptjs jsonwebtoken cookie react-hot-toast clsx tailwind-merge
npm install --save-dev @types/bcryptjs @types/jsonwebtoken @types/cookie
```

## Set up environment
create `.env.local` with `JWT_SECRET`.

## Run the development server
```
npm run dev
```

## Project structure
```
task-dashboard/
├── .env.local
├── package.json
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── middleware.ts               # auth guard
├── app/
│   ├── layout.tsx
│   ├── page.tsx                # landing / login
│   ├── dashboard/
│   │   └── page.tsx            # stats overview
│   ├── tasks/
│   │   ├── page.tsx            # task list (client)
│   │   └── [id]/
│   │       └── page.tsx        # edit task (dynamic route)
│   ├── api/
│   │   ├── auth/
│   │   │   └── route.ts        # login mock
│   │   ├── tasks/
│   │   │   └── route.ts        # GET, POST
│   │   └── tasks/[id]/
│   │       └── route.ts        # PUT, DELETE
│   └── globals.css
├── components/
│   ├── TaskForm.tsx
│   ├── TaskList.tsx
│   ├── Navbar.tsx
│   └── Notification.tsx
├── lib/
│   ├── db.ts                   # in‑memory store
│   ├── auth.ts                 # token helpers
│   └── validations.ts          # Zod schemas
├── hooks/
│   ├── useAuth.ts
│   └── useTasks.ts
└── types/
    └── index.ts
```
