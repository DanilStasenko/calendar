const generateLessons = (userId) => {
  const lessons = [];
  const lessonNames = ['Ментальная Арифметика', 'Программирование', 'Скорочтение'];
  const students = ['Белкина Инна', 'Животновская Оксана', 'Мин Елена'];

  const generateDates = (month, year) => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const day = Math.floor(Math.random() * 30) + 1;
      const hour = Math.floor(Math.random() * 12) + 9;
      const minute = Math.random() < 0.5 ? 0 : 30;

      const date = new Date(year, month - 1, day, hour, minute);
      dates.push(date);
    }
    return dates;
  };

  const juneDates = generateDates(6, 2024);
  const julyDates = generateDates(7, 2024);
  const allDates = [...juneDates, ...julyDates];

  const lessonCountPerDay = {};

  allDates.forEach((date) => {
    const dateString = date.toISOString().split('T')[0];
    if (!lessonCountPerDay[dateString]) {
      lessonCountPerDay[dateString] = [];
    }

    const lessonTimes = lessonCountPerDay[dateString].map((d) => d.getHours());

    const canAddLesson = lessonTimes.every((hour) => Math.abs(hour - date.getHours()) >= 1);

    if (lessonCountPerDay[dateString].length < 2 && canAddLesson) {
      const lesson = {
        name: lessonNames[Math.floor(Math.random() * lessonNames.length)],
        date: date.toISOString(),
        paid: Math.random() >= 0.2,
        student: students[Math.floor(Math.random() * students.length)],
        canceled: Math.random() >= 0.8,
        userId: userId,
      };
      lessons.push(lesson);
      lessonCountPerDay[dateString].push(date);
    }
  });

  return lessons;
};

module.exports = generateLessons;
