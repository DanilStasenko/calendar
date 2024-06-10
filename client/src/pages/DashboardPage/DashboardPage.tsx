import { useGetAllLessonsQuery } from "../../app/services/lessonApi"
import type { Lesson } from "../../app/types"

import Loading from "../../components/loading/Loading"
import Balance from "../../components/balance/Balance"
import UpcomingLessons from "../../components/upcomingLessons/UpcomingLessons"
import NextLesson from "../../components/nextLesson/NextLesson"

import promo from "../../assets/promo.png"
import homework from "../../assets/homework.png"
import report from "../../assets/report.png"

import {
  formatLessonDate,
  formatTime,
  getTimeUntilNextLesson,
} from "../../utils/dashboard"

import styles from "./DashboardPage.module.scss"

const DashboardPage = () => {
  const { data, isLoading } = useGetAllLessonsQuery()

  if (isLoading) {
    return <Loading size="large" />
  }

  if (!data || !Array.isArray(data)) {
    return <div>Данные не загружены</div>
  }

  const getLessonCounts = (lessons: Lesson[]) => {
    const lessonCounts: { [key: string]: number } = {}
    lessons.forEach(lesson => {
      if (lessonCounts[lesson.name]) {
        lessonCounts[lesson.name]++
      } else {
        lessonCounts[lesson.name] = 1
      }
    })
    return lessonCounts
  }

  const now = new Date()

  const lessons = data
    .filter(lesson => !lesson.canceled && new Date(lesson.date) > now)
    .map(lesson => ({
      ...lesson,
      ...formatLessonDate(lesson.date),
      time: `${formatTime(new Date(lesson.date))}-${formatTime(new Date(new Date(lesson.date).getTime() + 60 * 60 * 1000))}`,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const lessonCounts = getLessonCounts(lessons)
  const lessonNames = Object.keys(lessonCounts)

  const latestLessons = lessons.slice(0, 3).map(lesson => ({
    ...lesson,
    formattedDate: new Date(lesson.date).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  }))

  const nextLesson = lessons[0]
  const timeUntilNextLesson = nextLesson
    ? getTimeUntilNextLesson(nextLesson.date)
    : { days: 0, hours: 0, minutes: 0 }

  return (
    <div className={styles.container}>
      <div className={styles.promo}>
        <h2>До 31 декабря любой курс со скидкой 20%</h2>
        <p>
          До конца года у вас есть уникальная возможность воспользоваться нашей
          новогодней скидкой 20% на любой курс!
        </p>
        <img src={promo} alt="promo" />
      </div>

      <NextLesson
        days={timeUntilNextLesson.days}
        hours={timeUntilNextLesson.hours}
        minutes={timeUntilNextLesson.minutes}
      />

      <div className={styles.rightSmall}>
        <div className={styles.homework}>
          <p>Домашние задания</p>
          <img src={homework} alt="homework" />
        </div>
        <div className={styles.report}>
          <p>Отчеты от учителей</p>
          <img src={report} alt="report" />
        </div>
      </div>

      <Balance
        isLoading={isLoading}
        lessonNames={lessonNames}
        lessonCounts={lessonCounts}
      />

      <UpcomingLessons latestLessons={latestLessons} />
    </div>
  )
}

export default DashboardPage
