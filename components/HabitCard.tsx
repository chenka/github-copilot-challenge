import React from "react"

interface HabitCardProps {
  day: number
  habitName: string
  progress: number
  total: number
  color: string
  isComplete: boolean
  highlightDays: string[]
  timeFrame: "DAY(S)" | "WEEK(S)"
  onToggleComplete: () => void
}

const HabitCard: React.FC<HabitCardProps> = ({
  day,
  habitName,
  progress,
  total,
  color,
  isComplete,
  highlightDays,
  timeFrame,
  onToggleComplete,
}) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
    <div
      className={`rounded-lg p-4 flex justify-between items-center border border-gray-300`}
      style={{ backgroundColor: isComplete ? "" : color }}
    >
      <div>
        <div className="text-3xl font-bold">{day}</div>
        <div className="text-xs text-gray-300">{timeFrame}</div>
        <div className="flex items-center mt-2">
          <span className="font-semibold text-white">{habitName}</span>
        </div>
        <div className="flex items-center mt-2">
          <div className="flex">
            {daysOfWeek.map((day, index) => (
              <span
                key={index}
                className={`rounded-full w-6 h-6 flex items-center justify-center text-sm`}
                style={{
                  backgroundColor: highlightDays.includes(day)
                    ? "#8b5cf6"
                    : "transparent",
                  color: highlightDays.includes(day) ? "white" : "#6b7280",
                }}
              >
                {day.slice(0, 1)}
              </span>
            ))}
          </div>
          <span className="ml-2 text-sm">
            {progress}/{total}
          </span>
        </div>
      </div>
      <button
        className={`rounded-full w-8 h-8 flex items-center justify-center`}
        style={{ backgroundColor: isComplete ? "#047857" : "#8b5cf6" }}
        onClick={onToggleComplete}
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
