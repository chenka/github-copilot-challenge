"use client"
import React, { useEffect, useState } from "react"
import HabitCard from "../components/HabitCard"

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

  useEffect(() => {
    const fetchHabits = async () => {
      const response = await fetch("/api/habits")
      const data = await response.json()
      setHabits(data)
    }

    fetchHabits()
  }, [])

  const currentWeekDays = getCurrentWeekDays()

  return (
    <div className="p-4">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          day={habit.progress.completed}
          habitName={habit.name}
          progress={habit.progress.completed}
          total={habit.progress.total}
          color={habit.color}
          isComplete={habit.progress.completed === habit.progress.total}
          highlightDays={getHighlightDays(
            habit.progress.completedDays,
            currentWeekDays
          )}
          timeFrame="DAY(S)"
        />
      ))}
    </div>
  )
}

const Page: React.FC = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>
      <HabitList />
    </div>
  )
}

export default Page
