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

### Create a .env file in the root of your project and add your PostgreSQL connection details:

```
DB_USER=your_pg_username
DB_PASSWORD=your_pg_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
```

### 5. Start the server

```
node index.js
```
