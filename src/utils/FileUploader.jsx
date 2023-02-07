import { useState }     from 'react'
import { ImgConfig }    from '../config'
import { useNavigate }  from "react-router-dom"
import { Card, Container, Form } from 'react-bootstrap'

const FileUploader = () => {
    const navigate  = useNavigate()
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
        formData.append("image", file, file.name)
        formData.append("ID", 1)
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
                    <button type="submit" className="btn btn-sm btn-info mt-3 mx-3 px-3" >Upload</button>
                </Form>
                <Card.Footer className='mb-3'>
                    <div>{file && `${file.name} - ${file.type}`}</div>
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default FileUploader
