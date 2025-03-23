import AddPost from "@/components/AddPost";
import Loader from "@/components/shared/Loader";
import hljs from "highlight.js";
import "highlight.js/styles/base16/ia-dark.css";
import { createPost, getPosts, deletePost } from "@/lib/database";
import { revalidateTag } from "next/cache";
import { Suspense } from "react";

import PostActions from "@/components/shared/PostActions";

type Post = {
  id: number;
  title: string;
  content: string;
};

const deletePostAction = async (id: number) => {
  "use server";
  const deleted = deletePost(id);
  if (deleted.changes) {
    revalidateTag("posts");
  }
};

const editPostAction = async (id: number) => {
  "use server";
  console.log("Edit post with id:", id);
};

async function PostsList() {
  const posts = (await getPosts()) as unknown as Post[];

  return (
    <>
      {posts?.map((post: Post) => (
        <div
          key={post.id}
          className="mt-8 border border-zinc-200 bg-zinc-50 shadow pb-4 p-4 rounded-md"
        >
          <div className="flex justify-between items-center">
            <div>{post.title}</div>
            <PostActions
              deletePost={deletePostAction}
              editPost={editPostAction}
              postId={post.id}
            />
          </div>
          <pre className="bg-zinc-900 p-4 rounded-lg mt-4 text-white overflow-x-auto">
            <code
              dangerouslySetInnerHTML={{
                __html: hljs.highlightAuto(post.content).value,
              }}
            />
          </pre>
        </div>
      ))}
    </>
  );
}

export default async function Home() {
  async function addPost(
    formData: FormData
  ): Promise<{ status: string; text: string } | undefined> {
    "use server";

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

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">My Code Snippets</h1>
        <AddPost action={addPost} />
      </div>

      <Suspense fallback={<Loader />}>
        <PostsList />
      </Suspense>
    </div>
  );
}
