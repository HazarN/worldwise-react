// React Libs
import { useNavigate } from 'react-router-dom';

// Components
import Button from './Button';

function BackButton() {
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault(); // for the buttons inside a form to prevent submitting
    navigate(-1);
  }

  return (
    <Button type={'back'} onClick={handleClick}>
      &larr; Back
    </Button>
  );
}

export default BackButton;
