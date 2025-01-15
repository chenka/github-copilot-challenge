"use client"
import React from "react"
import { useRouter } from "next/navigation"
import { createHabit } from "./actions"

const CreateHabit: React.FC = () => {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    await createHabit({
      name: data.name as string,
      description: data.description as string,
      startDate: data.startDate as string,
      frequency: data.frequency as string,
      color: data.color as string,
    })

    router.push("/")
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Habit</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">Habit Name</label>
          <input
            type="text"
            name="name"
            className="bg-gray-800 text-white w-full rounded-md p-2"
            placeholder="Enter habit name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">
            Description
          </label>
          <input
            type="text"
            name="description"
            className="bg-gray-800 text-white w-full rounded-md p-2"
            placeholder="Enter habit description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">Start Date</label>
          <input
            type="date"
            name="startDate"
            className="bg-gray-800 text-white w-full rounded-md p-2"
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
                onClick={() =>
                  ((
                    document.querySelector(
                      'input[name="color"]'
                    ) as HTMLInputElement
                  ).value = color)
                }
              ></div>
            ))}
          </div>
          <input type="hidden" name="color" value="#3b82f6" />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default CreateHabit
