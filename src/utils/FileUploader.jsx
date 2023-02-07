import { useState }     from 'react'
import { ImgConfig }    from '../config'
import { useLocation, useNavigate }  from "react-router-dom"
import { Card, Col, Container, Form, Row } from 'react-bootstrap'

const FileUploader = () => {
    const location  = useLocation()
    const navigate  = useNavigate()
    const [ id, setId ] = useState(location.state?.id)
    console.log("🚀 → file: FileUploader.jsx:10 → FileUploader → ID", id)
    const baseUrl   = import.meta.env.VITE_SERVER_URL
    const [ file, setFile ]     = useState()
    const [ rimage, setRimage ] = useState(ImgConfig.uploadImage)
    
    const onFileDrop = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0])
            setRimage(URL.createObjectURL(e.target.files[0]))
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!file) return
        const formData = new FormData()
        formData.append("rId", id)
        formData.append("image", file, file.name)
        //  console.log("FDO ", Object.fromEntries(formData))
        try {
            const res   = await fetch(`${baseUrl}/image`, { method: 'POST',  body: formData })
            const json  = await res.json()
            console.log("🚀 → RES JSON ", json)
            //navigate('/')
        } catch (error) {
            console.log("ERROR ", error)
        }
    }
    
    return ( 
        <Container className='d-flex justify-content-center'>
            <Card className='my-3' style={{ minHeight: '300px', width: "400px", borderRadius: '20px', overflow: 'hidden' }} >
                <Form onSubmit={ handleSubmit } >
                    <div id="dndArea" className="dndArea">
                        <Card.Img variant="top" src={ rimage } height= "250px" name="recipeImg" />
                        <header>Drag and Drop File to Upload</header>
                        <span>Or select a File</span>
                        <input type="file" name="recipeImg" accept="image/*" onChange={ onFileDrop } />
                    </div>
                    <Row className='my-3'>
                        <Col md={8} className='d-flex justify-content-center'>
                            <input type="text" className="form-control px-3" id="newName" placeholder='Image new name' />
                        </Col>
                        <Col md={4} className='d-flex justify-content-center'><button type="submit" className="btn btn-sm btn-info px-3" >Upload</button></Col>
                    </Row>
                </Form>
                <Card.Footer className='mb-3'>
                    <div>{file && `${file.name} - ${file.type}`}</div>
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default FileUploader
