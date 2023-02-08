import { COMPLEX, ImgConfig, TYPES, uppercaseFirstChar }    from '../config'
import { Col, Card, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { MdOutlinePhotoCamera } from 'react-icons/Md'

const RecipeCard = ({ item, ingredspec }) => {
    return (
        <Card style={{ minHeight: '250px', borderRadius: '20px', overflow: 'hidden', maxWidth: '350px' }}>
            <Card.Img 
                variant="top" 
                src={ 
                    item.image != null ? import.meta.env.VITE_IMG_URL + item.image : ImgConfig.noimage
                }
                height= "250px"
                style={{ ojectFit: "cover", position: "relative"}}
                alt={ item.name }
            />
            { item.image == null 
                ? <Link
                        to={`/fileUploader`} 
                        state={{ id: item.id }} 
                    >
                        <MdOutlinePhotoCamera 
                            className='text-white bg-success rounded-circle p-2'
                            style={{ fontSize: "30px", fontWeight: "lighter", width: "40px", height: "40px", position: "absolute", right: "10px", top: "200px" }}
                        />
                    </Link>
                : "" 
            }
            <Card.Body className='px-0 pb-0'>
                <div className="px-2">
                    <Card.Title>{ item.name }</Card.Title>
                        <Link 
                            state={{ id: item.id }} 
                            to={`/showRecipe`} 
                            className="btn btn-sm btn-outline-warning w-100"
                        >
                        Show recipe
                    </Link>
                </div>
            </Card.Body>
            <Card.Footer >
                <Row>
                    <Col className='text-center' >
                        <small className="text-muted text-center">
                            Sütési idő: { item.completionTime } min
                        </small>
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center' >
                        <small className="text-muted">
                            Elkészítés: { COMPLEX[item.difficulty] }
                        </small>
                    </Col>
                </Row> 
            </Card.Footer>
        </Card>
    )
}

export default RecipeCard
