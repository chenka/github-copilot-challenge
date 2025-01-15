import React from "react"
import HabitCard from "../components/HabitCard"

interface Habit {
  name: string
  startDate: Date
  completed: boolean
}

const habits: Habit[] = [
  { name: "Run", startDate: new Date(), completed: false },
  { name: "Workout", startDate: new Date(), completed: true },
  { name: "Meditate", startDate: new Date(), completed: false },
]

const HabitList: React.FC = () => {
  return (
    <div className="p-4">
      {habits.map((habit, index) => (
        <HabitCard
          key={index}
          day={index + 1}
          habitName={habit.name}
          progress={habit.completed ? 1 : 0}
          total={1}
          daysOfWeek={["M", "T", "W", "T", "F", "S", "S"]}
          icon="🏃"
          color="bg-blue-500"
          isComplete={habit.completed}
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
