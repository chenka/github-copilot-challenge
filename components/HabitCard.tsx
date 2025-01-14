import React from "react"

interface HabitCardProps {
  day: number
  habitName: string
  progress: number
  total: number
  daysOfWeek: string[]
  icon: string
  color: string
  isComplete: boolean
}

const HabitCard: React.FC<HabitCardProps> = ({
  day,
  habitName,
  progress,
  total,
  daysOfWeek,
  icon,
  color,
  isComplete,
}) => {
  return (
    <div
      className={`rounded-lg p-4 flex justify-between items-center ${
        isComplete ? "bg-green-500" : color
      }`}
    >
      <div>
        <div className="text-3xl font-bold">{day}</div>
        <div className="text-xs text-gray-300">DAY</div>
        <div className="flex items-center mt-2">
          <span className="text-green-500 text-lg">{icon}</span>
          <span className="ml-2 font-semibold text-white">{habitName}</span>
        </div>
        <div className="flex items-center mt-2">
          <div className="flex">
            {daysOfWeek.map((day, index) => (
              <span
                key={index}
                className={`${
                  day === "S" ? "bg-purple-500 text-white" : "text-gray-500"
                } rounded-full w-6 h-6 flex items-center justify-center text-sm`}
              >
                {day}
              </span>
            ))}
          </div>
          <span className="ml-2 text-sm">
            {progress}/{total}
          </span>
        </div>
      </div>
      <button
        className={`rounded-full w-8 h-8 flex items-center justify-center ${
          isComplete ? "bg-green-700" : "bg-purple-500"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </button>
    </div>
  )
}

export default HabitCard
