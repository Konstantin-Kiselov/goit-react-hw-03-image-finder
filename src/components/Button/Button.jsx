import PropTypes from 'prop-types';
import s from './Button.module.css';

function Button({ handleClickBtn }) {
  return (
    <button className={s.button} onClick={handleClickBtn} type="button">
      Load more
    </button>
  );
}
Button.propTypes = {
  handleClickBtn: PropTypes.func.isRequired,
};

export default Button;
