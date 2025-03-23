"use client";
import React from "react";
import { RiEdit2Line, RiDeleteBin2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";

type PostActionsProps = Readonly<{
  deletePost: (postId: number) => Promise<void>;
  editPost: (postId: number) => Promise<void>;
  postId: number;
}>;

export default function PostActions({
  deletePost,
  editPost,
  postId,
}: PostActionsProps) {
  const handleEdit = async () => {
    try {
      await editPost(postId);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(postId);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="space-x-2">
      <Button variant="outline" onClick={handleEdit}>
        <RiEdit2Line />
      </Button>
      <Button variant="outline" onClick={handleDelete}>
        <RiDeleteBin2Line />
      </Button>
    </div>
  );
}
