import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma" // Assuming Prisma is used for database operations

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    // Fetch the habit tracking entry for today
    const today = new Date()
    const habitTracking = await prisma.habitTracking.findFirst({
      where: {
        habitId: Number(id),
        date: {
          gte: new Date(today.setHours(0, 0, 0, 0)),
          lt: new Date(today.setHours(23, 59, 59, 999)),
        },
      },
    })

    if (!habitTracking) {
      return NextResponse.json(
        { error: "Habit tracking entry not found" },
        { status: 404 }
      )
    }

    // Toggle the habit tracking entry
    const updatedHabitTracking = await prisma.habitTracking.update({
      where: { id: habitTracking.id },
      data: { date: new Date() }, // Example update, adjust as needed
    })

    return NextResponse.json(updatedHabitTracking, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
