import React, { useEffect, useState, useRef } from "react";
import styles from "./index.module.css";
import OptionButton from "./OptionButton";
import OptionItem from "./OptionItem";
import type {
  SelectOption,
  SelectProps,
  OptionButtonProps,
  OptionItemProps,
} from "./types";

// compound component
// Select.OptionButton  = OptionButton
// Select.OptionItem  = OptionItem

function Select({ multiple, options, value, onChange }: SelectProps) {
  // check
  const [isOpen, setIsOpen] = useState(false);
  // current hightLightIndex
  const [hightLightIndex, setHightLightIndex] = useState(0);
  // ref container for add event listener
  const containerRef = useRef<HTMLDivElement>(null);

  const clearOption = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const isOptionSelected = (option: SelectOption) => {
    return multiple ? value.includes(option) : option === value;
  };
  // select option or cancel option
  const selectOption = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((v) => v !== option));
      } else {
        onChange([...value, option]);
      }
    } else if (option !== value && !multiple) onChange(option);
  };

  const renderMultipleValue = (values: SelectOption[]) =>
    values.map((value) => (
      <OptionButton
        key={value.value}
        option={value}
        selectOption={selectOption}
      />
    ));

  const renderSingleValue = (value: SelectOption) => value?.label;

  // reset hightLightIndex when select option
  useEffect(() => {
    if (isOpen) setHightLightIndex(0);
  }, [isOpen]);

  //add keyboard event listener
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
