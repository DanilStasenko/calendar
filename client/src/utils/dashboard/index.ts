const getMonthInGenitive = (month: string) => {
  const months: { [key: string]: string } = {
    январь: "января",
    февраль: "февраля",
    март: "марта",
    апрель: "апреля",
    май: "мая",
    июнь: "июня",
    июль: "июля",
    август: "августа",
    сентябрь: "сентября",
    октябрь: "октября",
    ноябрь: "ноября",
    декабрь: "декабря",
  }

  return months[month.toLowerCase()] || month
}

export const formatLessonDate = (date: string) => {
  const lessonDate = new Date(date)
  const day = lessonDate.getDate().toString()
  const month = lessonDate.toLocaleString("ru-RU", { month: "long" })
  const genitiveMonth = getMonthInGenitive(month)
  return { day, month: genitiveMonth }
}

export const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  return `${hours}:${minutes}`
}

export const getTimeUntilNextLesson = (nextLessonDate: string) => {
  const now = new Date()
  const diff = new Date(nextLessonDate).getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  return { days, hours, minutes }
}
