"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Toast from "@/components/shared/Toast";
import { useState } from "react";

type AddPostProps = {
  action: (
    formData: FormData
  ) => Promise<{ status: string; text: string } | undefined>;
};

type ToastProps = {
  status: string;
  text: string;
};

export default function AddPost({ action }: Readonly<AddPostProps>) {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await action(formData);

    if (result) {
      setToast(result);
      if (result.status === "success") {
        const dialog = document.querySelector("[data-state='open']");
        if (dialog) {
          (dialog as HTMLElement).click();
        }
      }
    }
  };

  return (
    <div>
      {toast !== null && (
        <Toast message={toast.text} status={toast.status} position="top" />
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Add Snippet</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Post</DialogTitle>
            <DialogDescription>Add a new post to the list</DialogDescription>
          </DialogHeader>
          <form action={handleSubmit} className="space-y-4">
            <Label htmlFor="title">Title</Label>
            <Input type="text" name="title" />
            <Label htmlFor="content">Content</Label>
            <Textarea name="content" />
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
