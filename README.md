# Food Hub 🍽️ — Frontend

Food Hub is a modern full-stack food ordering platform where users can discover meals, place orders, and track delivery status.  
This repository contains the frontend application built with Next.js and TypeScript, focusing on performance, scalability, and a clean UI/UX.

---

## 🌐 Live & Source

- 🌍 Live Website: [Food Hub Frontend ](https://foodhub-client-tau.vercel.app/) 
- 🔗 Backend API: [Food Hub Backend Live](https://food-hub-server-black.vercel.app/)   


---

## 🛠️ Tech Stack (Frontend)

- **Next.js (App Router)** — Server-side rendering & routing  
- **TypeScript** — Type safety & maintainability  
- **Tailwind CSS** — Responsive and consistent UI  
- **ShadCN UI** — Reusable UI components  
- **Lucide Icons** — Icon system  
- **Better Auth (Client)** — Authentication handling 
- **Stripe** —  Payment Method  
- **Fetch API** — API communication  

---

## ✨ Key Features (Frontend)

### 🌍 Public Features
- Browse meals and providers  
- Filter meals by category and price  
- View detailed meal & provider pages  
- Responsive homepage with multiple sections  

### 👤 Customer Features
- Register & login  
- Add meals to cart  
- Place orders (Stripe or Cash on Delivery)  
- Track order status  
- View order history  
- Manage profile  

### 🍳 Provider Features
- Provider dashboard  
- Manage menu items (CRUD)  
- View incoming orders  
- Update order status  

### 🛡️ Admin Features
- Admin dashboard  
- Manage users (activate / suspend)  
- View all orders  
- Manage food categories  

---

## ⚙️ Environment Variables (Frontend)

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_BACKEND_URL=https://example-backend.vercel.app
NEXT_PUBLIC_FRONTEND_URL=https://example-frontend.vercel.app
NEXT_PUBLIC_AUTH_URL=https://example-backend.vercel.app/api/auth
AUTH_URL=https://example-backend.vercel.app/api/auth
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key_here



## 🚀 Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev


Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
