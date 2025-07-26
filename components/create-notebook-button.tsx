"use client"

import {  z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "./ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Loader2, Plus } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { createNotebook } from "@/server/notebooks"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
})

export const CreateNotebookButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false) // To control dialog state
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      console.log(values)

      const userId = (await authClient.getSession()).data?.user.id;

      if (!userId) {
        toast.error("You must be logged in to create a notebook.")
        return;
      }
      
      const response = await createNotebook({
        ...values,
        userId: userId,
      });

      if (response.success) {
        toast.success("Notebook created successfully!", {
          icon: <Plus className="h-4 w-4" />
        })
        router.refresh() // Refresh the page to show the new notebook
        setOpen(false)

      } else {
        toast.error(response.message || "Failed to create notebook.")
      }
      form.reset()
    } catch (error) {
      console.error("Error creating notebook:", error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* ✅ FIXED: Proper Button wrapper */}
        <Button variant="default" size="sm" className="w-max">
          <Plus className=" mr-2 h-4 w-4" />
          Create Notebook
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {/* ✅ FIXED: Proper title and description */}
          <DialogTitle>Create New Notebook</DialogTitle>
          <DialogDescription>
            Enter a name for your new notebook. You can organize your notes and ideas here.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notebook Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="My awesome notebook" 
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex gap-2 justify-end">
              {/* Cancel button */}
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              
              {/* Submit button */}
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Notebook
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
