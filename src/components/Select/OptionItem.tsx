import { OptionItemProps } from "./types";
import styles from "./index.module.css";

function OptionItem({
    option,
    index,
    hightLightIndex,
    isOptionSelected,
    selectOption,
    setIsOpen,
    setHightLightIndex,
  }: OptionItemProps) {
    const className = `
    ${styles.option}
    ${isOptionSelected(option) ? styles.selected : ""}
    ${index === hightLightIndex ? styles.highlighted : ""}
  `;
  
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      selectOption(option);
      setIsOpen(false);
    };
  
    const handleMouseEnter = () => {
      setHightLightIndex(index);
    };
  
    return (
      <li
        key={option.value}
        className={className}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
      >
        {option.label}
      </li>
    );
  }

  export default OptionItem;