import PropTypes from 'prop-types';
import style from './contactList.module.css';

const ContactList = ({ contacts, removeContact }) => (
  <ul className={style.contactList}>
    {contacts.map(({ id, name, number }) => {
      return (
        <li className={style.item} key={id}>
          {name}: {number}
          <button className={style.btn} onClick={() => removeContact(id)}>
            Delete
          </button>
        </li>
      );
    })}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  removeContact: PropTypes.func.isRequired,
};

export default ContactList;
