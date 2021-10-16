import PropTypes from 'prop-types';
import s from './ContactList.module.css';

const Contact = ({ name, number, onClick }) => (
  <li className={s.item}>
    <p>
      {name}: {number}
    </p>
    <button type="button" className={s.button} onClick={onClick}>
      Delete
    </button>
  </li>
);
Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Contact;
