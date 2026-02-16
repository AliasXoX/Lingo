import bcrypt from "bcrypt"
import { db } from "@/lib/db"

export async function register(formData: FormData) {
    'use server';
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword]);
        return { success: true };
    } catch (error) {
        console.error("Error registering user:", error);
        return { success: false, error: "Failed to register user" };
    }
}

export async function login(formData: FormData) {
    'use server';
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
        const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        if (result.rows.length === 0) {
            return { success: false, error: "User not found" };
        }

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { success: false, error: "Invalid password" };
        }

        return { success: true };
    } catch (error) {
        console.error("Error logging in user:", error);
        return { success: false, error: "Failed to login user" };
    }
}