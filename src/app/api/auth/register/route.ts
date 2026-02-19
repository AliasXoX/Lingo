import { db } from "../../../../lib/db";

// Create a user
export async function POST(request: Request) {
    try {
        const { username, password } = await request.json() as { username: string; password: string };
        const result = db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password]);
        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch {
        return new Response(JSON.stringify({ error: "Failed to create user" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}