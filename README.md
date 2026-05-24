<div align="center">

# 🍔 BiteRush

### A Modern Full-Stack Food Ordering Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Typed-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

*A complete food ordering experience — from browsing to delivery, all in one place.*

</div>

---

## 📌 Overview

**BiteRush** is a production-ready, full-stack food ordering web application that delivers a seamless experience for both customers and administrators. Built with a modern tech stack, it supports everything from JWT-secured authentication to real-time order tracking and detailed revenue analytics.

---

## ✨ Features

### 👤 User Experience
| Feature | Description |
|---|---|
| 🔐 Authentication | Secure JWT-based Registration & Login with protected routes |
| 🍽️ Menu Browsing | Browse food items with category filtering |
| 🛒 Cart Management | Add items, manage quantities, and place orders |
| 📦 Order Tracking | Animated real-time order status timeline |
| 🔁 Reorder | Quickly reorder from previous orders |
| 💳 Payments | COD & Razorpay payment gateway support |
| 📱 Responsive UI | Fully optimized for Desktop, Tablet & Mobile |

### 🛠️ Admin Dashboard
| Feature | Description |
|---|---|
| 📊 Analytics | Revenue & order analytics with weekly growth tracking |
| 📈 Charts | Interactive revenue and order trend charts |
| 🍔 Menu Management | Add, edit, and manage food items & categories |
| 📋 Order Management | View, update, and manage all customer orders |
| 👥 User Management | View and manage registered users |
| 🎟️ Coupon Management | Create and manage discount coupons |
| 🏆 Top Products | Insights on best-selling items |

---

## 🧰 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 15** | React framework with SSR & routing |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first responsive styling |
| **Zustand** | Lightweight global state management |
| **Recharts** | Beautiful, composable analytics charts |
| **Lucide React** | Clean and consistent icon set |
| **Sonner Toast** | Elegant notification toasts |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Fast, minimal web framework |
| **MongoDB** | NoSQL document database |
| **Mongoose** | MongoDB ODM for schema modeling |
| **JWT** | Secure token-based authentication |
| **bcrypt.js** | Password hashing & security |

---

## 📂 Project Structure

```
BiteRush/
│
├── client/                     # Next.js Frontend
│   └── src/
│       ├── app/                # App Router pages
│       ├── components/         # Reusable UI components
│       ├── store/              # Zustand state management
│       ├── features/           # Feature-specific modules
│       └── providers/          # Context & layout providers
│
├── server/                     # Express.js Backend
│   ├── controllers/            # Route handler logic
│   ├── models/                 # Mongoose data models
│   ├── middleware/             # Auth & error middleware
│   ├── routes/                 # API route definitions
│   └── config/                 # DB & environment config
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js `v18+`
- MongoDB instance (local or [Atlas](https://www.mongodb.com/atlas))
- Razorpay account *(for payment integration)*

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Developer-Deepak02/BiteRush.git
cd biterush
```

### 2️⃣ Setup the Frontend

```bash
cd client
npm install
```

### 3️⃣ Setup the Backend

```bash
cd ../server
npm install
```

### 4️⃣ Configure Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### 5️⃣ Run the Application

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

> The app will be available at `http://localhost:3000`

---

## 🌐 API Reference

### 🔐 Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |

### 🍔 Menu
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/menu` | Fetch all menu items |
| `POST` | `/api/menu` | Add a new menu item *(Admin)* |

### 📦 Orders
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/orders` | Place a new order |
| `GET` | `/api/orders/my` | Get current user's orders |

### 🛠️ Admin
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/dashboard` | Get analytics overview |
| `GET` | `/api/admin/orders` | Get all orders |
| `PUT` | `/api/admin/orders/:id` | Update order status |

---

## 📊 Admin Analytics

The dashboard provides comprehensive business insights:

- 💰 **Total Revenue** — Overall earnings at a glance
- 📦 **Total Orders** — Volume tracking across all time
- 📈 **Revenue Growth** — Weekly revenue trend charts
- 📉 **Order Growth** — Weekly order volume charts
- 🏆 **Top Selling Products** — Best-performing menu items
- 🕐 **Recent Orders** — Live feed of latest activity
- 🔄 **Order Status Counts** — Breakdown by current status

---

## 🔐 Security

- **JWT Authentication** — Stateless, token-based auth
- **Role-Based Authorization** — Separate user & admin access
- **Protected Routes** — Server and client-side route guards
- **Password Hashing** — Secure storage using `bcrypt`

---

## 🚀 Future scope

- [ ] 🗺️ Live Delivery Tracking
- [ ] 🔔 Push Notifications
- [ ] 🤖 AI-Powered Food Recommendations
- [ ] 🏪 Multi-Restaurant Support
- [ ] 📲 Progressive Web App (PWA)
- [ ] 🧾 Invoice Generation

---

## 🎓 Academic Context

This project was developed as an **MCA Major Project**, demonstrating proficiency in:

- Full Stack Web Development
- RESTful API Design
- Authentication & Authorization
- Database Modeling & Management
- Admin Analytics & Data Visualization
- Modern UI/UX Practices

---

## 👨‍💻 Author

<div align="center">

**Deepak Sharma**
MCA Student · Full Stack Web Developer

</div>

---

## ⭐ Closing Note

BiteRush is more than a class project — it's a real-world-ready food ordering platform that demonstrates how modern tools and thoughtful architecture come together to create something genuinely useful. Feel free to fork, contribute, or reach out!

<div align="center">

*If you found this project helpful, consider giving it a ⭐ on GitHub!*

</div>
