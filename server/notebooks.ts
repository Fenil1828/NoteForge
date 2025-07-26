"use server"

import { db } from "@/db/drizzle";
import { InsertNotebook, notebooks } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { m } from "motion/react";
import { headers } from "next/headers";
import { fa, no } from "zod/v4/locales";

export const createNotebook = async (values: InsertNotebook) => {
    try{
        await db.insert(notebooks).values(values);
        
        return {
            success: true,
            message: "Notebook created successfully"
        };
    
    }
    catch(error) {
        console.error("Error creating notebook:", error);
        return {
            success: false,
            message: "Failed to create notebook"
        };
    }
}

export const getNotebooks = async () => {
    try {
        
        const session = await auth.api.getSession({
            headers: await headers(),
        })

        const userId = session?.user?.id;

        if (!userId) {
            return {
                success: false,
                message: "User not Found"
            };
        }

        const notebooksByUser = await db.query.notebooks.findMany({
            where: eq(notebooks.userId, userId),
            with: {
                notes: true,
            }
        });


        return {
            success: true,
            notebooks: notebooksByUser
        };

    } catch (error) {
        console.error("Error fetching notebooks:", error);
        return {
            success: false,
            message: "Failed to fetch notebooks"
        };
    }
}

export const getNotebookById = async (id: string) => {
    try {
        const notebook = await db.query.notebooks.findFirst({
            where: eq(notebooks.id, id),
            with: {
                notes: true,
            }
        });

        if (!notebook) {
            return {
                success: false,
                message: "Notebook not found"
            };
        }
        return {
            success: true,
            notebook
        };

    }
    catch (error) {
        console.error("Error fetching notebook by ID:", error);
        return {
            success: false,
            message: "Failed to fetch notebook"
        };
    }
}

export const updateNotebook = async (id: string, values: InsertNotebook) => {
    try{
        const updatedNotebook = await db.update(notebooks)
            .set(values)
            .where(eq(notebooks.id, id))
            .returning();

        if (updatedNotebook.length === 0) {
            return {
                success: false,
                message: "Notebook not found or no changes made"
            };
        }

        return {
            success: true,
            message: "Notebook updated successfully",
        };
    }
    catch(error) {
        console.error("Error updating notebook:", error);
        return {
            success: false,
            message: "Failed to update notebook"
        };
    }
}

export const deleteNotebook = async (id: string) => {
    try {
        const deletedNotebook = await db.delete(notebooks).where(eq(notebooks.id, id));

        return {
            success: true,
            message: "Notebook deleted successfully"
        };

    } catch (error) {
        console.error("Error deleting notebook:", error);
        return {
            success: false,
            message: "Failed to delete notebook"
        };
    }
}