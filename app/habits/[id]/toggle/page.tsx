import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prisma" // Assuming Prisma is used for database operations

const toggleHabit = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id } = req.query

    try {
      // Fetch the habit from the database
      const habit = await prisma.habit.findUnique({
        where: { id: Number(id) },
      })

      if (!habit) {
        return res.status(404).json({ error: "Habit not found" })
      }

      // Toggle the habit completion status
      const isComplete = habit.progress.completed === habit.progress.total
      const updatedHabit = await prisma.habit.update({
        where: { id: Number(id) },
        data: {
          progress: {
            completed: isComplete
              ? habit.progress.completed - 1
              : habit.progress.completed + 1,
          },
        },
      })

      res.status(200).json(updatedHabit)
    } catch (error) {
      res.status(500).json({ error: "Internal server error" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default toggleHabit
