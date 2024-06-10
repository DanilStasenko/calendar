import type { Lesson } from "@prisma/client"
import { api } from "./api"

export const lessonApi = api.injectEndpoints({
  endpoints: build => ({
    getAllLessons: build.query<Lesson, void>({
      query: () => ({
        url: "/lessons",
        method: "GET",
      }),
    }),
  }),
})

export const { useGetAllLessonsQuery, useLazyGetAllLessonsQuery } = lessonApi

export const {
  endpoints: { getAllLessons },
} = lessonApi
