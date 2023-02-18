import axios    from '../../api/axios'
import { useEffect, useState }      from "react"
import { Link, useNavigate, useLocation }   from "react-router-dom"
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { FormInputBS } from '../../components'
import { COUNTRIES } from '../../config'


const REGURL = '/register';
const initialState = {
    username: '',
    email: '', 
    password: '',
    passwd2: "",
    country: ''
}

const Register = () => {
    const navigate  = useNavigate()
    const location  = useLocation()
    const [error, setError]         = useState('')
    const [isEqual, setIsEqual]     = useState(false)
    const [formDatas, setFormDatas] = useState(initialState)

    const canSave = [...Object.values(formDatas)].every(Boolean)
    const handleChange = (e) => {
        setFormDatas((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        console.log('FORMDATAS ', formDatas)
        try {
            const response = await axios.post(REGURL, 
                JSON.stringify(formDatas), {
                  headers: { 'Content-Type': 'application/json'},
                  withCredentials: true
                }
            )
            console.log('RE ', response)
            setFormDatas(initialState)
            //navigate(from, { replace: true })
        } catch (error) {
            if (!err?.response) setError('No Server Response')
            else if (err.response?.status === 409) setError('Username Taken');
            else setError('Registration Failed')
            
        }
    }

    useEffect(() => {
        formDatas.password === formDatas.passwd2 ? setIsEqual(true) : setIsEqual(false)
        console.log("FD ", formDatas)
        console.log("EQUAL ", isEqual)
        //  TODO CHECK THE PASSWORD AND THE PASWD2 IS EQUAL
    }, [formDatas])  //  password, passwd2

    useEffect(() => {
        setError('')
    }, [formDatas])  //  username, password
    

    return (
        <Container className="m-5">
        { error && <Alert variant='warning' className="text-center" >{ error }</Alert> }
        <Form onSubmit={ handleSubmit }>
            <h2>Registration page</h2>
            <Row>
                <Col md={8}>
                    <FormInputBS 
                        size="sm" 
                        type="text" 
                        name="username" 
                        style="mb-3" 
                        labelName="Username" 
                        placeholder="pl. Anakin" 
                        handleChange={handleChange} 
                    />
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="recipeTemperature">
                        <Form.Label>Melyik országban élsz?</Form.Label>
                        <Form.Select 
                            size='sm' 
                            name="country"
                            onChange={handleChange}
                            required
                        >
                            <option value="" > -- Select one - </option>
                            { Object.keys(COUNTRIES).map((key, index) => (
                                <option key={ index } value={ key } >
                                    { COUNTRIES[key] }
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            
            <FormInputBS 
                size="sm" 
                type="email" 
                name="email" 
                style="mb-3" 
                labelName="e-Mail addresse" 
                placeholder="pl. anakin@power.com" 
                handleChange={handleChange} 
            />
            <FormInputBS 
                size="sm" 
                type="password" 
                name="password" 
                style="mb-3" 
                labelName="Password" 
                handleChange={handleChange} 
            />
            <FormInputBS 
                size="sm" 
                type="password" 
                name="passwd2" 
                style={`mb-3 ${(isEqual ? "text-success" : "text-warning")} `} 
                labelName="Password again" 
                handleChange={handleChange} 
            />
            {/* <Form.Check 
                id="persist"
                type="checkbox"
                label="Trust this device"
                checked={persist}
                onChange={togglePersist}
            /> */}
            <Row className='mt-3'>
                <Col>
                    <div>I'm don't have account, I would like registration!&nbsp;
                        <Link to="/login">Go to login</Link> {/* /users/new */}
                    </div>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col>
                    <Button 
                    type="button" 
                    variant="warning" 
                    className="rounded-pill px-4"
                    onClick={() => navigate(-1)}
                    >
                        Cancel
                    </Button>
                </Col>
                <Col className='d-flex justify-content-md-end'>
                    <Button 
                        type="submit" 
                        variant="info" 
                        className="rounded-pill px-4"
                        disabled={!canSave}
                    >
                        Registration
                    </Button>
                </Col>
            </Row>
        </Form>
        </Container>
    )
}

export default Register
