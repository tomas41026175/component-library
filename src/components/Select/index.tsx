import React, { useState } from 'react'
import styles from './index.module.css'

type SelectOptions = {
    label: string;
    value: string | any;
}

type SelectProps = {
    options: SelectOptions[];
    value?: SelectOptions;
    onChange?: (value: SelectOptions | undefined) => void;
}

function Select({ options, value, onChange }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false)

    return <>
        <div onBlur={() => setIsOpen(false)} onClick={() => setIsOpen(prev => !prev)} tabIndex={0} className={styles.container}>
            <span className={styles.value}>{value?.label}</span>
            <button className={styles["clear-btn"]}>&times;</button>
            <div className={styles.divider}></div>
            <div className={styles.caret}></div>
            <ul className={`${styles.options} ${styles.show}`}>
                {options?.map((option) => (
                    <li key={option.value} className={styles.option}>
                        {option.label}
                    </li>
                )
                )}
            </ul>
        </div>
    </>
}

export default Select