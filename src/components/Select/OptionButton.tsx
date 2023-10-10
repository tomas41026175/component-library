import { OptionButtonProps } from "./types";
import styles from "./index.module.css";

function OptionButton({ option, selectOption }: OptionButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectOption(option);
  };

  return (
    <button
      key={option.value}
      onClick={(e) => handleClick(e)}
      className={styles["option-badge"]}
    >
      {option.label}
      <span className={styles["remove-btn"]}>&times;</span>
    </button>
  );
}

export default OptionButton;
