Achar Bazar Client

Achar Bazar is a modern e-commerce frontend for discovering and purchasing traditional Bengali pickles and customizable achar boxes. The client application provides public shopping pages, Firebase authentication, customer dashboards, checkout, order confirmation, and a separate admin panel.

This README documents the client application before backend integration. At this stage, the frontend may use local product data, local browser state, and temporary role handling. The backend will later provide secure product, order, user, coupon, review, and inventory data through an Express API connected to MongoDB Atlas.




Project Overview

Achar Bazar is designed to provide a friendly online shopping experience for customers who want to:

•
Browse traditional pickle products

•
Search and filter products

•
View detailed product information

•
Find products based on taste and spice level

•
Build a customized achar box

•
Add products to a shopping cart

•
Complete a checkout form

•
Choose Cash on Delivery or bKash payment instructions

•
View their dashboard and order information

•
Save addresses and update their profile

•
Submit product reviews

The project also includes an admin panel for managing the store. Admin users can access product management, order management, categories, users, coupons, and reviews.




Current Project Scope

This repository represents the frontend/client application only.

Plain Text


Achar Bazar Client
├── React user interface
├── Firebase Authentication
├── Customer dashboard
├── Admin dashboard
├── Cart and checkout interface
├── Temporary/local product and order handling
└── Prepared API service layer for future backend integration



The backend is a separate project and will use:

Plain Text


Express.js API
MongoDB Atlas
Firebase Admin SDK



The frontend should not directly connect to MongoDB Atlas. All database operations must eventually go through the backend API.




Technology Used

Frontend

•
React

•
Vite

•
React Router

•
JavaScript / JSX

•
Tailwind CSS

•
DaisyUI

•
Lucide React

•
Firebase Web SDK

•
Context API

•
Browser local storage for temporary client-side state

Authentication

•
Firebase Authentication

•
Email and password authentication

•
Google authentication, if enabled in Firebase

•
Firebase ID tokens

•
Firebase custom claims for secure role management

Planned Backend Integration

•
Node.js

•
Express.js

•
MongoDB Atlas

•
Mongoose

•
Firebase Admin SDK

•
REST API

Development Tools

•
npm

•
Vite development server

•
ESLint, if configured

•
Git and GitHub, if configured




Main Features

Public Pages

The client contains public pages that visitors can access without logging in:

•
Home page

•
Shop page

•
Product details page

•
Taste Finder

•
Build Your Own Achar Box

•
Cart

•
Login

•
Registration

•
Forgot password

Customer Features

Authenticated regular users can access:

•
Customer dashboard

•
Profile editing

•
Order history

•
Individual order details

•
Wishlist

•
Saved addresses

•
Checkout

•
Product reviews

•
Dashboard link in the navbar

Admin Features

Authenticated admin users can access a separate admin panel:

•
Admin overview dashboard

•
Product management

•
Category management

•
Order management

•
User management

•
Review management

•
Coupon management

The admin panel is separate from the regular customer dashboard. Admin users should be redirected to /admin, not /dashboard.




Authentication

Authentication is handled by Firebase Authentication.

The frontend uses Firebase to:

1.
Register users.

2.
Log users in with email and password.

3.
Optionally log users in with Google.

4.
Maintain the authenticated session.

5.
Log users out.

6.
Reset passwords.

7.
Read the authenticated Firebase user.

8.
Retrieve Firebase ID tokens for backend requests.

The authentication context normally exposes values such as:

JavaScript


{
  currentUser,
  userRole,
  authLoading,
  roleLoading,
  isAuthenticated,
  isAdmin,
  isRegularUser,
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
  logoutUser,
  sendPasswordReset
}



The exact property names may vary slightly depending on the current implementation.




User Roles

The application has two intended roles:

Plain Text


admin
user



Regular user

A regular user is redirected to:

Plain Text


/dashboard



A regular user can access customer-only routes but must not access admin routes.

Admin user

An admin user is redirected to:

Plain Text


/admin



An admin user can access admin-only routes such as:

Plain Text


/admin
/admin/products
/admin/categories
/admin/orders
/admin/users
/admin/reviews
/admin/coupons



The admin panel is not the same as the customer dashboard.




Admin Account

During the initial development phase, the designated admin account is:

Plain Text


admin@acharbari.com



This email is used as the temporary development admin account while the backend role-management system is being completed.

Important security note

A frontend email check is not secure enough for production. The final implementation must assign the admin role through Firebase custom claims from a trusted backend or Firebase Admin SDK.

The production role should be stored as a Firebase custom claim:

JSON


{
  "role": "admin"
}



A regular account should use:

JSON


{
  "role": "user"
}



The backend must verify the Firebase ID token and read the verified role. The frontend must not allow users to set their own role.

Do not use local storage for admin authorization:

JavaScript


localStorage.setItem('role', 'admin')



Do not trust a role value sent by the browser.




Role-Based Redirection

After successful login:

Plain Text


Admin user   → /admin
Regular user → /dashboard



The route protection should also work after refreshing the browser.

The application should wait while authentication and role information are loading. This prevents the wrong dashboard from briefly appearing during page refresh.

Expected authorization behavior:

User type
/dashboard
/admin
/admin/products
Logged out
No
No
No
Regular user
Yes
No
No
Admin user
No or role-specific
Yes
Yes




Unauthorized users should be redirected to the appropriate dashboard or login page.




Main Routes

Public routes

Plain Text


/
/shop
/products/:productId
/taste-finder
/build-achar-box
/cart
/checkout
/order-confirmation/:orderId
/login
/register
/forgot-password



Regular-user routes

Plain Text


/dashboard
/dashboard/profile
/dashboard/orders
/dashboard/orders/:orderId
/dashboard/wishlist
/dashboard/addresses



Admin routes

Plain Text


/admin
/admin/products
/admin/categories
/admin/orders
/admin/users
/admin/reviews
/admin/coupons



Routes should be protected using role-aware route components such as:

Plain Text


UserRoute
AdminRoute
RoleRoute






Client-Side State

The client currently uses React Context and browser state for several features.

Authentication state

Authentication state is managed through an authentication context.

Cart state

Cart state is managed through a cart context. The cart may be stored in local storage to preserve items after a browser refresh.

Temporary local data

Before backend integration is complete, some data may be stored or loaded locally:

•
Product data

•
Cart data

•
Temporary order data

•
Wishlist data

•
Coupon data

•
Review data

These local systems should eventually be replaced or synchronized with the Express backend and MongoDB Atlas.

The cart can remain client-side as temporary UI state, but the backend must recalculate product prices, stock, coupons, shipping, and order totals during checkout.




Checkout Security Model

The frontend should not be trusted to determine the final order price.

The frontend should send only:

JSON


{
  "customer": {
    "name": "Customer name",
    "email": "customer@example.com",
    "phone": "01700000000"
  },
  "shippingAddress": {
    "location": "Inside Chattogram",
    "address": "Customer delivery address"
  },
  "items": [
    {
      "productId": "MONGODB_PRODUCT_ID",
      "quantity": 2
    }
  ],
  "couponCode": "WELCOME10",
  "paymentMethod": "cod",
  "transactionId": ""
}



The frontend should not send trusted financial values such as:

JSON


{
  "price": 1,
  "subtotal": 1,
  "shipping": 0,
  "discount": 100000,
  "total": 1
}



The backend must calculate:

•
Current product prices

•
Product stock availability

•
Subtotal

•
Coupon validity

•
Coupon discount

•
Shipping charge

•
Final total

•
Payment status




Expected Backend API

The frontend will eventually communicate with an Express backend through endpoints such as:

Plain Text


GET    /api/health
GET    /api/auth/me
GET    /api/auth/admin-check

GET    /api/users/me
PATCH  /api/users/me
POST   /api/users/me/addresses
DELETE /api/users/me/addresses/:addressId

GET    /api/products
GET    /api/products/:productId
POST   /api/products
PUT    /api/products/:productId
DELETE /api/products/:productId

GET    /api/categories
GET    /api/categories/:categoryId
POST   /api/categories
PUT    /api/categories/:categoryId
DELETE /api/categories/:categoryId

POST   /api/orders
GET    /api/orders/my
GET    /api/orders/my/:orderId
GET    /api/orders
PATCH  /api/orders/:orderId/status

GET    /api/coupons/validate/:code
GET    /api/coupons
POST   /api/coupons
PATCH  /api/coupons/:couponId
DELETE /api/coupons/:couponId

GET    /api/reviews/product/:productId
POST   /api/reviews
GET    /api/reviews
PATCH  /api/reviews/:reviewId/status
DELETE /api/reviews/:reviewId



Authenticated API requests should include:

Plain Text


Authorization: Bearer FIREBASE_ID_TOKEN



The client API helper should retrieve the current Firebase ID token and attach it to protected requests.




Recommended Client Environment Variables

Create a .env file in the client project:

Plain Text


VITE_API_BASE_URL=http://localhost:5000/api



The Firebase client configuration may use variables such as:

Plain Text


VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id



Use the exact variable names already configured in the Firebase client file. Do not commit real secret values to Git.

After changing .env, restart the Vite server:

Bash


npm run dev






Getting Started

Requirements

Install the following first:

•
Node.js

•
npm

•
A Firebase project

•
Firebase Authentication enabled

•
A modern browser

Install dependencies

From the client project folder:

Bash


npm install



Start development server

Bash


npm run dev



The Vite development server normally runs at:

Plain Text


http://localhost:5173



Build the client

Bash


npm run build



Preview the production build

Bash


npm run preview






Firebase Setup

In Firebase Console:

1.
Create or open the Firebase project.

2.
Add a web application.

3.
Copy the Firebase web configuration.

4.
Enable Email/Password authentication.

5.
Enable Google authentication if Google login is used.

6.
Configure authorized domains.

7.
Create or use the admin account:

Plain Text


admin@acharbari.com



1.
Assign the admin role securely through Firebase Admin SDK when backend integration is available.

The Firebase web configuration belongs in the client. The Firebase service-account credentials belong only in the backend and must never be exposed in the frontend.




Suggested Project Structure

Plain Text


src/
├── assets/
├── components/
│   ├── common/
│   ├── forms/
│   ├── navbar/
│   └── ...
├── config/
│   └── firebase.js
├── context/
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── layouts/
│   ├── MainLayout.jsx
│   ├── DashboardLayout.jsx
│   └── AdminLayout.jsx
├── pages/
│   ├── Auth/
│   ├── AdminDashboard/
│   ├── UserDashboard/
│   ├── Checkout/
│   ├── ProductDetails/
│   ├── Shop/
│   └── ...
├── routes/
│   ├── AppRoutes.jsx
│   ├── AdminRoute.jsx
│   ├── UserRoute.jsx
│   └── RoleRoute.jsx
├── services/
│   ├── authService.js
│   ├── productService.js
│   ├── orderService.js
│   ├── apiClient.js
│   ├── backendOrderService.js
│   ├── backendCouponService.js
│   └── backendReviewService.js
├── utils/
│   ├── userRole.js
│   ├── calculateShipping.js
│   └── calculateTotals.js
├── App.jsx
└── main.jsx



The exact structure may differ slightly. Existing project conventions should be reused instead of creating duplicate authentication or dashboard logic.




Authentication Flow

Registration

1.
User opens /register.

2.
User submits name, email, and password.

3.
Firebase creates the account.

4.
The user is treated as a regular user by default.

5.
The user is redirected to /dashboard.

Login

1.
User opens /login.

2.
Firebase authenticates the account.

3.
The application reads the user role.

4.
Admin users go to /admin.

5.
Regular users go to /dashboard.

Logout

1.
User clicks logout.

2.
Firebase signs out the current user.

3.
Authentication context is cleared.

4.
Protected routes redirect to /login.

Refresh

1.
Firebase restores the authentication session.

2.
The application waits for the authentication state.

3.
The role is resolved.

4.
The correct dashboard remains accessible.




Admin Access Rules

The frontend must visually separate the admin area from the customer area.

For an admin:

Plain Text


Admin Panel → /admin



For a regular user:

Plain Text


Dashboard → /dashboard



The navbar should show:

•
Dashboard for regular users

•
Admin Panel for admins

•
Login / Register for logged-out visitors

The frontend route guard improves the user experience, but real authorization must also be enforced on the backend.




Development Admin Testing

Use this account during development:

Plain Text


Email: admin@acharbari.com



Test the following:

1.
Log in as the admin.

2.
Confirm redirect to /admin.

3.
Open /admin/products.

4.
Confirm the admin product page is displayed.

5.
Open /dashboard.

6.
Confirm the admin does not incorrectly receive the regular user dashboard.

7.
Log out.

8.
Confirm /admin redirects to /login.

For regular-user testing:

1.
Register a separate account.

2.
Log in with that account.

3.
Confirm redirect to /dashboard.

4.
Try opening /admin.

5.
Confirm redirect to /dashboard.

6.
Confirm the admin panel is not accessible.

Never use the admin account for ordinary customer testing.




Backend Integration Notes

Before backend integration, the client may have services such as:

Plain Text


productService.js
orderService.js



Some of these may use local data or local storage. During backend integration:

•
Keep the existing UI components.

•
Replace data sources gradually.

•
Add API service modules instead of placing fetch calls throughout components.

•
Keep Firebase Authentication in the client.

•
Send Firebase ID tokens to the backend.

•
Move prices and inventory authority to the backend.

•
Move order persistence to MongoDB Atlas.

•
Move coupon validation to the backend.

•
Move review moderation to the backend.

•
Remove frontend-only admin authorization after Firebase custom claims are available.

The client should not connect directly to MongoDB Atlas.




Security Notes

Never commit the following:

Plain Text


.env
Firebase service-account JSON files
Firebase private keys
MongoDB Atlas passwords
Backend secrets



The Firebase client API key is not treated as a server secret, but environment variables should still be used for configuration.

Never place Firebase Admin SDK credentials in the React client.

Never trust the frontend for:

•
Admin role assignment

•
Product prices

•
Stock availability

•
Coupon discounts

•
Final order totals

•
Payment verification

•
Order ownership

These must be verified by the backend.




Common Problems

Backend connection refused

If the browser shows:

Plain Text


ERR_CONNECTION_REFUSED



Start the backend and confirm it is listening on port 5000:

Bash


cd C:\Projects\achar-bari-server
npm run dev



The client API URL should be:

Plain Text


VITE_API_BASE_URL=http://localhost:5000/api



Admin is redirected to the user dashboard

Check:

•
The Firebase account email is correct.

•
The admin role is assigned.

•
The role-loading state completes.

•
The route uses AdminRoute.

•
The login redirect reads the resolved role.

Nested form warning

Do not place a <form> inside the checkout <form>. Coupon input should use a <div> and a button with:

JSX


type="button"



Coupon is rejected

Check:

•
The coupon code exists in MongoDB.

•
The coupon is active.

•
The current date is within the coupon period.

•
The order meets the minimum amount.

•
The backend is running.

•
The request includes a valid Firebase token.




Future Improvements

Planned improvements include:

•
MongoDB-backed product catalog

•
Secure stock management

•
MongoDB-backed checkout

•
Coupon management

•
Product review moderation

•
Admin user management

•
Image upload storage

•
Real payment gateway integration

•
Email order notifications

•
Order tracking

•
Production deployment

•
Automated tests

•
Rate limiting and production security hardening




License

This project is currently a private Achar Bazar e-commerce application. Add the appropriate license here if the project will be distributed publicly.




Summary

Achar Bazar Client is a React/Vite e-commerce frontend with Firebase Authentication, customer and admin dashboards, shopping, checkout, and role-based navigation.

The temporary development admin account is:

Plain Text


admin@acharbari.com



The final production architecture will use:

Plain Text


React + Vite + Tailwind CSS + DaisyUI
Firebase Authentication
Express.js backend
MongoDB Atlas database
Firebase Admin SDK for secure token and role verification



The client is responsible for the user interface and Firebase login experience. The backend will be responsible for secure authorization, database operations, pricing, stock, coupons, orders, and business rules.

