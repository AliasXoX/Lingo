import { db } from "../../../lib/db";

// Get all users
export async function GET(request: Request) {
   try {
         const result = await db.query("SELECT * FROM users");
         return new Response(JSON.stringify(result.rows), {
             status: 200,
             headers: {
                 "Content-Type": "application/json",
             },
         });
     } catch (error) {
         return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
             status: 500,
             headers: {
                 "Content-Type": "application/json",
             },
         });
   }
}