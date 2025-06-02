import { setupDb } from "../../../db";
import { advocates } from "../../../db/schema";
import { NextResponse } from "next/server";
// Went with docker database data
// import { advocateData } from "../../../db/seed/advocates";

/* Notes
 * Updated pattern to leverage singleton db
 * Changed response to use NextResponse
 */
export async function GET() {
  try {
    const db = setupDb();
    const data = await db.select().from(advocates);

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
    );
  }
}