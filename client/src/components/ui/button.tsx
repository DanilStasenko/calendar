import styles from "./button.module.scss"

type Props = {
  children: React.ReactNode
  size?: "S" | "M" | "L"
  color?: "blue" | "purple" | "dark-puprle"
  type?: "button" | "submit" | "reset"
  extraClass?: string
}

const Button: React.FC<Props> = ({
  children,
  extraClass,
  color = "purple",
  type = "button",
  size = "M",
}) => {
  return (
    <button
      type={type}
      className={`
        ${styles.button} 
        ${size === "S" ? styles.sizeS : size === "M" ? styles.sizeM : styles.sizeL} 
        ${color === "blue" ? styles.blue : color === "purple" ? styles.purple : styles.dark_purple} ${extraClass}
      `}
    >
      {children}
    </button>
  )
}

export default Button
