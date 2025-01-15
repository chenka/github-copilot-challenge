import { NextResponse } from "next/server"
import prisma from "../../../../lib/prisma"

export async function GET() {
  const habitTracking = await prisma.habitTracking.findMany({
    include: {
      habit: true,
    },
  })

  const formattedTracking = habitTracking.map((tracking) => ({
    id: tracking.id,
    habitId: tracking.habitId,
    date: tracking.date.toISOString().split("T")[0],
    habit: {
      id: tracking.habit.id,
      name: tracking.habit.name,
      color: tracking.habit.color,
    },
  }))

  return NextResponse.json(formattedTracking)
}
