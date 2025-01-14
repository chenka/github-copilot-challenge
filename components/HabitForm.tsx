import React, { useState } from "react"

const NewHabitForm: React.FC = () => {
  const [habitName, setHabitName] = useState("")
  const [startDate, setStartDate] = useState("2025-01-14")
  const [frequency, setFrequency] = useState(7)
  const [weekStart, setWeekStart] = useState("Sunday")
  const [reminders, setReminders] = useState(0)
  const [habitColor, setHabitColor] = useState("bg-blue-500")

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button className="text-blue-500 text-sm">Cancel</button>
        <h1 className="text-lg font-semibold">New Habit</h1>
        <button className="text-blue-500 text-sm">Save</button>
      </div>

      {/* Form */}
      <div className="px-4">
        {/* Habit Name */}
        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-2">Habit name</label>
          <input
            type="text"
            className="bg-gray-800 text-white w-full rounded-md p-2"
            placeholder="Enter habit name"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />
        </div>

        {/* Templates */}
        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-2">Templates:</label>
          <div className="flex space-x-2">
            <button className="flex items-center gap-1 bg-yellow-500 text-black px-4 py-2 rounded-md">
              🏃 Run
            </button>
            <button className="flex items-center gap-1 bg-yellow-500 text-black px-4 py-2 rounded-md">
              💪 Work out
            </button>
            <button className="flex items-center gap-1 bg-yellow-500 text-black px-4 py-2 rounded-md">
              🧘 Meditate
            </button>
          </div>
        </div>

        {/* Start Date */}
        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-2">Start date</label>
          <input
            type="date"
            className="bg-gray-800 text-white w-full rounded-md p-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <p className="text-gray-500 text-xs mt-2">
            The start date is used to work out your all-time completion rate.
          </p>
        </div>

        {/* Frequency */}
        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-2">
            How many days per week should you complete that habit?
          </label>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <button
                key={day}
                className={`rounded-full w-12 h-12 flex items-center justify-center ${
                  frequency === day
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-400"
                }`}
                onClick={() => setFrequency(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Week Start */}
        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-2">
            Calendar week starts on
          </label>
          <select
            className="bg-gray-800 text-white w-full rounded-md p-2"
            value={weekStart}
            onChange={(e) => setWeekStart(e.target.value)}
          >
            <option>Sunday</option>
            <option>Monday</option>
          </select>
        </div>

        {/* Reminders */}
        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-2">Reminders</label>
          <input
            type="number"
            className="bg-gray-800 text-white w-full rounded-md p-2"
            placeholder="Enter number of reminders"
            value={reminders}
            onChange={(e) => setReminders(Number(e.target.value))}
          />
        </div>

        {/* Habit Color */}
        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-2">
            Habit color
          </label>
          <button className={`${habitColor} text-white w-full rounded-md p-2`}>
            Default - Tap to open picker
          </button>
          <p className="text-gray-500 text-xs mt-2">
            Tap the big button above to pick a custom color, or choose from our
            favorite palettes below:
          </p>
          <div className="grid grid-cols-5 gap-2 mt-4">
            {[
              "bg-blue-500",
              "bg-pink-500",
              "bg-orange-500",
              "bg-green-500",
              "bg-purple-500",
              "bg-red-500",
              "bg-teal-500",
              "bg-yellow-500",
              "bg-cyan-500",
              "bg-gray-500",
            ].map((color) => (
              <div
                key={color}
                className={`w-12 h-12 rounded-full ${color}`}
                onClick={() => setHabitColor(color)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewHabitForm
