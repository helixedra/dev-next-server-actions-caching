import Database from "better-sqlite3";
const db = new Database("database.db", { verbose: console.log });
db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        changed_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
`);

export default db;

export function createPost(data: { title: string; content: string }) {
  const stmt = db.prepare("INSERT INTO posts (title, content) VALUES (?, ?)");
  return stmt.run(data.title, data.content);
}

export function getPosts() {
  const stmt = db.prepare("SELECT * FROM posts ORDER BY id DESC");
  return stmt.all();
}

export function deletePost(id: number) {
  const stmt = db.prepare("DELETE FROM posts WHERE id = ?");
  return stmt.run(id);
}

export function updatePost(
  id: number,
  data: { title: string; content: string }
) {
  const stmt = db.prepare(
    "UPDATE posts SET title = ?, content = ? WHERE id = ?"
  );
  return stmt.run(data.title, data.content, id);
}
