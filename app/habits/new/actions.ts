"use server"
import prisma from "../../../lib/prisma"

export const createHabit = async (data: {
  name: string
  startDate: string
  frequency: string
  color: string
}) => {
  await prisma.habit.create({
    data: {
      name: data.name,
      startDate: new Date(data.startDate),
      frequency: parseInt(data.frequency, 10),
      color: data.color,
    },
  })
}
