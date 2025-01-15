import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const main = async () => {
  await prisma.habit.createMany({
    data: [
      {
        name: "Run",
        description: "Morning run in the park",
        startDate: new Date("2023-01-01"),
        frequency: 3,
        color: "bg-blue-500",
      },
      {
        name: "Workout",
        description: "Gym workout session",
        startDate: new Date("2023-01-02"),
        frequency: 4,
        color: "bg-red-500",
      },
      {
        name: "Meditate",
        description: "Evening meditation",
        startDate: new Date("2023-01-03"),
        frequency: 5,
        color: "bg-green-500",
      },
    ],
  })

  await prisma.habitTracking.createMany({
    data: [
      { habitId: 1, date: new Date("2023-01-01") },
      { habitId: 1, date: new Date("2023-01-02") },
      { habitId: 2, date: new Date("2023-01-02") },
      { habitId: 3, date: new Date("2023-01-03") },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
