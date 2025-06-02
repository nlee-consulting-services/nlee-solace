import { setupDb } from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import {NextResponse} from "next/server";

/* Notes
 * Updated pattern to leverage singleton db
 * Changed response to use NextResponse
 */

export async function POST() {
  try {
    const db = setupDb();
    const data = await db.insert(advocates).values(advocateData).returning();

    return NextResponse.json({ advocates: data });
  } catch (error) {
    console.error("Failed to seed database data:", error);
    return NextResponse.json(
        {error: "Internal Server Error"},
        {status: 500}
    );
  }
}
