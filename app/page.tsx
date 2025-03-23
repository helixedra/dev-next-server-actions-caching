import AddPost from "@/components/AddPost";
import Loader from "@/components/shared/Loader";
import hljs from "highlight.js";
import "highlight.js/styles/base16/ia-dark.css";
import { createPost, getPosts } from "@/lib/database";
import { revalidateTag } from "next/cache";

type Post = {
  id: number;
  title: string;
  content: string;
};

export default function Home() {
  async function addPost(formData: FormData) {
    "use server";
    // console.log(formData.get("title"));
    // console.log(formData.get("content"));

    const data = {
      title: (formData.get("title") as string) || "",
      content: (formData.get("content") as string) || "",
    };

    try {
      const newPost = createPost(data);

      if (newPost.changes) {
        revalidateTag("posts");
        return { status: "success", text: "Snippet added successfully" };
      }
    } catch (error) {
      console.error("Error adding snippet:", error);
      return {
        status: "error",
        text: "An error occurred while adding the snippet",
      };
    }
  }

  const posts = getPosts() as Post[];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl">My Code Snippets</h1>

      <Loader />
      <AddPost action={addPost} />

      {posts.map((post: Post) => (
        <div
          key={post.id}
          className="mt-8 border border-zinc-200 bg-zinc-50 shadow pb-4 p-4 rounded-md"
        >
          <h2>{post.title}</h2>
          <pre className="bg-zinc-900 p-4 rounded-lg mt-4 text-white overflow-x-auto">
            <code
              dangerouslySetInnerHTML={{
                __html: hljs.highlightAuto(post.content).value,
              }}
            />
          </pre>
        </div>
      ))}
    </div>
  );
}
