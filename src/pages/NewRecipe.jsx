import { useEffect, useState }      from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { COMPLEX, ImgConfig, TABLES, TEMP, TIME, TYPES }  from '../config'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useAddRecipeMutation, useUpdateRecipeMutation }  from '../api/apiSlice'
import { FormInputBS, FormTaBS } from '../components'

let initialState = {
  name: '', 
  type: '', 
  difficulty: '',
  completion: '', 
  ingredients: '',
  description: '', 
  temperature: '',
  completionTime: ''
}

const NewRecipe = () => {
  const location      = useLocation()  
  const navigate      = useNavigate()
  // const formData      = new FormData()
  const recipes       = JSON.parse(localStorage.getItem(TABLES.recipes))
  const [ id, setId ] = useState(location.state?.id != undefined ? location.state.id : null )
  console.log("🚀 → file: NewRecipe.jsx:24 → NewRecipe → id", id)
  const [ error, setError ]         = useState('')
  const [recipeData, setRecipeData] = useState(initialState)
  // const [ rimage, setRimage ]       = useState(ImgConfig.uploadImage)
  const [ addRecipe ]     = useAddRecipeMutation()
  const [ updateRecipe ]  = useUpdateRecipeMutation()

  const searchRecipe = () => {
    const filtered = recipes.filter( recipe => { return recipe.id == id })
    initialState.name           = filtered[0].name
    initialState.type           = filtered[0].type
    initialState.difficulty     = filtered[0].difficulty
    initialState.completion     = filtered[0].completion
    initialState.ingredients    = filtered[0].ingredients
    initialState.description    = filtered[0].description
    initialState.temperature    = filtered[0].temperature
    initialState.completionTime = filtered[0].completionTime
    setRecipeData(initialState)
  }
  const handleChange = (e) => {
    setRecipeData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    if (id != null) setRecipeData((prevState) => ({ ...prevState, id: id }))
    console.log("RD ", recipeData)
  }
  const canSave = [...Object.values(recipeData)].every(Boolean)
  /* const onFileDrop = (e) => {
    const newFile = e.target.files[0]
    if (newFile) {
      formData.append("file", newFile, newFile.name )
      setRimage(URL.createObjectURL(newFile))
    }
  } */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = id == null ? addRecipe(recipeData) : updateRecipe(recipeData)
      //const res = addRecipe(recipeData)
      console.log("RES ", res)
      setRecipeData(initialState)
      navigate('/')
    } catch (error) {
      console.log('THERE WAS A PROBLEM WITH THE SERVER ', error)
      setError('THERE WAS A PROBLEM WITH THE SERVER ', error)
    }
  }

  useEffect(() => {
    setId(location.state?.id)
    initialState = {
      name: '', 
      type: '', 
      difficulty: '',
      completion: '', 
      ingredients: '',
      description: '', 
      temperature: '',
      completionTime: ''
    }
    if (location.state?.id != undefined) {
      searchRecipe()
    } else {
      setRecipeData(initialState)
    }
  }, [location.state?.id])

  return (
    <>
    { error && <Alert variant='warning' className="text-center" >{ error }</Alert> }
    <Container className="d-flex justify-content-center mt-5">
      <Card className='my-3' style={{ minHeight: '300px', width: "350px", borderRadius: '20px', overflow: 'hidden' }}>
        <Form onSubmit={ handleSubmit } >
{/*           <div 
            id="dndArea"
            className="dndArea"
          >
            <Card.Img 
              variant="top" 
              src={ rimage }
              height= "250px"
              name="recipeImg"
              /* style={{ ojectFit: "cover"}}
              alt="No Image" * /
            />
            <header>Drag Or Drop File to Upload</header>
            <span>Or select a File</span>
            <input type="file" name="recipeImg" accept="image/*" onChange={ onFileDrop } />
          </div> */}
          <Card.Body>
            <FormInputBS 
              size="sm" 
              type="text" 
              name="name" 
              style="mb-3" 
              labelName="Recept neve" 
              placeholder="pl. Túrógombóc" 
              value={recipeData.name} 
              handleChange={handleChange} 
            />
            <FormTaBS 
              size="sm"
              name="description"
              style="mb-3"
              value={ recipeData.description }
              labelName="Recept leírása"
              placeholder="Finom ebéd, vagy vacsora, vagy reggeli :)"
              handleChange={ handleChange }
            />
            <FormTaBS 
              size="sm"
              name="ingredients"
              style="mb-3"
              value={ recipeData.ingredients }
              labelName="Hozzávalók"
              placeholder="Sorold fel mire van szükség ','-vel elválasztva"
              handleChange={ handleChange }
            />
            <FormTaBS 
              size="sm"
              name="completion"
              style="mb-3"
              value={ recipeData.completion }
              labelName="Elkészítés"
              placeholder="Írd ide, hgoy kell elkészíteni az ételt"
              handleChange={ handleChange }
            />
          </Card.Body>
          <Card.Footer className='mb-3'>
            <Row>
              <Col >
                <Form.Group className="mb-3" controlId="recipeTemperature">
                  <Form.Label>Sütési hőfok</Form.Label>
                  <Form.Select 
                    size='sm' 
                    name="temperature"
                    placeholder="Mekkora hőmérsékleten kell elkészíteni?" 
                    onChange={handleChange}
                    required
                  >
                    <option defaultValue="" > -- Select one -- </option>
                    {
                      Object.keys(TEMP).map((key, index) => (
                        <option 
                          key={ index } 
                          value={ TEMP[key] }
                          //selected = { recipeData.temperature && TEMP[key] == recipeData.temperature ? "selected" : "" }
                        >
                          { TEMP[key] } C°
                        </option>
                      ))
                    }
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col >
                <Form.Group className="mb-3" controlId="recipeCompletionTime">
                  <Form.Label>Sütési idő</Form.Label>
                  <Form.Select 
                    size='sm' 
                    name="completionTime"
                    placeholder="Mennyi idő kell az elkészítéséhez?" 
                    onChange={handleChange}
                    required
                  >
                    <option defaultValue=""> -- Select one -- </option>
                    {
                      Object.keys(TIME).map((key, index) => (
                        <option 
                          key={ index } 
                          value={ TIME[key] }
                          /* selected = { TIME[key] == recipeData.completionTime ? "selected" : "" } */
                        >
                          { TIME[key] } perc
                        </option>
                      ))
                    }
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>        
              <Col >
                <Form.Group className="mb-3" controlId="recipeDifficulty">
                  <Form.Label>Típus</Form.Label>
                  <Form.Select 
                    size='sm' 
                    name="type"
                    placeholder="Mennyi idő kell az elkészítéséhez?" 
                    onChange={handleChange}
                    required
                  >
                    <option defaultValue=""> -- Select one -- </option>
                    {
                      Object.keys(TYPES).map((key, index) => (
                        <option 
                          key={ index } 
                          value={ TYPES[key].key }
                          /* selected = { key == recipeData.type ? "selected" : "" } */
                        >
                          { TYPES[key].value }
                        </option>
                      ))
                    }
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col >
                <Form.Group className="mb-3" controlId="recipeDifficulty">
                  <Form.Label>Nehézsége</Form.Label>
                  <Form.Select 
                    size='sm' 
                    name="difficulty"
                    placeholder="Mennyi idő kell az elkészítéséhez?" 
                    onChange={handleChange}
                    required
                  >
                    <option defaultValue=""> -- Select one -- </option>
                    {
                      Object.keys(COMPLEX).map((key, index) => (
                        <option 
                          key={ index } 
                          value={ key }
                          /* selected = { key == recipeData.difficulty ? "selected" : "" } */
                        >{ COMPLEX[key] }</option>
                      ))
                    }
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Card.Footer>
          <Row className='mb-5 px-3'>
            <Col>
              <Button 
                size='sm' 
                className='w-100' 
                variant='warning'
                onClick={() => navigate(-1) 
              }
              >Mégsem
              </Button>
            </Col>
            <Col>
              <Button type="submit" size='sm' className='w-100' disabled={ !canSave }>Recept { id != null ? "frissítése" : "mentése"} </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
    </>
  )
}

export default NewRecipe
