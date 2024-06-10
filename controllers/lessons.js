const { prisma } = require('../prisma/prisma-client');

/**
 * @route GET api/lessons
 * @desc Get lessons for the current user
 * @access Private
 */
const getLessonsForUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const lessons = await prisma.lesson.findMany({
      where: {
        userId: userId,
      },
    });

    res.status(200).json(lessons);
  } catch (error) {
    console.error('Ошибка при получении занятий: ', error);
    res.status(500).json({ message: 'Не удалось получить занятия' });
  }
};

module.exports = {
  getLessonsForUser,
};
