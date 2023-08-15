import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../../styles/Styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function GoBackButton() {
  const navigate = useNavigate();
  return (
    <div style={{ margin: '15px 0' }}>
      <BackButton onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </BackButton>
    </div>
  );
}
