import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon('postgresql://raydydb_owner:8wKNlbO3PHfB@ep-muddy-resonance-a2amj1hy.eu-central-1.aws.neon.tech/raydydb?sslmode=require');
    const { name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await sql`
      INSERT INTO users (
        name, 
        email, 
        clerk_id
      ) 
      VALUES (
        ${name}, 
        ${email},
        ${clerkId}
     );`;

    return new Response(JSON.stringify({ data: response }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}