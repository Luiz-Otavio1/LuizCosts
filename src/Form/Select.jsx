import React from "react";

import styles from "./Select.module.css";

const Select = ({ text, name, options, handleOnChange, value }) => {
  return (
    <section className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select
        required
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value}
      >
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
          <option required value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </section>
  );
};

export default Select;
