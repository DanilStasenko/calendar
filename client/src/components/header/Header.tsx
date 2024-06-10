import { useState } from "react"

import { useAppSelector } from "../../app/hooks"
import { selectUser } from "../../app/features/auth/authSlice"

import { Popover } from "antd"
import PopoverContent from "../popoverContent/PopoverContent"

import chat from "../../assets/chat.png"
import avatar from "../../assets/avatar.png"

import styles from "./Header.module.scss"

type Props = {
  hasGreetings: boolean
}

const Header: React.FC<Props> = ({ hasGreetings }) => {
  const user = useAppSelector(selectUser)

  const [popoverVisible, setPopoverVisible] = useState(false)

  const handleVisibleChange = (visible: boolean) => {
    setPopoverVisible(visible)
  }

  const handleClose = () => {
    setPopoverVisible(false)
  }

  return (
    <header className={styles.header}>
      {hasGreetings ? (
        <p>
          Добро пожаловать, <span>{user?.name}!</span>
        </p>
      ) : (
        <div></div>
      )}
      <div>
        <img src={chat} alt="chat" />
        <div className={styles.avatar}>
          <img src={avatar} alt="avatar" />
          <Popover
            content={<PopoverContent onClose={handleClose} name={user?.name} />}
            trigger="click"
            placement="bottomRight"
            open={popoverVisible}
            onOpenChange={handleVisibleChange}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 10L12 14L16 10"
                stroke="#7362BC"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Popover>
        </div>
      </div>
    </header>
  )
}

export default Header
