import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma" // Assuming Prisma is used for database operations

export const POST = async (req: NextRequest, { params }) => {
  const { id } = await params
  const currentDate = new Date().toISOString().split("T")[0] + "T00:00:00.000Z"

  try {
    // Fetch the habit from the database
    const habit = await prisma.habit.findUnique({
      where: { id: Number(id) },
    })

    if (!habit) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 })
    }

    // Check if there is a tracking record for the current date
    const trackingRecord = await prisma.habitTracking.findFirst({
      where: {
        habitId: Number(id),
        date: new Date(currentDate),
      },
    })

    if (trackingRecord) {
      // If a record exists, delete it
      await prisma.habitTracking.delete({
        where: { id: trackingRecord.id },
      })
    } else {
      // If no record exists, add a new tracking record
      await prisma.habitTracking.create({
        data: {
          habitId: Number(id),
          date: new Date(currentDate),
        },
      })
    }

    // Fetch the updated habit with tracking records
    const updatedHabit = await prisma.habit.findUnique({
      where: { id: Number(id) },
      include: { habitTracking: true },
    })

    return NextResponse.json(updatedHabit, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
