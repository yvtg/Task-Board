import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/task_board";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

const todoSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    status: { type: String, default: "todo" },
  },
  { versionKey: false }
);

const Todo = mongoose.model("Todo", todoSchema);

app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ id: 1 });
    res.status(200).json(todos);
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

    const lastTodo = await Todo.findOne().sort({ id: -1 });
    const nextId = lastTodo ? lastTodo.id + 1 : 1;

    const newTodo = await Todo.create({
      id: nextId,
      title: title.trim(),
      status: "todo",
    });

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Cannot create todo", error: error.message });
  }
});

app.put("/api/todos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const payload = req.body?.data ?? req.body;
    const updatedTodo = await Todo.findOneAndReplace({ id }, payload, {
      returnDocument: "after",
      runValidators: true,
    });

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
    const deletedTodo = await Todo.findOneAndDelete({ id });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "delete" });
  } catch (error) {
    res.status(500).json({ message: "Cannot delete todo", error: error.message });
  }
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
