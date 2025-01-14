"use client"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import confetti from "canvas-confetti"

interface Habit {
  id: number
  name: string
  description?: string
  progress: number
  total: number
  currentStreak: number
  bestStreak: number
  history: string[] // 'X' for completed, 'O' for missed
  goalType: string
  frequency: string
  startDate: string
  reminder: boolean
  reminderTime?: string
}

interface LastAction {
  type: string
  id: number
}

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [newHabitName, setNewHabitName] = useState<string>("")
  const [newHabitDescription, setNewHabitDescription] = useState<string>("")
  const [newHabitTotal, setNewHabitTotal] = useState<number>(1)
  const [newHabitGoalType, setNewHabitGoalType] =
    useState<string>("incremental")
  const [newHabitFrequency, setNewHabitFrequency] = useState<string>("daily")
  const [newHabitStartDate, setNewHabitStartDate] = useState<string>("")
  const [newHabitReminder, setNewHabitReminder] = useState<boolean>(false)
  const [newHabitReminderTime, setNewHabitReminderTime] = useState<string>("")
  const [lastAction, setLastAction] = useState<LastAction | null>(null)

  useEffect(() => {
    const savedHabits = Cookies.get("habits")
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits))
    } else {
      setHabits([
        {
          id: 1,
          name: "Drink Water",
          progress: 5,
          total: 7,
          currentStreak: 0,
          bestStreak: 0,
          history: [],
          goalType: "incremental",
          frequency: "daily",
          startDate: "",
          reminder: false,
        },
        {
          id: 2,
          name: "Exercise",
          progress: 3,
          total: 7,
          currentStreak: 0,
          bestStreak: 0,
          history: [],
          goalType: "incremental",
          frequency: "daily",
          startDate: "",
          reminder: false,
        },
      ])
    }
  }, [])

  useEffect(() => {
    if (habits.length > 0) {
      Cookies.set("habits", JSON.stringify(habits))
    }
  }, [habits])

  const handleCheck = (id: number) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === id && habit.progress < habit.total) {
          const newProgress = habit.progress + 1
          const newHistory = habit.history ? [...habit.history, "X"] : ["X"]
          const newCurrentStreak = habit.currentStreak + 1
          const newBestStreak = Math.max(newCurrentStreak, habit.bestStreak)
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })
          return {
            ...habit,
            progress: newProgress,
            currentStreak: newCurrentStreak,
            bestStreak: newBestStreak,
            history: newHistory,
          }
        }
        return habit
      })
    )
    setLastAction({ type: "increment", id })
  }

  const handleUndo = () => {
    if (lastAction?.type === "increment") {
      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit.id === lastAction.id && habit.progress > 0
            ? { ...habit, progress: habit.progress - 1 }
            : habit
        )
      )
      setLastAction(null)
    }
  }

  const handleReduce = (id: number) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === id && habit.progress > 0) {
          const newProgress = habit.progress - 1
          const newHistory = habit.history ? [...habit.history, "O"] : ["O"]
          const newCurrentStreak = 0
          return {
            ...habit,
            progress: newProgress,
            currentStreak: newCurrentStreak,
            history: newHistory,
          }
        }
        return habit
      })
    )
  }

  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this habit?")) {
      return
    }
    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id))
  }

  const handleAddHabit = () => {
    const newHabit: Habit = {
      id: habits.length + 1,
      name: newHabitName,
      description: newHabitDescription,
      progress: 0,
      total: newHabitTotal,
      currentStreak: 0,
      bestStreak: 0,
      history: [],
      goalType: newHabitGoalType,
      frequency: newHabitFrequency,
      startDate: newHabitStartDate,
      reminder: newHabitReminder,
      reminderTime: newHabitReminderTime,
    }
    setHabits([...habits, newHabit])
    setNewHabitName("")
    setNewHabitDescription("")
    setNewHabitTotal(1)
    setNewHabitGoalType("incremental")
    setNewHabitFrequency("daily")
    setNewHabitStartDate("")
    setNewHabitReminder(false)
    setNewHabitReminderTime("")
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddHabit()
    }
  }

  const activeHabits = habits.filter((habit) => habit.progress < habit.total)
  const completedHabits = habits.filter(
    (habit) => habit.progress >= habit.total
  )

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      <header className="bg-green-500 text-white p-6">
        <h1 className="text-2xl font-bold">Good Morning, Kelvin!</h1>
        <p className="mt-2">
          "Start where you are. Use what you have. Do what you can."
        </p>
      </header>

      <main className="p-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Active Habits</h2>
          {activeHabits.map((habit) => (
            <div
              key={habit.id}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{habit.name}</span>
                <span className="text-sm text-gray-500">
                  {habit.progress}/{habit.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(habit.progress / habit.total) * 100}%` }}
                ></div>
              </div>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleCheck(habit.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Add Progress
                </button>
                <button
                  onClick={() => handleReduce(habit.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Reduce Progress
                </button>
                <button
                  onClick={() => handleDelete(habit.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Completed Habits</h2>
          {completedHabits.map((habit) => (
            <div
              key={habit.id}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{habit.name}</span>
                <span className="text-sm text-gray-500">
                  {habit.progress}/{habit.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(habit.progress / habit.total) * 100}%` }}
                ></div>
              </div>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleReduce(habit.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Reduce Progress
                </button>
                <button
                  onClick={() => handleDelete(habit.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white shadow-md rounded-lg p-4 text-center">
              <span className="text-2xl font-bold text-yellow-500">🔥</span>
              <p className="text-lg font-medium mt-2">Current Streak</p>
              <p className="text-gray-600">
                {habits.reduce(
                  (max, habit) => Math.max(max, habit.currentStreak),
                  0
                )}{" "}
                Days
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 text-center">
              <span className="text-2xl font-bold text-yellow-500">🌟</span>
              <p className="text-lg font-medium mt-2">Best Streak</p>
              <p className="text-gray-600">
                {habits.reduce(
                  (max, habit) => Math.max(max, habit.bestStreak),
                  0
                )}{" "}
                Days
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 p-6 text-center">
        <button
          onClick={() => {
            setNewHabitName("")
            setNewHabitDescription("")
            setNewHabitTotal(1)
            setNewHabitGoalType("incremental")
            setNewHabitFrequency("daily")
            setNewHabitStartDate("")
            setNewHabitReminder(false)
            setNewHabitReminderTime("")
          }}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        >
          Add New Habit
        </button>
        <button className="ml-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          View Calendar
        </button>
      </footer>
    </div>
  )
}
