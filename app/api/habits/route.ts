import { NextResponse } from "next/server"
import prisma from "../../../lib/prisma"

export async function GET() {
  const habits = await prisma.habit.findMany()
  return NextResponse.json(habits)
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

export async function handler() {
  return NextResponse.error()
}
