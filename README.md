# 📚 Book Vibe

A modern book discovery and reading list management web app built with React and Firebase. Browse books, save your favorites, track your reading progress, and explore curated blog posts — all in one place.

![Book Vibe](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-11-FFCA28?style=flat&logo=firebase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite)

---

## 🚀 Live Demo

🔗 [book-vibe.netlify.app](https://web-book-vibe.netlify.app/)

---

## 📸 Screenshots

<div align="center">

| Home | Book Detail | Reading List |
|:----:|:-----------:|:------------:|
| <img src="screenshots/home.png" width="280"/> | <img src="screenshots/detail.png" width="280"/> | <img src="screenshots/listed.png" width="280"/> |

</div>

---

## ✨ Features

- 🔍 **Book Discovery** — Browse books powered by the Google Books API
- 🎯 **Genre Filtering** — Filter books by genre with smart pagination
- 📖 **Reading List** — Save books and manage your personal reading list `🔐 Auth Required`
- 📊 **Reading Status** — Track books as "Want to Read", "Reading", or "Finished" `🔐 Auth Required`
- 📈 **Pages Chart** — Visual bar chart of your saved books' page counts
- 🔐 **Authentication** — Sign in with Google or Email/Password via Firebase Auth
- 🌙 **Dark / Light Mode** — Toggle between themes, preference saved in localStorage
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- 📝 **Blog** — Curated reading tips and book recommendations
- 🔎 **Search** — Search for any book by title, author, or keyword
- 💬 **Contact Form** — Get in touch via the contact page

---

## 🛠️ Tech Stack

| Category | Technology |
| --------- | ----------- |
| Frontend | React 19, Vite 8 |
| Styling | Tailwind CSS 4, Framer Motion |
| UI Components | shadcn/ui, Lucide React |
| Authentication | Firebase Auth (Google + Email) |
| Database | Cloud Firestore |
| Data Fetching | TanStack Query (React Query) |
| HTTP Client | Axios |
| Book Data | Google Books API |
| Charts | Recharts |
| Notifications | Sonner |
| Routing | React Router DOM v7 |
| Deployment | Netlify |

---

## 📁 Project Structure

``` plain text
src/
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui base components
│   ├── BookCard.jsx
│   ├── BookList.jsx
│   ├── Navbar.jsx
│   └── ...
├── context/             # React Context providers
│   ├── AuthContext.jsx  # Firebase auth state
│   └── ListedBooksContext.jsx  # Reading list state
├── hooks/               # Custom React hooks
│   ├── useAuth.js
│   └── useBooks.js
├── pages/               # Route-level components
│   ├── Home.jsx
│   ├── BookDetail.jsx
│   ├── ListedBooks.jsx
│   ├── PagesToRead.jsx
│   ├── Search.jsx
│   ├── Blog.jsx
│   ├── SignIn.jsx
│   ├── SignUp.jsx
│   └── ...
├── firebase/
│   └── firebase.js      # Firebase config & exports
├── router/
│   └── index.jsx        # Route definitions
├── data/
│   └── blogPosts.js     # Static blog data
└── layouts/
    └── RootLayout.jsx   # Shared layout with Navbar & Footer
```

---



## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- A [Firebase](https://firebase.google.com) project
- A [Google Books API](https://developers.google.com/books) key

### 1. Clone the Repository

```bash
git clone https://github.com/Shawon-Mahmud07/Book-Vibe.git
cd book-vibe
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GOOGLE_BOOKS_API_KEY=your_google_books_api_key

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Firebase Setup

**Enable Authentication:**


- Go to Firebase Console → Authentication → Sign-in method
- Enable **Google** and **Email/Password**



**Set Firestore Security Rules:**

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }
  }
}
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 🚀 Deployment (Netlify)

This project includes a `netlify.toml` for automatic SPA routing.

**Option 1 — Drag & Drop:**

1. Run `npm run build`
2. Drag the `dist/` folder to [netlify.com/drop](https://app.netlify.com/drop)

**Option 2 — GitHub Integration:**

1. Push your code to GitHub
2. Connect the repo in Netlify dashboard
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add all environment variables under **Site Settings → Environment Variables**

---

## 🔒 Protected Routes

The following routes require authentication:

| Route | Description |
| ------- | ------------- |
| `/listed-books` | Your saved reading list |
| `/pages-to-read` | Reading progress tracker |

Unauthenticated users are redirected to `/signin` and returned to their intended page after login.

---

## 🗺️ Roadmap

- [ ] Book reviews and ratings
- [ ] Social sharing of reading lists
- [ ] Email notifications for reading goals
- [ ] PWA support for offline reading

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- [Google Books API](https://developers.google.com/books) for book data
- [Firebase](https://firebase.google.com) for auth and database
- [shadcn/ui](https://ui.shadcn.com) for UI components
- [Framer Motion](https://www.framer.com/motion) for animations
