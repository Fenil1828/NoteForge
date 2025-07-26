"use server"

import { db } from "@/db/drizzle";
import { InsertNote, notebooks, notes } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const createNote = async (values: InsertNote) => {
    try {
        await db.insert(notes).values(values);
         
        return {
            success: true,
            message: "Note created successfully"
        };
    
    } catch(error) {
        console.error("Error creating note:", error); 
        return {
            success: false,
            message: "Failed to create note" 
        };
    }
}

export const getNoteById = async (id: string) => {
    try {
        const note = await db.query.notes.findFirst({
            where: eq(notes.id, id),
            with: {
                notebook: true,
            }
        });

        
  
        if (!note) {
            return {
                success: false,
                message: "Note not found"
            };
        }
        
        return {
            success: true,
            note 
        };

    } catch (error) {
        console.error("Error fetching note by ID:", error); 
        return {
            success: false,
            message: "Failed to fetch note" 
        };
    }
}

export const updateNote = async (id: string, values: Partial<InsertNote>) => {
    try {
        const updatedNote = await db.update(notes)
            .set(values)
            .where(eq(notes.id, id))
            .returning();

        if (updatedNote.length === 0) {
            return {
                success: false,
                message: "Note not found or no changes made" 
            };
        }

        return {
            success: true,
            message: "Note updated successfully", 
        };
    } catch(error) {
        console.error("Error updating note:", error); 
        return {
            success: false,
            message: "Failed to update note" 
        };
    }
}

export const deleteNote = async (id: string) => { 
    try {
        const deletedNote = await db.delete(notes).where(eq(notes.id, id)); 

        return {
            success: true,
            message: "Note deleted successfully" 
        };

    } catch (error) {
        console.error("Error deleting note:", error); 
        return {
            success: false,
            message: "Failed to delete note" 
        };
    }
}
