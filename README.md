# 🏢 Employee Management System

A full-stack web application for managing employee records with features like search, filter, add employees, and view detailed information. Built with modern technologies and deployed on free hosting platforms.

## 🌐 Live Demo

**Live App:** [https://employeemanagementsystem-frontend.netlify.app/](https://employeemanagementsystem-frontend.netlify.app/)  
 

 
---

## ✨ Features

- 📋 **View All Employees** - Display employee list with name and position
- 🔍 **Search by Name** - Real-time search functionality with full employee details
- 🏷️ **Filter by Department** - Filter employees by Engineering, Marketing, or Sales
- ➕ **Add New Employee** - Form with validation to add employees
- 👤 **Employee Details Page** - View complete information (name, position, department, salary)
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Real-time Updates** - GraphQL queries with Apollo Client
- 🎨 **Modern UI** - Clean design with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Apollo Client** - GraphQL client for data fetching
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Programming language

### Backend
- **Node.js** - Runtime environment
- **Apollo Server** - GraphQL server
- **MongoDB** - NoSQL database
- **MongoDB Driver** - Native MongoDB driver (no Mongoose)
- **GraphQL** - Query language for API

### Deployment
- **Frontend:** Netlify (Free tier)
- **Backend:** Render.com (Free tier)
- **Database:** MongoDB Atlas (Free tier)

---

## 📁 Project Structure

```
└── 📁backend
    └── 📁src
        └── 📁config
            ├── db.js
        └── 📁graphql
            └── 📁resolvers
                ├── employeeResolver.js
            └── 📁schema
                ├── employee.js
        └── 📁utils
            ├── seed.js
        ├── index.js
    ├── .env
    ├── .gitignore
    ├── package-lock.json
    └── package.json
```
```
└── 📁frontend
    └── 📁src
        └── 📁app
            └── 📁add-employee
                ├── page.js
            └── 📁components
                ├── ErrorBoundary.js
            └── 📁employee
                └── 📁[id]
                    ├── page.js
            └── 📁fonts
                ├── GeistMonoVF.woff
                ├── GeistVF.woff
            ├── favicon.ico
            ├── globals.css
            ├── layout.js
            ├── page.js
        └── 📁lib
            ├── apollo-client.js
    ├── .eslintrc.json
    ├── .gitignore
    ├── jsconfig.json
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── README.md
    └── tailwind.config.js
```


---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **MongoDB Atlas Account** (Free) - [Sign up](https://www.mongodb.com/cloud/atlas)

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repositories

git clone - https://github.com/ankitpathak62/EmployeManagementSystem.git


---

### 2️⃣ Backend Setup

#### Step 1: Install Dependencies
cd backend
npm install



#### Step 2: Create `.env` File

Create a file named `.env` in the `backend` root directory:

MongoDB Connection
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/employeeDB?retryWrites=true&w=majority&tls=true

Server Port
PORT=4000


**Replace:**
- `YOUR_USERNAME` - Your MongoDB Atlas username
- `YOUR_PASSWORD` - Your MongoDB Atlas password
- `cluster0.xxxxx.mongodb.net` - Your MongoDB cluster URL

**How to Get MongoDB URI:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password

#### Step 3: Start Backend Server

npm run dev


Server will start at: `http://localhost:4000/graphql`

**Test the GraphQL API:**
Open `http://localhost:4000/graphql` in your browser to access Apollo Studio Sandbox.

---

### 3️ Frontend Setup

#### Step 1: Install Dependencies
cd frontend
npm install

#### Step 2: Create `.env.local` File

Create a file named `.env.local` in the `frontend` root directory:


#### Step 3: Start Frontend Server

npm run dev

Frontend will start at: `http://localhost:3000`

---
 



