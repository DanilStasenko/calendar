import { Spin } from "antd"
import Button from "../ui/button"

import styles from "./Balance.module.scss"

type LessonCounts = {
  [key: string]: number
}

type Props = {
  isLoading: boolean
  lessonNames: string[]
  lessonCounts: LessonCounts
}

const Balance: React.FC<Props> = ({ isLoading, lessonNames, lessonCounts }) => {
  return (
    <div className={styles.balance}>
      <div>
        <h2>Баланс занятий</h2>
        <ul>
          {isLoading ? (
            <Spin></Spin>
          ) : (
            lessonNames.map(name => (
              <li key={name} className={styles.balance__item}>
                <span>{name}</span>
                <div className={styles.balance__count}>
                  {lessonCounts[name]}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <Button extraClass={styles.balance__btn} size="M">
        Button
      </Button>
    </div>
  )
}

export default Balance
