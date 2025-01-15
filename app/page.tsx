"use client"
import React, { useEffect, useState } from "react"
import HabitCard from "../components/HabitCard"
import { useRouter } from "next/navigation"

interface Habit {
  id: number
  name: string
  color: string
  progress: {
    completed: number
    total: number
    completedDays: string[]
  }
}

const getCurrentWeekDays = () => {
  const currentDate = new Date()
  const startOfWeek = currentDate.getDate() - currentDate.getDay() + 1
  const days = []
  for (let i = 0; i < 7; i++) {
    const day = new Date(currentDate.setDate(startOfWeek + i))
    days.push(day.toISOString().split("T")[0])
  }
  return days
}

const getHighlightDays = (
  completedDays: string[],
  currentWeekDays: string[]
) => {
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  return currentWeekDays
    .map((day, index) => {
      const dayName = dayNames[index]
      return completedDays.includes(day) ? dayName : ""
    })
    .filter((day) => day !== "")
}

const HabitList: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchHabits = async () => {
      const response = await fetch("/api/habits")
      const data = await response.json()
      setHabits(data)
    }

    fetchHabits()
  }, [])

  const currentWeekDays = getCurrentWeekDays()
  const currentDate = new Date().toISOString().split("T")[0]

  const toggleComplete = async (habitId: number) => {
    await fetch(`/api/habits/${habitId}/toggle`, { method: "POST" })
    const response = await fetch("/api/habits")
    const data = await response.json()
    setHabits(data)
  }

  return (
    <div className="p-4">
      {habits.map((habit) => (
        <div key={habit.id} className="mb-4">
          <HabitCard
            day={habit.progress.completed}
            habitName={habit.name}
            progress={habit.progress.completed}
            total={habit.progress.total}
            color={habit.color}
            isComplete={!habit.progress.completedDays.includes(currentDate)}
            highlightDays={getHighlightDays(
              habit.progress.completedDays,
              currentWeekDays
            )}
            timeFrame="DAY(S)"
            onToggleComplete={() => toggleComplete(habit.id)}
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={() => router.push(`/habits/${habit.id}/edit`)}
          >
            Edit Habit
          </button>
        </div>
      ))}
    </div>
  )
}

const Page: React.FC = () => {
  const router = useRouter()

  const navigateToCreateHabit = () => {
    router.push("/habits/new")
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={navigateToCreateHabit}
      >
        Create New Habit
      </button>
      <HabitList />
    </div>
  )
}

export default Page
