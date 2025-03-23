import Database from "better-sqlite3";

const db = new Database("database.db");
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

export async function getPosts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stmt = db.prepare("SELECT * FROM posts ORDER BY id DESC");
      resolve(stmt.all());
    }, 500); //remove this timeout
  });
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
