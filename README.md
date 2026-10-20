# 🥭 Achar Bazar — Traditional Bengali Pickle Store

Achar Bazar is a modern e-commerce frontend designed for discovering and purchasing traditional Bengali pickles. It provides a user-friendly shopping experience with product browsing, taste-based discovery, customizable achar boxes, cart management, checkout, Firebase authentication, and separate customer and admin dashboards.

<p align="center">
  <a href="https://ephemeral-vacherin-a7502c.netlify.app/">
    <strong>🌐 Live Demo</strong>
  </a>
  &nbsp; • &nbsp;
  <a href="https://github.com/sakibskb143/achar-bari-client">
    <strong>💻 GitHub Repository</strong>
  </a>
</p>

## ✨ Features

- 🛍️ Browse, search, and filter pickle products
- 🥭 View detailed product information
- 🌶️ Discover products using Taste Finder
- 🎁 Build a customized achar box
- 🛒 Shopping cart and checkout interface
- 🔐 Firebase email/password authentication
- 👤 Customer dashboard and profile management
- 📦 Order history and order details
- ❤️ Wishlist and saved addresses
- ⭐ Product reviews
- 🛠️ Separate admin dashboard
- 📊 Admin interfaces for products, categories, orders, users, coupons, and reviews
- 📱 Responsive user interface

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | UI development |
| Vite | Development server and build tool |
| JavaScript (JSX) | Application logic |
| Tailwind CSS | Utility-first styling |
| DaisyUI | UI components |
| React Router | Client-side routing |
| Firebase Authentication | User authentication |
| React Context API | Shared application state |
| Lucide React | Icons |
| Netlify | Frontend deployment |

**Planned backend technologies:** Node.js, Express.js, MongoDB Atlas, Mongoose, and Firebase Admin SDK.

## 📸 Project Overview

Achar Bazar brings traditional Bengali pickle shopping into a modern online experience. Customers can explore products, discover flavors, customize their selections, and access their accounts through a dedicated dashboard.

The application also includes a separate administration interface for store management.

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- A Firebase project
- Git

### Installation

```bash
git clone https://github.com/sakibskb143/achar-bari-client.git

cd achar-bari-client

npm install
```

### Environment Variables

Create a `.env` file in the project root and configure the environment variables used by your application.

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

Use the exact variable names required by your Firebase configuration. Never commit `.env` files to GitHub.

### Run Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```text
src/
├── assets/
├── components/
├── config/
├── context/
├── layouts/
├── pages/
├── routes/
├── services/
├── utils/
├── App.jsx
└── main.jsx
```

## 🔐 Authentication and Authorization

Firebase Authentication handles user sign-in, registration, and session management.

The application supports two intended roles:

- **User:** Access to the customer dashboard at `/dashboard`.
- **Admin:** Access to the administration panel at `/admin`.

Production authorization should use Firebase custom claims and backend verification. Frontend route protection improves navigation and user experience but is not a substitute for server-side authorization.

## 🌐 Deployment

The frontend is deployed on Netlify.

- **Live Website:** https://ephemeral-vacherin-a7502c.netlify.app/
- **Hosting:** Netlify
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`

Configure Firebase and backend environment variables in Netlify before deploying. For React Router applications, configure a Netlify SPA redirect so direct navigation and browser refreshes work on nested routes.

## 🔒 Security Notes

- Never commit `.env` files or private credentials.
- Never expose Firebase Admin SDK credentials in the frontend.
- Never trust client-side prices, order totals, inventory, or role assignments.
- Verify Firebase ID tokens and admin permissions on the backend.
- Calculate order totals and validate coupons on the server.
- Do not publish administrator passwords in a public repository.

## 🗺️ Future Improvements

- Integrate the Express.js API with MongoDB Atlas
- Implement secure product and inventory management
- Persist orders and customer data in the database
- Add backend coupon validation and review moderation
- Integrate a real payment gateway
- Add order tracking and email notifications
- Implement automated tests and production security hardening

## 📄 License

This project is private unless a license is added by the project owner.

---

<p align="center">
  <strong>🥭 Achar Bazar</strong><br>
  <em>ঘরের স্বাদ, এবার দ্বারে।</em><br>
  Traditional Bengali flavors, delivered to your doorstep.
</p>
