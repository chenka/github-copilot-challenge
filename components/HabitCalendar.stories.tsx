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
      name: "Run",
      color: "Standard",
      startDate: new Date(),
      frequency: 3,
      weekStart: "Sunday",
      reminders: 0,
    },
    {
      name: "Meditate",
      color: "Soft",
      startDate: new Date(),
      frequency: 5,
      weekStart: "Monday",
      reminders: 1,
    },
  ],
  view: "monthly", // daily, monthly, yearly
}
