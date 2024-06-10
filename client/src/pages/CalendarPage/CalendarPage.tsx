import { useState } from "react"

import { useGetAllLessonsQuery } from "../../app/services/lessonApi"
import type { Lesson } from "../../app/types"

import { Select } from "antd"
import Button from "../../components/ui/button"
import CalendarEvent from "../../components/calendarEvent/CalendarEvent"
import Loading from "../../components/loading/Loading"

import { dayNames, getMonthDays, monthNames } from "../../utils/calendar"

import styles from "./CalendarPage.module.scss"

const { Option } = Select

const CalendarPage: React.FC = () => {
  const { data: lessons, isLoading } = useGetAllLessonsQuery() as {
    data: Lesson[] | undefined
    isLoading: boolean
  }

  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth(),
  )
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  )
  const [filterValue, setFilterValue] = useState<string | null>(null)

  const monthDays = getMonthDays(currentMonth, currentYear)

  const uniqueLessonNames = Array.from(
    new Set((lessons || []).map((lesson: Lesson) => lesson.name)),
  )

  const getLessonsForDay = (day: Date | null): Lesson[] => {
    if (!day || !lessons) return []
    const dayOfMonth = day.getDate()
    const month = day.getMonth()
    const year = day.getFullYear()
    const lessonsArray = lessons as unknown as Lesson[]
    const lessonsForDay = lessonsArray.filter(lesson => {
      const lessonDate = new Date(lesson.date)
      return (
        lessonDate.getDate() === dayOfMonth &&
        lessonDate.getMonth() === month &&
        lessonDate.getFullYear() === year &&
        (!filterValue || lesson.name === filterValue)
      )
    })
    return lessonsForDay
  }

  const nextMonth = (): void => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const prevMonth = (): void => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleFilterChange = (value: string | null) => {
    setFilterValue(value)
  }

  if (isLoading) {
    return <Loading size="large" />
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.calendar__topHeader}>
        <Select
          placeholder="Выбрать предмет"
          onChange={handleFilterChange}
          allowClear
          className={styles.calendar__topHeader__select}
        >
          {uniqueLessonNames.map((name: string) => (
            <Option key={name} value={name}>
              {name}
            </Option>
          ))}
        </Select>
        <Button size="M" extraClass={styles.calendar__topHeader__btn}>
          Изменить расписание
        </Button>
      </div>
      <div className={styles.calendar__header}>
        <div className={styles.calendar__pagination}>
          <button
            onClick={prevMonth}
            className={`${styles.calendar__arrowBtn} ${styles.calendar__arrowBtn_left}`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12L19 12"
                stroke="#79747F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 7L5 12"
                stroke="#79747F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 17L5 12"
                stroke="#79747F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <p>
            {monthNames[currentMonth]} {currentYear}
          </p>
          <button
            onClick={nextMonth}
            className={`${styles.calendar__arrowBtn} ${styles.calendar__arrowBtn_right}`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12L5 12"
                stroke="#79747F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 17L19 12"
                stroke="#79747F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 7L19 12"
                stroke="#79747F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className={styles.calendar__interactive}>
          <div className={styles.calendar__interactive__tag}>
            <span>Сегодня</span>
          </div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12.0002"
              cy="11.9997"
              r="9.00375"
              stroke="#7362BC"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 12.7114L13.3276 11.9738C13.9901 11.6058 14.401 10.9075 14.401 10.1496C14.3225 8.88929 13.2417 7.92852 11.9808 7.99833C10.8543 7.95156 9.85385 8.71311 9.599 9.81149"
              stroke="#7362BC"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.1002 15.9017C12.1001 15.957 12.0553 16.0017 12.0001 16.0016C11.9449 16.0016 11.9001 15.9569 11.9001 15.9016C11.9001 15.8464 11.9448 15.8016 12 15.8016C12.0266 15.8015 12.0521 15.8121 12.0709 15.8309C12.0897 15.8497 12.1002 15.8752 12.1002 15.9017"
              stroke="#7362BC"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className={styles.calendar__grid}>
        {dayNames.map(dayName => (
          <div key={dayName} className={styles.calendar__dayHeader}>
            <span>{dayName}</span>
          </div>
        ))}
        {monthDays.map((day, index) => (
          <div key={index} className={styles.calendar__day}>
            <div className={styles.calendar__date}>
              <span>{day ? day.getDate() : ""}</span>
            </div>
            <ul className={styles.calendar__lessons}>
              {day &&
                getLessonsForDay(day).map(lesson => (
                  <CalendarEvent lesson={lesson} key={lesson.id} />
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CalendarPage
