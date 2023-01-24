import { useEffect, useState } from 'react'
import { Loader }           from '../components'
import { BiEditAlt }        from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Col, Container, Row }        from 'react-bootstrap'
import { Link, useNavigate, useParams }  from 'react-router-dom'
import { useDeleteRecipeMutation } from '../api/apiSlice'
import { TABLES, COMPLEX, ImgConfig, TEMP, TIME, TYPES }    from '../config'

const ShowRecipe = () => {
    const param         = useParams()
    const recipes       = JSON.parse(localStorage.getItem(TABLES.recipes))
    const [recipe, setRecipe] = useState(null)
    const [ deleteRecipe ]  = useDeleteRecipeMutation()
    const navigate = useNavigate()

    const searchRecipe = (id) => {
        const filtered = recipes.filter( recipe => {
            return recipe.id == id 
        })
        setRecipe(filtered[0])
    }

    const handleDeleteRecipe = (id) => {
        deleteRecipe({id})
        navigate("/")
    }

    useEffect(() => {
        searchRecipe(param.id)
    }, [param.id])

    return (
        <Container className='mt-3'>
            { recipe ? 
                <Container>
                    <h2>{ recipe.name}</h2>
                    <p className="text-muted">{ recipe.description}</p>
                    <br />

                    <Row>
                        <Col md={8}>
                            { recipe.ingredients}
                            <p>{ recipe.completion}</p>
                        </Col>
                        <Col md={4}>
                            { recipe.image}
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col className="" >
                            <small className="">
                                Sütési idő: { recipe.completionTime } min
                            </small>
                        </Col>
                        <Col className="" >
                            <small className="">
                                Sütési hőfok: { recipe.temperature } °C
                            </small>
                        </Col>

                        <Col className="" >
                            <small className="">
                                Elkészítés: { COMPLEX[recipe.difficulty] }
                            </small>
                        </Col>
                        <Col className="" >
                            <small className="">
                                Étel típusa: { TYPES[recipe.type].value }
                            </small>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="d-flex justify-content-between mt-3 p-3">
                                <Link to={ recipe ? `/newrecipe/${recipe.id}` : ""} className="">
                                    <BiEditAlt style={{ fontSize: "1.2rem"}}/>
                                </Link >
                                <RiDeleteBin6Line 
                                    style={{ fontSize: "1.2rem"}}
                                    onClick={() => handleDeleteRecipe(recipe.id)}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
                :
                <Container>
                    loading
                </Container>
            }
        </Container>
    )
}

export default ShowRecipe
