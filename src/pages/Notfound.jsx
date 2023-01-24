//import notf404 from "../assets/a_404.png"
import { Container, Col, Row } from "react-bootstrap"

const Notfound = () => {
  return (
    <Container className="notfund">
        <Row>
            <Col md={ 6 } className="left404">
                <h2 className="nfh2">Oops!</h2>
                <h4>We couldn't find that page!</h4>
                <p>Maybe you can find what you need here?</p>
                <a className="nflink" href="/">Go to Home</a>
            </Col>
            <Col md={ 6 } >
                {/* <img src={ notf404 } alt="Not found 404" /> */}
            </Col>
        </Row>
    </Container>
  )
}

export default Notfound
