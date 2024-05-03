import css from './GoBackLink.module.css';
import { IoArrowBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default function GoBackLink({ pathBackTo }) {
  return (
    <Link to={pathBackTo} className={css.goBackLink}>
      <IoArrowBack />
      Go back
    </Link>
  );
}
