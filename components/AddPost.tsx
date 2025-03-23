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

export default function AddPost({
  action,
}: Readonly<{ action: (formData: FormData) => void }>) {
  const handleSubmit = async (formData: FormData) => {
    const result = await action(formData);
    console.log(result);
  };

  return (
    <div>
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
