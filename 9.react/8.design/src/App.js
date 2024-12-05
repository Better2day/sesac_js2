import { Container, Row, Col, Button, Badge, Alert } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    return (
        <Container className='mt-5'>
            <Row>
                <Col>
                    <Alert variant='info' className='text-center'>
                        <h1>React with Bootstrap</h1>
                    </Alert>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Badge bg="primary me-1">Primary</Badge>
                    <Badge bg="secondary me-1">Secondary</Badge>
                    <Badge bg="success me-1">Success</Badge>
                    <Badge bg="danger me-1">Danger</Badge>
                </Col>
            </Row>
        </Container>
    );
};

export default App;
