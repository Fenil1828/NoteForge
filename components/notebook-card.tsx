"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Notebook } from "@/db/schema"
import Link from "next/link";
import { Button } from "./ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { deleteNotebook } from "@/server/notebooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { tr } from "zod/v4/locales";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface NotebookCardProps {
  notebook: Notebook;
}

export default function NotebookCard({ notebook }: NotebookCardProps) {
    
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isOpen , setIsOpen] = useState(false);

    const handleDelete = async () => {
        
        try{
            setIsDeleting(true);
            const response = await deleteNotebook(notebook.id);
                if (response.success) {
                    toast.success("Notebook deleted successfully!");
                    router.refresh(); // Refresh the page to reflect changes
                } else {
                    console.error("Failed to delete notebook:", response.message);
                    toast.error(response.message || "Failed to delete notebook");
                }
        }
        catch(error) {
            console.error("Error deleting notebook:", error);
            toast.error("Failed to delete notebook");
        }     
        finally {
            setIsDeleting(false);
            setIsOpen(false); // Close the dialog after deletion
        }
    }



    return(
        <Card>
            <CardHeader>
                <CardTitle>{notebook.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{notebook.notes?.length ?? 0} notes</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Link href={`/dashboard/notebook/${notebook.id}`}>
                    <Button variant="outline">View Notebook</Button>
                </Link>

                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" >
                    {
                        isDeleting ? (
                            <Loader2 className="animate-spin h-4 w-4" />
                        ) : (
                            <Trash2 className="h-4 w-4" />
                        )
                    }
                </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the notebook
                            and all its notes.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialog>
                
            </CardFooter>
        </Card>
    )
}