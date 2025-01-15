# Code Style Guide

This document outlines the coding style and best practices for the Habit Tracker App project.

## General Guidelines

- Use 2 spaces for indentation.
- Prefer single quotes for strings.
- No semicolons at the end of statements.
- Use `const` and `let` instead of `var`.
- Write descriptive variable and function names.
- Keep functions small and focused on a single task.
- Use arrow functions for anonymous functions.

## TypeScript

### Variables

```typescript
const habitName: string = "Run"
let startDate: Date = new Date()
```

### Functions

```typescript
interface Habit {
  name: string
  startDate: Date
  completed: boolean
}

const createHabit = (name: string, startDate: Date): Habit => {
  return {
    name,
    startDate,
    completed: false,
  }
}
```

### Conditionals

```typescript
if (habit.completed) {
  console.log("Habit completed")
} else {
  console.log("Habit not completed")
}
```

### Loops

```typescript
const habits: string[] = ["Run", "Workout", "Meditate"]

habits.forEach((habit) => {
  console.log(habit)
})
```

## React Components

### Functional Components

```typescript
import React from "react"

interface HabitProps {
  name: string
  startDate: Date
}

const Habit: React.FC<HabitProps> = ({ name, startDate }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>Start Date: {startDate.toDateString()}</p>
    </div>
  )
}

export default Habit
```

### Styling with TailwindCSS

```typescript
interface ButtonProps {
  text: string
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
```

## Conclusion

Adhering to this code style guide will ensure consistency and readability across the Habit Tracker App project. Happy coding!
