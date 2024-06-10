export type User = {
  id: string
  email: string
  password: string
  name: string
  lessons: Lesson[]
}

export type Lesson = {
  id: string
  name: string
  date: Date
  paid: boolean
  student: string
  canceled: boolean
  user?: User
  userId?: string
}
