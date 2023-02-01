import { useEffect, useState } from 'react'
import { Loader }           from '../components'
import { BiEditAlt }        from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Button, Card, Col, Container, ListGroup, Row }        from 'react-bootstrap'
import { Link, useLocation, useNavigate, useParams }  from 'react-router-dom'
import { useDeleteRecipeMutation } from '../api/apiSlice'
import { TABLES, COMPLEX, ImgConfig, TEMP, TIME, TYPES }    from '../config'

const ShowRecipe = () => {
    const location      = useLocation()
    const navigate      = useNavigate()
    const [ id, setId ] = useState(location.state?.id)
    const recipes       = JSON.parse(localStorage.getItem(TABLES.recipes))
    const [recipe, setRecipe]   = useState(null)
    const [ deleteRecipe ]      = useDeleteRecipeMutation()

    const searchRecipe = (id) => {
        const filtered = recipes.filter( recipe => {
            return recipe.id == id 
        })
        setRecipe(filtered[0])
    }

    const handleDeleteRecipe = (id) => {
        //deleteRecipe({id})
        //! REFRESH LOCALSTORAGE!!!
        navigate("/")
    }

    useEffect(() => {
        setId(location.state?.id)
        searchRecipe(location.state?.id)
    }, [location.state?.id])

    return (
        <Container className='mt-3'>
            { recipe ? 
                <Container>
                    <h2>{ recipe.name}</h2>
                    <p className="text-muted">{ recipe.description}</p>
                    <Row className='my-3'>
                        <Col md={8}>
                            <Card.Img 
                                variant="top" 
                                src={ recipe.image != null ? import.meta.env.VITE_IMG_URL + recipe.image : ImgConfig.noimage }
                                height= "300px"
                                style={{ ojectFit: "cover"}}
                                alt={ recipe.name }
                            />
                        </Col>
                        <Col md={4}>
                            <ListGroup className='mb-3'>
                                <ListGroup.Item className='text-muted text-end'>Sütési idő: { recipe.completionTime } min</ListGroup.Item>
                                <ListGroup.Item className='text-muted text-end'>Sütési hőfok: { recipe.temperature } °C</ListGroup.Item>
                                <ListGroup.Item className='text-muted text-end'>Elkészítés: { COMPLEX[recipe.difficulty] }</ListGroup.Item>
                                <ListGroup.Item className='text-muted text-end'>Étel típusa: { TYPES[recipe.type].value }</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <p>{ recipe.completion }</p>
                        </Col>
                        <Col md={4} className="mb-3">
                            <ListGroup className='mb-3'>
                                {  recipe.ingredients.split(';')
                                    .map( (item, index)  => {
                                        return <ListGroup.Item className='text-muted text-end' key={ index }>{ item }</ListGroup.Item>
                                    })
                                }
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="d-flex justify-content-between mt-3 p-3">
                                <Link state={{ id: recipe.id }} to={ recipe ? `/newrecipe` : ""} >
                                    <BiEditAlt size="44px" className='btn btn-sm btn-outline-success' style={{ fontSize: "2rem"}}/>
                                </Link >
                                <RiDeleteBin6Line 
                                    className='btn btn-outline-danger'
                                    style={{ fontSize: "2rem" }}
                                    size="44px"
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
