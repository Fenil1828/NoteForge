// "use client"

// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Notebook } from "@/db/schema"
// import Link from "next/link";
// import { Button } from "./ui/button";
// import { Loader2, Trash2, Calendar, FileText } from "lucide-react";
// import { deleteNotebook } from "@/server/notebooks";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { formatDistance } from "date-fns";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"

// interface NotebookCardProps {
//   notebook: Notebook & {
//     // ✅ Add notes count if available from your query
//     _count?: { notes: number };
//     // OR if notes are included directly
//     notes?: any[];
//   };
// }

// export default function NotebookCard({ notebook }: NotebookCardProps) {
    
//     const router = useRouter();
//     const [isDeleting, setIsDeleting] = useState(false);
//     const [isOpen, setIsOpen] = useState(false);

//     const handleDelete = async () => {
//         try {
//             setIsDeleting(true);
//             const response = await deleteNotebook(notebook.id);
            
//             if (response.success) {
//                 toast.success("Notebook deleted successfully!");
//                 setIsOpen(false); // Close dialog first
//                 router.refresh(); // Then refresh
//             } else {
//                 console.error("Failed to delete notebook:", response.message);
//                 toast.error(response.message || "Failed to delete notebook");
//             }
//         } catch (error) {
//             console.error("Error deleting notebook:", error);
//             toast.error("Failed to delete notebook");
//         } finally {
//             setIsDeleting(false);
//         }
//     }

//     // ✅ Calculate notes count safely
//     const notesCount = notebook._count?.notes ?? notebook.notes?.length ?? 0;

//     return (
//         <Card className="hover:shadow-md transition-all duration-200 group">
//             <CardHeader className="pb-3">
//                 <CardTitle className="text-lg font-semibold truncate group-hover:text-primary transition-colors">
//                     {notebook.name}
//                 </CardTitle>
//             </CardHeader>
            
//             <CardContent className="py-3">
//                 <div className="space-y-2">
//                     {/* ✅ Notes count with icon */}
//                     <div className="flex items-center text-sm text-muted-foreground">
//                         <FileText className="mr-2 h-4 w-4" />
//                         <span>{notesCount} {notesCount === 1 ? 'note' : 'notes'}</span>
//                     </div>
                    
//                     {/* ✅ Created date */}
//                     {notebook.createdAt && (
//                         <div className="flex items-center text-sm text-muted-foreground">
//                             <Calendar className="mr-2 h-4 w-4" />
//                             <span>
//                                 Created {formatDistance(new Date(notebook.createdAt), new Date(), { addSuffix: true })}
//                             </span>
//                         </div>
//                     )}
//                 </div>
//             </CardContent>
            
//             <CardFooter className="flex justify-between pt-3">
//                 <Link href={`/dashboard/notebook/${notebook.id}`} className="flex-1 mr-2">
//                     <Button variant="outline" className="w-full">
//                         View Notebook
//                     </Button>
//                 </Link>

//                 {/* ✅ Delete button with alert dialog */}
//                 <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
//                     <AlertDialogTrigger asChild>
//                         <Button 
//                             variant="destructive" 
//                             size="sm"
//                             disabled={isDeleting}
//                             className="px-3"
//                         >
//                             {isDeleting ? (
//                                 <Loader2 className="animate-spin h-4 w-4" />
//                             ) : (
//                                 <Trash2 className="h-4 w-4" />
//                             )}
//                         </Button>
//                     </AlertDialogTrigger>
                    
//                     <AlertDialogContent>
//                         <AlertDialogHeader>
//                             <AlertDialogTitle>Delete Notebook</AlertDialogTitle>
//                             <AlertDialogDescription>
//                                 Are you sure you want to delete "<strong>{notebook.name}</strong>"? 
//                                 This action cannot be undone and will permanently delete the notebook 
//                                 and all its {notesCount} {notesCount === 1 ? 'note' : 'notes'}.
//                             </AlertDialogDescription>
//                         </AlertDialogHeader>
                        
//                         <AlertDialogFooter>
//                             <AlertDialogCancel disabled={isDeleting}>
//                                 Cancel
//                             </AlertDialogCancel>
//                             <AlertDialogAction 
//                                 onClick={handleDelete}
//                                 disabled={isDeleting}
//                                 className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//                             >
//                                 {isDeleting ? (
//                                     <>
//                                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                         Deleting...
//                                     </>
//                                 ) : (
//                                     <>
//                                         <Trash2 className="mr-2 h-4 w-4" />
//                                         Delete Notebook
//                                     </>
//                                 )}
//                             </AlertDialogAction>
//                         </AlertDialogFooter>
//                     </AlertDialogContent>
//                 </AlertDialog>
//             </CardFooter>
//         </Card>
//     )
// }

"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Notebook } from "@/db/schema";
import Link from "next/link";
import { Button } from "./ui/button";
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
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2 } from "lucide-react";
import { deleteNotebook } from "@/server/notebooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NotebookCardProps {
  notebook: Notebook;
}

export default function NotebookCard({ notebook }: NotebookCardProps) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteNotebook(notebook.id);

      if (response.success) {
        toast.success("Notebook deleted successfully");
        router.refresh();
      }
    } catch {
      toast.error("Failed to delete notebook");
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{notebook.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{notebook.notes?.length ?? 0} notes</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Link href={`/dashboard/notebook/${notebook.id}`}>
          <Button variant="outline">View</Button>
        </Link>

        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isDeleting}>
              {isDeleting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Trash2 className="size-4" />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                notebook and all its notes.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}