"use server"
import prisma from "../../../../lib/prisma"
import { Habit } from "../../../types"

export const getHabit = async (id: string): Promise<Habit> => {
  const habit = await prisma.habit.findUnique({
    where: { id: parseInt(id, 10) },
  })
  console.log(habit)
  return habit
}

export const updateHabit = async (
  id: string,
  habit: Partial<Habit>
): Promise<void> => {
  await prisma.habit.update({
    where: { id: parseInt(id, 10) },
    data: {
      name: habit.name,
      startDate: habit.startDate ? new Date(habit.startDate) : undefined,
      frequency: habit.frequency ? parseInt(habit.frequency, 10) : undefined,
      color: habit.color,
    },
  })
}

export const deleteHabit = async (id: string): Promise<void> => {
  await prisma.habitTracking.deleteMany({
    where: { habitId: parseInt(id, 10) },
  })
  await prisma.habit.delete({
    where: { id: parseInt(id, 10) },
  })
}
