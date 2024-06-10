import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { logout } from "../../app/features/auth/authSlice"

import avatarGirl from "../../assets/avatar_girl.png"
import avatar from "../../assets/avatar.png"

import styles from "./PopoverContent.module.scss"

type Props = {
  name?: string
  onClose: () => void
}

const PopoverContent: React.FC<Props> = ({ onClose, name }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onLogoutClick = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }

  return (
    <div className={styles.container}>
      <svg
        className={styles.close}
        onClick={onClose}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 8L16 16"
          stroke="#7362BC"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 8L8 16"
          stroke="#7362BC"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className={styles.title}>Смена пользователя</p>
      <ul>
        <li>
          <div className={`${styles.user} ${styles.active}`}>
            <img src={avatar} alt="avatar" width={32} height={32} />
            <div>
              <p className={styles.name}>{name}</p>
              <p className={styles.you}>Это вы</p>
            </div>
          </div>
        </li>
        <li>
          <div className={`${styles.user} `}>
            <img src={avatarGirl} alt="avatar" width={32} height={32} />
            <div>
              <p className={styles.name}>Анна</p>
            </div>
          </div>
        </li>
      </ul>
      <div className={styles.divider}></div>
      <button className={styles.exit} onClick={onLogoutClick}>
        <p>Выход</p>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.4445 8.44253L20.0019 12L16.4445 15.5575"
            stroke="#008AFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.33191 12L20.0034 12"
            stroke="#008AFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.55432 3.99666C5.58958 3.99666 3.99684 5.5894 3.99684 7.55414L3.99684 16.4458C3.99684 18.4106 5.58958 20.0033 7.55432 20.0033"
            stroke="#008AFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}

export default PopoverContent
