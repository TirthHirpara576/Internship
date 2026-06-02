# 🔗 Express URL Shortener

A full-featured, robust URL Shortener Web Application built using **Node.js, Express.js, and MySQL (via Drizzle ORM)**. 
Unlike basic shorteners, this project includes comprehensive user authentication, social logins, email verification, profile management with image uploads, and an interactive dashboard for managing short links.

## ✨ Key Features

### 🔐 Authentication & Authorization
- **Local Authentication**: Register and Login functionality protected with secure password hashing.
- **Social Login**: Seamless OAuth authentication with **Google** and **GitHub**.
- **JWT & Cookies**: Secure state management and protected routes (access and refresh tokens).
- **Email Verification**: Account verification flows using one-time tokens and email templates.
- **Password Management**: Features "Change Password," "Forgot Password," and "Reset Password" workflows.

### 👤 User Profile Management
- **Interactive Profile Dashboard**: Dynamic EJS-powered user profile.
- **Avatar Uploads**: Users can upload, preview, and delete profile pictures (built with **Multer**).
- **Profile Updates**: Securely modify user details and credentials.

### 🔗 Link Shortener Core
- **Shorten Long URLs**: Generate random, secure shortcodes or create custom aliases.
- **Data Validation**: Enforced robust schema validation for URLs and inputs using **Zod**.
- **Link Dashboard**: View, edit, and delete shortened URLs.
- **Pagination**: Navigate through created URLs effortlessly with built-in UI pagination.
- **One-Click Copy**: Copy shortened links to the clipboard directly from the UI.
- **Persistent Storage**: Fully relational MySQL database mapped and queried via Drizzle ORM.

## 🛠️ Tech Stack

**Backend System**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Drizzle ORM
- **Authentication**: Custom JWT (JSON Web Tokens) & Custom OAuth implementation

**Frontend Tools**
- **View Engine**: EJS (Embedded JavaScript) templates
- **Styling**: Custom CSS (responsive UI with Shadcn-inspired aesthetics)
- **Email Templates**: HTML emails rendered with MJML

**Key Packages & External Services**
- `multer` (File/Image Uploading)
- `zod` (Input Validation)
- `resend` / `nodemailer` (Email Sending Services)
- `bcryptjs` (Password Hashing)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/TirthHirpara576/Express-URL-Shortener.git
cd Express-URL-Shortener
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add your environment-specific configurations:
```env
# Server
PORT=3000

# Database Credentials
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name

# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Email Service
RESEND_API_KEY=your_resend_api_key
```

### 4. Setup the Database
Generate and push Drizzle schema migrations to your MySQL database:
```bash
npm run db:push
# or use standard drizzle command
npx drizzle-kit push
```

### 5. Run the server
Start the development server:
```bash
npm run dev
```
The application will be running at `http://localhost:3000`.

## 📂 Project Structure Snapshot
- `/controllers`, `/routes`, `/services` — MVC Architecture & Business logic
- `/drizzle` — Database schema models and migrations
- `/views` — EJS templates and components
- `/public` — Static assets (CSS, images, Multer uploads)
- `/lib` & `/middleware` — Global utilities, authorization wrappers, and OAuth configs
