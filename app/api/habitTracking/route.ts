import { NextResponse } from "next/server"
import { addHabitTracking } from "./actions"

export async function POST(request: Request) {
  const data = await request.json()
  await addHabitTracking(data)
  return NextResponse.json({ message: "Habit tracking added successfully" })
}
