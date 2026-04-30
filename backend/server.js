import "dotenv/config";
import express from "express";
import pg from "pg";
import cors from "cors";

const app = express();
const { Pool } = pg;


// config
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const DATABASE_URL =
  process.env.DATABASE_URL || "postgresql://postgres:1234@127.0.0.1:5432/task_board";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:80";

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

const pool = new Pool({
  connectionString: DATABASE_URL,
});

const initializeDatabase = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'todo'
    )
  `);
};

app.get("/api/todos", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, title, status FROM todos ORDER BY id ASC"
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Cannot get todos", error: error.message });
  }
});

app.post("/api/todos", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const { rows } = await pool.query(
      "INSERT INTO todos (title, status) VALUES ($1, $2) RETURNING id, title, status",
      [title.trim(), "todo"]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Cannot create todo", error: error.message });
  }
});

app.put("/api/todos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const payload = req.body?.data ?? req.body;
    const title = payload?.title;
    const status = payload?.status;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const { rows } = await pool.query(
      "UPDATE todos SET title = $1, status = $2 WHERE id = $3 RETURNING id, title, status",
      [title.trim(), status || "todo", id]
    );
    const updatedTodo = rows[0];

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Cannot update todo", error: error.message });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { rowCount } = await pool.query("DELETE FROM todos WHERE id = $1", [id]);

    if (!rowCount) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "delete" });
  } catch (error) {
    res.status(500).json({ message: "Cannot delete todo", error: error.message });
  }
});

initializeDatabase()
  .then(() => {
    console.log("PostgreSQL connected");
    app.listen(PORT, HOST, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("PostgreSQL connection failed:", error.message);
  });
