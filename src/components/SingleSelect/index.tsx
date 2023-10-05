import React, { useEffect, useState, useRef } from "react";
import styles from "./index.module.css";
import type {
  SelectOption,
  SelectProps,
  OptionButtonProps,
  OptionItemProps,
} from "./types";

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

function Select({ multiple, options, value, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hightLightIndex, setHightLightIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearOption = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const isOptionSelected = (option: SelectOption) => {
    return multiple ? value.includes(option) : option === value;
  };

  const selectOption = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((v) => v !== option));
      } else {
        onChange([...value, option]);
      }
    } else if (option !== value && !multiple) onChange(option);
  };

  const renderMultipleValue = (value: SelectOption[]) =>
    value.map((v) => (
      <OptionButton key={v.value} option={v} selectOption={selectOption} />
    ));

  const renderSingleValue = (value: SelectOption) => value?.label;

  useEffect(() => {
    if (isOpen) setHightLightIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const currentRef = containerRef.current;

    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[hightLightIndex]);
          break;

        case "ArrowUp":
        case "ArrowDown":
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = hightLightIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHightLightIndex(newValue);
          }
          break;

        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    currentRef?.addEventListener("keydown", handler);

    return () => {
      currentRef?.removeEventListener("keydown", handler);
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isOpen, hightLightIndex, options]);

  return (
    <>
      <div
        ref={containerRef}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
        className={styles.container}
      >
        <span className={styles.value}>
          {multiple
            ? renderMultipleValue(value)
            : value
            ? renderSingleValue(value)
            : ""}
        </span>

        <button
          type="button"
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

        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
          {options?.map((option, index) => (
            <OptionItem
              key={index + 1}
              option={option}
              index={index}
              hightLightIndex={hightLightIndex}
              isOptionSelected={isOptionSelected}
              selectOption={selectOption}
              setIsOpen={setIsOpen}
              setHightLightIndex={setHightLightIndex}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default Select;
