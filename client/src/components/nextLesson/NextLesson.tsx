import { Link } from "react-router-dom"

import Button from "../ui/button"

import styles from "./NextLesson.module.scss"

type Props = {
  days: number
  hours: number
  minutes: number
}

const NextLesson: React.FC<Props> = ({ days, hours, minutes }) => {
  return (
    <div className={styles.nextLesson}>
      <p>Следующее занятие начнется через:</p>
      <div className={styles.nextLesson__time}>
        <div>
          <span className={styles.nextLesson__value}>{days}</span>
          <span className={styles.nextLesson__desc}>д</span>
        </div>
        <div>
          <span className={styles.nextLesson__value}>{hours}</span>
          <span className={styles.nextLesson__desc}>ч</span>
        </div>
        <div>
          <span className={styles.nextLesson__value}>{minutes}</span>
          <span className={styles.nextLesson__desc}>мин</span>
        </div>
      </div>
      <Link to={"/calendar"} className={styles.nextLesson__link}>
        <Button extraClass={styles.nextLesson__button}>Button</Button>
      </Link>
    </div>
  )
}

export default NextLesson
