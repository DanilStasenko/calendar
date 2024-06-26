import Button from "../ui/button"

import styles from "./UpcomingLessons.module.scss"

const UpcomingLessons = ({ latestLessons }: { latestLessons: any[] }) => {
  return (
    <div className={styles.upcoming}>
      <div>
        <h2>Ближайшие уроки</h2>
        <ul>
          {latestLessons.map(item => (
            <li className={styles.upcoming__item} key={item.date}>
              <div className={styles.upcoming__date}>
                <p className={styles.upcoming__day}>{item.day}</p>
                <p className={styles.upcoming__month}>{item.month}</p>
              </div>
              <p className={styles.upcoming__name}>{item.name}</p>
              <p className={styles.upcoming__time}>{item.time}</p>
              <p className={styles.upcoming__student}>
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 12.3893C5.046 11.3726 6.46133 10.7473 8.01533 10.7473C9.554 10.7473 10.954 11.36 12 12.358C10.954 13.3746 9.53867 14 7.98467 14C6.446 14 5.046 13.3873 4 12.3893Z"
                    stroke="#79747F"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.65 10.6833C2.24333 9.874 2 8.968 2 8C2 4.684 4.684 2 8 2C11.316 2 14 4.684 14 8C14 8.96667 13.758 9.87333 13.3487 10.682"
                    stroke="#79747F"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.41421 5.25247C10.1953 6.03352 10.1953 7.29985 9.41421 8.0809C8.63316 8.86195 7.36683 8.86195 6.58579 8.0809C5.80474 7.29985 5.80474 6.03352 6.58579 5.25247C7.36683 4.47143 8.63316 4.47143 9.41421 5.25247"
                    stroke="#79747F"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{item.student}</span>
              </p>
              <div className={styles.upcoming__btns}>
                <Button extraClass={styles.upcoming__btn_white} size="S">
                  Button
                </Button>
                <Button extraClass={styles.upcoming__btn_purple} size="S">
                  Button
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Button size="M" extraClass={styles.upcoming__mainBtn}>
        Button
      </Button>
    </div>
  )
}

export default UpcomingLessons
