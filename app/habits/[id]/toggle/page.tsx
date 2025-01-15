import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prisma" // Assuming Prisma is used for database operations

const toggleHabit = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id } = req.query

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
        return res.status(404).json({ error: "Habit tracking entry not found" })
      }

      // Toggle the habit tracking entry
      const updatedHabitTracking = await prisma.habitTracking.update({
        where: { id: habitTracking.id },
        data: { date: new Date() }, // Example update, adjust as needed
      })

      res.status(200).json(updatedHabitTracking)
    } catch {
      res.status(500).json({ error: "Internal server error" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default toggleHabit
