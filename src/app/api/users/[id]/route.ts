import { db } from "@/lib/db";

// Get user by ID
export async function GET({ params }: { params: { id: string } }) {
   try {
         const sanitizedId = parseInt(params.id, 10);
         if (isNaN(sanitizedId)) {
             return new Response(JSON.stringify({ error: "Invalid user ID" }), {
                 status: 400,
                 headers: {
                     "Content-Type": "application/json",
                 },
             });
         }
         const result = await db.query("SELECT * FROM users WHERE id = $1", [sanitizedId]);
         if (result.rows.length === 0) {
             return new Response(JSON.stringify({ error: "User not found" }), {
                 status: 404,
                 headers: {
                     "Content-Type": "application/json",
                 },
             });
         }
         return new Response(JSON.stringify(result.rows[0]), {
             status: 200,
             headers: {
                 "Content-Type": "application/json",
             },
         });
     } catch {
         return new Response(JSON.stringify({ error: "Failed to fetch user" }), {
             status: 500,
             headers: {
                 "Content-Type": "application/json",
             },
         });
   }
}
