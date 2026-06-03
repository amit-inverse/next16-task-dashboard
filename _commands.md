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
