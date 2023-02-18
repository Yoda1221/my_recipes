import axios    from '../../api/axios'
import useAuth  from '../../hooks/useAuth'
import { useEffect, useState }  from "react"
import { Link, useNavigate, useLocation }   from "react-router-dom"
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
//import AuthContext from '../../context/AuthProvider'
//import useLocalStorage from '../../hooks/useLocalStorage'

const LOGINURL = '/login';
const initialState = {
  email: '', 
  password: ''
}

const Login = () => {
  const {setAuth/* , persist, setPersist */} = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const from      = location.state?.from?.pathname || "/"
  const [error, setError]         = useState('')
  const [formDatas, setFormDatas] = useState(initialState)
  //const [formDatas, setFormDatas] = useLocalStorage('loginData', initialState)
  
  const canSave = [...Object.values(formDatas)].every(Boolean)
  const togglePersist = () => { setPersist(prev => !prev) }
  const handleChange = (e) => {
    setFormDatas((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('FORMDATAS ', formDatas)
    try {
      const response = await axios.post(LOGINURL, 
        JSON.stringify(formDatas), {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: true
        }
      )
      console.log('RE ', response)
      const role        = response?.data?.role
      const accessToken = response?.data?.accessToken
      setAuth({email: formDatas.email, role, accessToken})
      setFormDatas(initialState)
      navigate(from, { replace: true })
    } catch (error) {
      console.log("🚀 ~ file: Login.jsx ~ line 58 ~ handleSubmit ~ ERROR", error)
      if (!error?.response) setError('NO SERVER RESPONSE')
      else if (error?.response.status === 400 ) setError(error.response.data.message)
      else if (error?.response.status === 401 ) setError(error.response.data.message)
      else setError('LOGIN FAILED')
    } 
  }

  /* useEffect(() => {
    localStorage.setItem("persist", persist)
  }, [persist]) */

  useEffect(() => {
    setError('')
  }, [formDatas])

  return (
    <Container className="mt-5">
      { error && <Alert variant='warning' className="text-center" >{ error }</Alert> }
      <Form onSubmit={ handleSubmit }>
        <h2>Login page</h2>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>e-Mail addresse</Form.Label>
          <Form.Control 
            size="sm" 
            type="email" 
            name="email"
            /* ref={emailRef} */
            /* value={formDatas.email} */
            autoComplete="off"
            onChange={handleChange}
            placeholder="pl: anakin@skywalker.com" 
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            size="sm" 
            type="password" 
            name="password" 
            onChange={handleChange}
            required
          />
        </Form.Group>
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
              <Link to="/register">Go to registration</Link> {/* /users/new */}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button 
              type="button" 
              variant="warning" 
              className="rounded-pill mt-3 px-4"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </Col>
          <Col className='d-flex justify-content-md-end'>
            <Button 
              type="submit" 
              variant="info" 
              className="rounded-pill mt-3 px-4"
              disabled={!canSave}
            >
              Log in
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default Login
