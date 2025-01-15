import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const main = async () => {
  await prisma.habit.createMany({
    data: [
      {
        name: "Run",
        description: "Morning run in the park",
        startDate: new Date("2025-01-01"),
        frequency: 3,
        color: "#3b82f6", // Hex color for bg-blue-500
      },
      {
        name: "Workout",
        description: "Gym workout session",
        startDate: new Date("2025-01-02"),
        frequency: 4,
        color: "#ef4444", // Hex color for bg-red-500
      },
      {
        name: "Meditate",
        description: "Evening meditation",
        startDate: new Date("2025-01-03"),
        frequency: 5,
        color: "#10b981", // Hex color for bg-green-500
      },
    ],
  })

  await prisma.habitTracking.createMany({
    data: [
      { habitId: 1, date: new Date("2025-01-01") },
      { habitId: 1, date: new Date("2025-01-13") },
      { habitId: 1, date: new Date("2025-01-15") },
      { habitId: 2, date: new Date("2025-01-02") },
      { habitId: 3, date: new Date("2025-01-01") },
    ],
  })
}
