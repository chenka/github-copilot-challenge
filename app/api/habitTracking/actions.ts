"use server"
import prisma from "../../../lib/prisma"

export const addHabitTracking = async (data: {
  habitId: number
  date: string
  status: boolean
}) => {
  await prisma.habitTracking.create({
    data: {
      habitId: data.habitId,
      date: new Date(data.date),
    },
  })
}
