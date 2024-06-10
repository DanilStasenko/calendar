import { useEffect, useState } from "react"

import type { Lesson } from "../../app/types"

import { formatLessonsTime } from "../../utils/calendar"

import styles from "./CalendarEvent.module.scss"

type Props = {
  lesson: Lesson
}

const CalendarEvent: React.FC<Props> = ({ lesson }) => {
  const [isFuture, setIsFuture] = useState(false)

  useEffect(() => {
    const lessonDate = new Date(lesson.date)
    const now = new Date()
    setIsFuture(lessonDate > now)
  }, [lesson.date])

  return (
    <li
      className={`${styles.lesson} ${isFuture ? styles.lesson__future : styles.lesson__past}`}
    >
      {lesson.paid && !lesson.canceled && (
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.lesson__wallet}
        >
          <g clipPath="url(#clip0_6996_696)">
            <path
              d="M2.59741 5.27647H13.2381C13.9747 5.27647 14.5714 5.87314 14.5714 6.6098V12.6665C14.5714 13.3998 13.9714 13.9998 13.2381 13.9998H3.90474C3.16808 13.9998 2.57141 13.4031 2.57141 12.6665V5.52714C2.57141 4.97247 2.91474 4.4758 3.43408 4.2798L10.3361 1.6738C10.7721 1.50914 11.2381 1.83114 11.2381 2.29714V5.2758"
              stroke="#E12828"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.2374 9.41664C11.0994 9.41731 10.9881 9.52931 10.9881 9.66731C10.9881 9.80531 11.1001 9.91731 11.2381 9.91664C11.3761 9.91664 11.4881 9.80464 11.4881 9.66664C11.4881 9.52864 11.3761 9.41664 11.2374 9.41664"
              stroke="#E12828"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_6996_696">
              <rect
                width="16"
                height="16"
                fill="white"
                transform="translate(0.571411)"
              />
            </clipPath>
          </defs>
        </svg>
      )}
      <p
        className={`${styles.lesson__time} ${lesson.canceled ? styles.lesson__canceled : ""}`}
      >
        {formatLessonsTime(lesson)}
      </p>
      <p
        className={`${styles.lesson__name} ${lesson.canceled ? styles.lesson__canceled : ""}`}
      >
        {lesson.name}
      </p>
    </li>
  )
}

export default CalendarEvent
