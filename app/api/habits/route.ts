import { NextResponse } from "next/server"
import prisma from "../../../lib/prisma"

export async function GET() {
  const habits = await prisma.habit.findMany({
    include: {
      habitTracking: true,
    },
  })

  const formattedHabits = habits.map((habit) => {
    const completedDays = habit.habitTracking.map(
      (tracking) => tracking.date.toISOString().split("T")[0]
    )

    return {
      id: habit.id,
      name: habit.name,
      color: habit.color,
      progress: {
        completed: completedDays.length,
        total: habit.frequency,
        completedDays,
      },
    }
  })

  return NextResponse.json(formattedHabits)
}

export async function POST(req: Request) {
  const { name, description, startDate, frequency, color } = await req.json()
  const newHabit = await prisma.habit.create({
    data: {
      name,
      description,
      startDate: new Date(startDate),
      frequency,
      color,
    },
  })
  return NextResponse.json(newHabit, { status: 201 })
}
