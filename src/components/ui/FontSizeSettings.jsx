import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  CardGroup,
  Col,
  Overlay,
  Popover,
  Row,
} from 'react-bootstrap';

const FONT_SIZE_OPTIONS = [
  { label: '축소', size: '14px' },
  { label: '기본', size: '17px' },
  { label: '확대', size: '20px' },
];

export default function FontSizeSettings() {
  const [fontSize, setFontSize] = useState('');
  const [selectedFontCard, setSelectedFontCard] = useState(1); // 기본 index는 2
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const saveFontSizeOption = (fontSize) => {
    localStorage.setItem('fontSize', fontSize);
  };

  const handleFontSizeSaved = (event) => {
    setFontSize(fontSize);
    saveFontSizeOption(fontSize);
    setShow(!show);
    setTarget(event.target);
  };

  const handleFontSizeClick = (index) => {
    setSelectedFontCard(index);
  };

  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      setFontSize(savedFontSize);
    }
  }, []);

  return (
    <div ref={ref}>
      <Button variant='Light' onClick={handleClick}>
        설정
      </Button>

      <Overlay
        show={show}
        target={target}
        placement='bottom'
        container={ref}
        containerPadding={20}
      >
        <Popover id='popover-contained'>
          <Popover.Header as='h3'>
            <Row className='d-flex justify-content-between'>
              <Col className='text-muted'>글자크기</Col>
              <Col
                className='text-end text-muted'
                onClick={handleFontSizeSaved}
              >
                저장
              </Col>
            </Row>
          </Popover.Header>
          <Popover.Body>
            <CardGroup>
              <Row>
                {FONT_SIZE_OPTIONS.map(({ label, size }, index) => (
                  <Col key={index}>
                    <Card
                      onClick={() => handleFontSizeClick(index)}
                      style={{
                        border: selectedFontCard === index && '2px solid red',
                        boxShadow: selectedFontCard === index && '0 0 3px red',
                      }}
                    >
                      <Card.Body
                        style={{
                          height: '86px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Card.Text style={{ fontSize: size }}>가 Aa</Card.Text>
                      </Card.Body>
                      <Card.Footer className='d-flex justify-content-center align-items-center p-3'>
                        <span className='text-muted'>{label}</span>
                        {/* <Row>
                          <Col variant='Light'>
                          </Col>
                        </Row> */}
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            </CardGroup>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}
