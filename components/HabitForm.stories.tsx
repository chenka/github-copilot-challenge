import React from "react"
import { Meta, Story } from "@storybook/react"
import HabitForm, { HabitFormProps } from "./HabitForm"

export default {
  title: "Components/HabitForm",
  component: HabitForm,
} as Meta

const Template: Story<HabitFormProps> = (args) => <HabitForm {...args} />

export const Default = Template.bind({})
Default.args = {
  habitName: "",
  template: "Run",
  startDate: new Date(),
  weeklyFrequency: 3,
  calendarWeekStart: "Sunday",
  reminders: 0,
  habitColor: "Standard",
}

export const WithValues = Template.bind({})
WithValues.args = {
  habitName: "Morning Run",
  template: "Run",
  startDate: new Date("2023-01-01"),
  weeklyFrequency: 5,
  calendarWeekStart: "Monday",
  reminders: 2,
  habitColor: "Bright",
}
