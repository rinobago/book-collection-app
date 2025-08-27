# 📚 Boox — Personal Bookshelf Web App

Boox is a personal bookshelf manager built with **Node.js**, **Express**, **PostgreSQL**, and the **Open Library API**. Users can search for books, add them to a collection, view cover images, rate them, sort by different criteria, and delete entries — all within a responsive UI.

---

## ✨ Features

- 🔎 Search books via the [Open Library API](https://openlibrary.org/developers/api)
- 🖼️ Auto-fetch cover images
- ➕ Add books to your collection
- 📅 Displays date when added
- ⭐ Rate books (1–5)
- ↕️ Sort by rating, title, or date
- 🗑️ Delete books from collection
- 🎨 Clean, responsive UI with hover effects

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** HTML5, CSS3, JavaScript (vanilla)
- **Templating:** EJS
- **Database:** PostgreSQL
- **API:** Open Library

---

## 🚀 Getting Started

### 1. Clone the repository

```
git clone https://github.com/rinobago/book-collection-app.git
cd boox
```

### 2. Install dependencies

```
npm install
```

### 3. Set up PostgreSQL

### Make sure you have PostgreSQL installed and running.

- Create a new database:
```
CREATE DATABASE Boox;
```

- Then connect to it and run this to create the books table:
```
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  rating INTEGER DEFAULT 5,
  date_added DATE NOT NULL DEFAULT CURRENT_DATE
);
```

### 4. Configure your database credentials

### In server.js, edit this section to match your setup:

```
const db = new pg.Client({
  user: "your_username",
  host: "localhost",
  database: "Boox",
  password: "your_password",
  port: 5432,
});
```

### 5. Start the server

```
node index.js
```
