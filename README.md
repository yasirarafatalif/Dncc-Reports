# 🏙️ Public Infrastructure Issue Reporting System

A modern digital platform that allows citizens to report public infrastructure issues (like broken roads, streetlights, garbage overflow, water leakage, etc.) and enables government admins & staff to manage, track, and resolve those issues efficiently.

🔗 **Live Website:** https://your-live-site-link.web.app  

---

## 🔐 Admin Credentials (Demo)
- **Email:** admin@gmail.com  
- **Password:** Admin@123  

---

## 👤 Demo User Credentials

### Citizen
- **Email:** citizen@gmail.com  
- **Password:** Citizen@123  

### Staff
- **Email:** staff@gmail.com  
- **Password:** Staff@123  

---

## 🚀 Key Features

- Citizens can report public issues with image, category, priority & location
- Role-based dashboards (Admin, Citizen, Staff)
- Issue lifecycle tracking with timeline (Pending → In-Progress → Resolved → Closed)
- Upvote system (one user = one upvote, no self-upvote)
- Boost issue priority via payment (100৳ per boost)
- Premium subscription for unlimited issue reporting
- Staff assignment system (admin-only, one-time assign)
- Real-time UI updates using **TanStack Query**
- Secure authentication with Firebase (Email/Password & Google Sign-in)
- Fully responsive UI (Mobile, Tablet & Desktop)
- SweetAlert / Toast notifications for all CRUD actions
- Search, filter & pagination on All Issues page
- Downloadable PDF invoice for payments
- Protected private routes (no logout on refresh)
- Clean & modern UI built with Tailwind CSS & DaisyUI

---

## 🧭 Pages Overview

### Public Pages
- Home
- All Issues
- Issue Details (Private)
- Login & Registration
- 404 Not Found Page

### Citizen Dashboard
- Dashboard Overview (Stats & Charts)
- My Issues (Edit/Delete/View)
- Report Issue (Issue limit for free users)
- Profile & Premium Subscription

### Staff Dashboard
- Assigned Issues
- Change Issue Status
- Issue Progress Updates
- Staff Profile

### Admin Dashboard
- Dashboard Analytics
- All Issues Management
- Assign Staff
- Reject Issues
- Manage Citizens (Block/Unblock)
- Manage Staff (Add/Update/Delete)
- Payments & Invoices
- Admin Profile

---

## 🛠️ Technologies Used

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- DaisyUI
- TanStack Query
- Axios
- Firebase Authentication
- React Icons
- SweetAlert2 / React Toastify
- React PDF

### Deployment
- Firebase Hosting

---

## 🔒 Security & Best Practices

- Environment variables used for Firebase config
- Private routes with role-based access
- Token verification with middleware
- No sensitive data exposed on client-side
- Clean & readable code structure

---

## 📂 GitHub Repositories

- **Client Repo:** https://github.com/your-username/issue-reporting-client  
- **Server Repo:** https://github.com/your-username/issue-reporting-server  

---

## 📌 Important Notes

- Free users can submit up to **3 issues**
- Premium users can submit **unlimited issues**
- Blocked users can log in but cannot perform actions
- Each important action creates a **timeline record**
- Boosted issues always appear above normal issues

---

## 🎯 Project Goal

This project aims to:
- Improve transparency in public issue management
- Reduce response time for infrastructure problems
- Provide a centralized tracking system for citizens
- Make city service delivery more efficient

---

✨ **Thank you for visiting this project!**
