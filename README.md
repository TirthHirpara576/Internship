# Node.js Learning Projects & Modules

A comprehensive collection of Node.js projects and modules covering core concepts, frameworks, and real-world applications. This repository contains educational projects and practical implementations to help understand Node.js development.

## 📁 Project Structure

### Core Module Examples
- **[crypto_module.js](crypto_module.js)** - Cryptographic hashing and encryption examples
- **[math.js](math.js)** - Mathematical utilities and operations
- **[os_module.js](os_module.js)** - Operating system information and utilities
- **[path_module.js](path_module.js)** - File path manipulation and handling

### 📂 Directory Overview

#### [ES_module/](ES_module/)
ES6 Module system implementation examples
- `app.js` - Main application demonstrating ES6 imports
- `math.js` - Math utilities using ES6 export syntax

#### [Event_module/](Event_module/)
Node.js EventEmitter and event-driven programming
- `app.js` - Event emitter implementation
- `task.js` - Event handling examples

#### [fs/](fs/)
File system operations with different async patterns
- `syncfs.js` - Synchronous file operations
- `asyncfs.js` - Callback-based async file operations
- `promises_fs.js` - Promise-based file operations
- `AsyncAwait_fs.js` - Async/await file operations
- `test.txt` - Sample file for testing

#### [HTTP_module/](HTTP_module/)
Native HTTP server implementation
- `server.js` - Basic HTTP server using Node's built-in http module

#### [streams/](streams/)
Stream processing and data handling
- `app.js` - Stream implementation examples
- `input.txt` - Sample input data
- `output.txt` - Stream output results

#### [mongodb/](mongodb/)
MongoDB driver and database connection examples
- `mongo-driver.js` - MongoDB driver implementation

#### [mongoose/](mongoose/)
Mongoose ODM (Object Data Modeling) implementation
- `mongoose.test.js` - Mongoose schema and model tests
- `middleware.test.js` - Middleware implementation tests

#### [mini-projects/](mini-projects/)
Small, focused projects demonstrating practical Node.js applications

**CLI Tools:**
- `CLI_Todo.js` - Todo list command-line application
- `CLI_file_creation.js` - File creation utility

**API & Web Projects:**
- `Weather_App.js` - Weather API integration
- `test_weather.js` - Weather app testing
- `debug_weather.js` - Weather app debugging
- `Random_joke_Generator.js` - Joke generator API

**Utilities:**
- `currency_convertor_App.js` - Currency conversion tool
- `data.txt` - Sample data file

**URL Shortener (Mini):**
- `URL_Shortener_Project/` - Simplified URL shortener implementation

#### [express/](express/)
Express.js framework applications and examples

**Main Application:**
- `app.js` - Express application entry point
- `env.js` - Environment configuration
- `package.json` - Project dependencies

**Public Assets:**
- `public/index.html` - Frontend HTML
- `public/style.css` - Frontend styling

**URL Shortener Project:**
Complete production-ready URL shortener application with the following structure:

```
URL_Shortener_Project/
├── app2.js                          # Main application server
├── package.json                     # Dependencies
├── drizzle.config.js               # Database configuration
├── config/                          # Application configuration
│   ├── constants.js                # Constants and settings
│   ├── db_client.js                # Database client setup
│   ├── db.js                       # Database connection
│   └── env.js                      # Environment variables
├── controllers/                     # Request handlers
│   ├── auth.controller.js          # Authentication logic
│   └── postshortener.controller.js # URL shortening logic
├── routes/                          # API routes
│   ├── auth.routes.js              # Authentication routes
│   └── shortener.routes.js         # URL shortener routes
├── services/                        # Business logic
│   ├── auth.services.js            # Authentication services
│   └── shortener.services.js       # Shortener services
├── middleware/                      # Express middleware
│   └── verify.middleware.js        # Authentication verification
├── models/                          # Data models
│   └── shortener.model.js          # URL shortener model
├── validators/                      # Input validation
│   ├── auth-validator.js           # Auth input validation
│   └── shortener.validator.js      # Shortener validation
├── lib/                             # Utility functions
│   ├── send-email.js               # Email sending
│   ├── nodemailer.js               # Email configuration
│   ├── get-html-from-mjml-template.js  # Email templating
│   └── oauth/
│       ├── github.js               # GitHub OAuth
│       └── google.js               # Google OAuth
├── emails/                          # Email templates
│   ├── verify-email.mjml           # Verification email template
│   └── reset-password-email.mjml   # Password reset template
├── drizzle/                         # Database ORM
│   ├── schema.js                   # Database schema
│   ├── seed.js                     # Database seeding
│   └── migration/                  # Database migrations
├── views/                           # EJS templates
│   ├── index.ejs                   # Home page
│   ├── edit-shortLink.ejs          # Link editing page
│   ├── report.ejs                  # Reporting page
│   ├── header.ejs                  # Header component
│   ├── auth/                       # Auth pages
│   └── partials/                   # Reusable components
├── public/                          # Static files
│   ├── style.css                   # Styling
│   ├── images/                     # Image assets
│   └── uploads/                    # User uploads
├── data/                            # Data files
│   └── links.json                  # Links database
└── mysql/                           # MySQL backend
    ├── app.js                      # MySQL app
    └── package.json                # Dependencies
```

## 🚀 Features & Technologies

### Core Concepts
- ✅ Synchronous & Asynchronous I/O Operations
- ✅ Event-Driven Architecture
- ✅ Stream Processing
- ✅ Module System (CommonJS & ES6)
- ✅ HTTP Server Implementation

### Backend Frameworks
- ✅ **Express.js** - Web application framework
- ✅ **Mongoose** - MongoDB ODM
- ✅ **Drizzle** - SQL database ORM

### Databases
- ✅ **MongoDB** - NoSQL database
- ✅ **MySQL** - Relational database

### Authentication & Security
- ✅ OAuth 2.0 Integration (GitHub, Google)
- ✅ Email Verification
- ✅ Password Reset Functionality
- ✅ JWT Token Management

### Additional Features
- ✅ Email Templates (MJML)
- ✅ Nodemailer Integration
- ✅ URL Shortening with Analytics
- ✅ Link Management & Editing
- ✅ Error Tracking & Logging
- ✅ Database Migrations

## 📋 Quick Start

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- MongoDB (for database projects)
- MySQL (for some projects)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TirthHirpara576/Internship.git
   cd Node
   ```

2. **Install root dependencies:**
   ```bash
   npm install
   ```

3. **Navigate to specific project:**
   ```bash
   cd express/URL_Shortener_Project
   npm install
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run database migrations (if applicable):**
   ```bash
   npm run migrate
   ```

6. **Start the application:**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

## 📚 Project Descriptions

### URL Shortener Project (Production-Ready)
A full-featured URL shortening service with user authentication, link management, and analytics.

**Key Features:**
- User registration and authentication
- Create and manage shortened URLs
- Link analytics and statistics
- Password reset with email verification
- OAuth authentication (GitHub & Google)
- Link editing and deletion
- Error reporting system
- Responsive frontend with EJS templates

**Tech Stack:**
- Express.js backend
- Drizzle ORM with migrations
- MySQL database
- JWT authentication
- Nodemailer for emails
- EJS templating
- Bootstrap CSS

### File System Operations (fs/)
Learn different approaches to file handling:
- Synchronous operations (blocking)
- Callback-based async operations
- Promise-based operations
- Async/await patterns

### Streams
Efficient data processing for large files:
- Reading and writing streams
- Stream piping
- Transform streams
- Chunk processing

### Event System
Node.js event-driven programming:
- EventEmitter implementation
- Custom event creation
- Event listeners and handlers
- Event propagation

## 🔧 Available Scripts

### Root Level
```bash
npm install          # Install all dependencies
npm start           # Start main application
npm test            # Run tests
```

### Express/URL_Shortener_Project
```bash
npm start           # Start production server
npm run dev         # Start development server with nodemon
npm run migrate     # Run database migrations
npm run seed        # Seed database with initial data
npm test            # Run tests
```

## 🔐 Environment Variables

Create a `.env` file in the appropriate project directory:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=url_shortener
DB_USER=your_username
DB_PASSWORD=your_password

# OAuth
GITHUB_CLIENT_ID=your_github_id
GITHUB_CLIENT_SECRET=your_github_secret
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_SERVICE=gmail

# Application
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret
```

## 📊 Database Schema

The URL Shortener project uses Drizzle ORM with the following main entities:

- **Users** - User accounts with authentication
- **Short Links** - Shortened URL mappings
- **Link Analytics** - Click tracking and statistics
- **OAuth Accounts** - OAuth provider integrations

Migrations are located in `express/URL_Shortener_Project/drizzle/migration/`

## 🧪 Testing

```bash
# Run tests for specific modules
node mongoose/mongoose.test.js
node mongoose/middleware.test.js

# Test email functionality
node express/URL_Shortener_Project/test-email.js

# Test database insertion
node express/URL_Shortener_Project/test-insert.js
```

## 📖 Learning Resources

This repository covers:
1. **Node.js Fundamentals** - Modules, events, streams
2. **Web Development** - Express.js, routing, middleware
3. **Database** - MongoDB with Mongoose, MySQL with Drizzle
4. **Authentication** - OAuth, JWT, email verification
5. **Real-World Application** - URL Shortener with full CRUD

## 📝 Project Structure Notes

- **node_modules/** - NOT included (see .gitignore)
- **.env files** - NOT included (see .gitignore)
- All environment-specific files are excluded from version control
- Each subdirectory can have its own `package.json` and dependencies
