import React from "react"

interface HabitCalendarProps {
  habitTitle: string
  icon: string
  month: string
  year: number
  completedDays: number[]
}

const HabitCalendar: React.FC<HabitCalendarProps> = ({
  habitTitle,
  icon,
  month,
  year,
  completedDays = [],
}) => {
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1)

  return (
    <div>
      {/* Habit Title */}
      <div className="px-4 mb-4">
        <div className="flex items-center">
          <span className="text-yellow-400 text-2xl">{icon}</span>
          <h2 className="ml-2 text-blue-400 text-lg font-semibold">
            {habitTitle}
          </h2>
        </div>
      </div>

      {/* Calendar */}
      <div className="px-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-center text-lg mb-4">
            {month} {year}
          </h3>
          <div className="grid grid-cols-7 text-center text-gray-400 text-sm">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="grid grid-cols-7 text-center mt-4 text-white text-sm">
            {daysInMonth.map((day) => (
              <div
                key={day}
                className={`${
                  completedDays.includes(day) ? "bg-blue-500" : ""
                } rounded-full w-8 h-8 mx-auto flex items-center justify-center`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 inset-x-0 bg-black border-t border-gray-700">
        <div className="flex justify-between items-center px-4 py-2">
          <button className="text-blue-500 text-sm">Today</button>
          <button className="text-blue-500 text-sm">{month}</button>
          <button className="text-gray-500 text-sm">{year}</button>
          <button className="text-gray-500 text-sm">Share</button>
          <button className="text-blue-500 text-sm">Settings</button>
        </div>
      </div>
    </div>
  )
}

export default HabitCalendar
