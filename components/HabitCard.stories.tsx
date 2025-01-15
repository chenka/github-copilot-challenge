import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import HabitCard from "./HabitCard"

export default {
  title: "Components/HabitCard",
  component: HabitCard,
} as ComponentMeta<typeof HabitCard>

const Template: ComponentStory<typeof HabitCard> = (args) => (
  <HabitCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  day: 1,
  habitName: "Read",
  progress: 3,
  total: 7,
  color: "#bada55",
  isComplete: false,
  highlightDays: ["Mon", "Tue", "Wed"],
  timeFrame: "DAY(S)",
}

export const Complete = Template.bind({})
Complete.args = {
  day: 1,
  habitName: "Read",
  progress: 7,
  total: 7,
  color: "#bada55",
  isComplete: true,
  highlightDays: ["Mon", "Tue", "Wed"],
  timeFrame: "DAY(S)",
}
