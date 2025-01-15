"use client"
import React, { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { getHabit, updateHabit, deleteHabit } from "./actions"

const EditHabit: React.FC = () => {
  const router = useRouter()
  const { id: habitId } = useParams()

  const [habit, setHabit] = useState({
    name: "",
    startDate: "",
    frequency: "",
    color: "#3b82f6",
  })

  useEffect(() => {
    const fetchHabit = async () => {
      if (habitId) {
        const data = await getHabit(habitId)
        setHabit({
          ...data,
          startDate: new Date(data.startDate).toISOString().split("T")[0],
        })
      }
    }

    fetchHabit()
  }, [habitId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    await updateHabit(habitId, {
      name: data.name as string,
      startDate: data.startDate as string,
      frequency: data.frequency as string,
      color: data.color as string,
    })

    router.push("/")
  }

  const handleDelete = async () => {
    await deleteHabit(habitId)
    router.push("/")
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Habit</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">Habit Name</label>
          <input
            type="text"
            name="name"
            className="bg-gray-800 text-white w-full rounded-md p-2"
            placeholder="Enter habit name"
            value={habit.name}
            onChange={(e) => setHabit({ ...habit, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">Start Date</label>
          <input
            type="date"
            name="startDate"
            className="bg-gray-800 text-white w-full rounded-md p-2"
            value={habit.startDate}
            onChange={(e) => setHabit({ ...habit, startDate: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">Frequency</label>
          <input
            type="number"
            name="frequency"
            className="bg-gray-800 text-white w-full rounded-md p-2"
            min="1"
            max="7"
            value={habit.frequency}
            onChange={(e) => setHabit({ ...habit, frequency: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">
            Habit Color
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[
              "#3b82f6",
              "#ec4899",
              "#f97316",
              "#10b981",
              "#8b5cf6",
              "#ef4444",
              "#14b8a6",
              "#eab308",
              "#06b6d4",
              "#6b7280",
            ].map((color) => (
              <div
                key={color}
                className="w-12 h-12 rounded-full"
                style={{ backgroundColor: color }}
                onClick={() => setHabit({ ...habit, color })}
              ></div>
            ))}
          </div>
          <input type="hidden" name="color" value={habit.color} />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </form>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleDelete}
      >
        Delete Habit
      </button>
    </div>
  )
}

export default EditHabit
