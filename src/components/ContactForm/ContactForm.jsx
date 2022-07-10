import PropTypes from 'prop-types';
import style from './contactForm.module.css';
import { nanoid } from 'nanoid';
import { useState } from 'react';

function ContactForm({ onSubmit }) {
  const [state, setState] = useState({ name: '', number: '' });
  const { name, number } = state;
  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ name: '', number: '' });
  };

  return (
    <div className={style.formWrapper}>
      <form onSubmit={handleSubmit}>
        <label className={style.label}>
          Name
          <input
            className={style.input}
            type="name"
            name="name"
            value={name}
            onChange={handleChange}
            id={nameInputId}
          />
        </label>
        <label className={style.label}>
          Number
          <input
            className={style.input}
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            id={numberInputId}
          />
        </label>
        <button className={style.btn} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
