import React from "react"
import { Meta, Story } from "@storybook/react"
import HabitCalendar from "./HabitCalendar"

export default {
  title: "Components/HabitCalendar",
  component: HabitCalendar,
} as Meta

const Template: Story = (args) => <HabitCalendar {...args} />

export const Default = Template.bind({})
Default.args = {
  habits: [
    {
      id: 1,
      name: "Run",
      color: "Standard",
      startDate: "2023-01-01",
      frequency: 3,
      weekStart: "Sunday",
      reminders: 0,
    },
    {
      id: 2,
      name: "Meditate",
      color: "Soft",
      startDate: "2023-01-01",
      frequency: 5,
      weekStart: "Monday",
      reminders: 1,
    },
  ],
  view: "monthly", // daily, monthly, yearly
}
