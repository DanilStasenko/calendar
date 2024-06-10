import { Spin } from "antd"

import styles from "./Loading.module.scss"

type Props = {
  size?: "small" | "large" | "default"
}

const Loading: React.FC<Props> = ({ size }) => {
  return (
    <div className={styles.loading}>
      <Spin size={size} />
    </div>
  )
}

export default Loading
