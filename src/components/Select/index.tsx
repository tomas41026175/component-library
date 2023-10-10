import React, { useState } from "react";
import styles from "./index.module.css";

type SelectOptions = {
  label: string;
  value: string | any;
};

type SelectProps = {
  options: SelectOptions[];
  value?: SelectOptions;
  onChange?: (value: SelectOptions | undefined) => void;
};

function Select({ options, value, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(value);

  const isOptionSame = (option: SelectOptions) => {
    return value?.value === option.value;
  };

  const clearOption = () => {
    onChange?.(undefined);
  };

  const selectOption = (option: SelectOptions) => {
    onChange?.(option);
  };

  return (
    <>
      <div
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
        className={styles.container}
      >
        <span className={styles.value}>{value?.label}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearOption();
          }}
          className={styles["clear-btn"]}
        >
          &times;
        </button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        {/* ${styles.show} */}
        <ul className={`${styles.options}`}>
          {options?.map((option) => (
            <li
              key={option.value}
              className={`${styles.option} ${
                isOptionSame(option) ? styles.selected : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Select;
