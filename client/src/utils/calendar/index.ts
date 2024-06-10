import type { Lesson } from "../../app/types"

export const monthNames = [
  "Январь",
  "Февраль",
  "март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
]

export const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

export const getMonthDays = (month: number, year: number): (Date | null)[] => {
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  const days: (Date | null)[] = []
  let startDay = firstDayOfMonth.getDay()
  if (startDay === 0) startDay = 7
  for (let i = 1; i < startDay; i++) {
    days.push(null)
  }
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    days.push(new Date(year, month, day))
  }
  return days
}

export const formatLessonsTime = (lesson: Lesson): string => {
  const lessonDate = new Date(lesson.date)
  const endTime = new Date(lessonDate.getTime() + 45 * 60000)

  const startTimeString = `${lessonDate.getHours().toString().padStart(2, "0")}:${lessonDate.getMinutes().toString().padStart(2, "0")}`
  const endTimeString = `${endTime.getHours().toString().padStart(2, "0")}:${endTime.getMinutes().toString().padStart(2, "0")}`

  return `${startTimeString}-${endTimeString}`
}
