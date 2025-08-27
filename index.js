import express from "express";
import axios from "axios";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.set("view engine", "ejs");

const db = new pg.Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

async function fetchCoverFromOpenLibrary(title, author) {
  try {
    let url = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`;
    if (author?.trim()) {
      url += `&author=${encodeURIComponent(author)}`;
    }

    const response = await axios.get(url);
    const book = response.data.docs[0];
    if (book?.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
    }
  } catch (err) {
    console.error("Cover fetch error:", err);
  }
  return "/images/imageNotFound.jpg"; // fallback
}

app.get("/", async (req, res) => {
  const sort = req.query.sort || "date";
  let sortQuery;

  switch (sort) {
    case "title":
      sortQuery = "ORDER BY title ASC";
      break;
    case "date":
      sortQuery = "ORDER BY id DESC";
      break;
    case "rating":
    default:
      sortQuery = "ORDER BY rating DESC";
      break;
  }
  try {
    const result = await db.query(`SELECT * FROM books ${sortQuery}`);
    const books = result.rows;

    const booksWithImages = await Promise.all(
      books.map(async (book) => {
        const imageUrl = await fetchCoverFromOpenLibrary(book.title, book.author);
        return { ...book, imageUrl };
      })
    );

    res.render("index", { books: booksWithImages });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading books.");
  }
});

app.post("/add", async (req, res) => {
  const { title, author, rating } = req.body;

  try {
    const response = await axios.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`);
    const book = response.data.docs[0];

    if (!book || !book.cover_i) {
      // If book not found, redirect back to homepage with query param to show error
      console.log("No such book");
      return res.redirect("/");
    }

    // Insert into DB
    await db.query("INSERT INTO books (title, author, rating) VALUES ($1, $2, $3)", [title, author || null, rating || 5]);

    res.redirect("/");
  } catch (err) {
    console.error("Add book error:", err);
    res.status(500).send("Something went wrong");
  }
});

app.post("/delete", async (req, res) => {
  const { id } = req.body;

  try {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).send("Error deleting book");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
