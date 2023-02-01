import React, { ChangeEvent, useState } from 'react'
import { ImgConfig }  from '../config'
import { Card, Container, Form } from 'react-bootstrap'
const baseUrl   = import.meta.env.VITE_SERVER_URL   = import.meta.env.VITE_SERVER_URL

const FileUploader = () => {
    const formData = new FormData()
    const [file, setFile] = useState()
    const [ rimage, setRimage ]       = useState(ImgConfig.uploadImage)
  
    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0])
            formData.append("file", e.target.files[0], e.target.files[0].name)
            setRimage(URL.createObjectURL(e.target.files[0]))
        }
    }
    const onFileDrop = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0])
            formData.append("file", e.target.files[0], e.target.files[0].name)
            setRimage(URL.createObjectURL(e.target.files[0]))
        }
    }
    const handleSubmit = () => {
        if (!file) return
        console.log("🚀 → file: FileUploader.jsx:15 → handleSubmit → FILE", file)
        console.log("🚀 → file: FileUploader.jsx:11 → handleFileChange → FORMDATA", formData)
        // 👇 Uploading the file using the fetch API to the server
        fetch(`${ baseUrl }/image`, {
            method: 'POST',
            body: formData
            // 👇 Set headers manually for single file upload
            /* headers: {
                
                "Content-type": "application/json"
            }, */
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    }
    return ( <Container>
                <Form onSubmit={ handleSubmit } >
                    <Card className='my-3' style={{ minHeight: '300px', width: "350px", borderRadius: '20px', overflow: 'hidden' }} >
                        <div 
                            id="dndArea"
                            className="dndArea"
                        >
                            <Card.Img 
                                variant="top" 
                                src={ rimage }
                                height= "250px"
                                name="recipeImg"
                                /* style={{ ojectFit: "cover"}}
                                alt="No Image" */
                            />
                            <header>Drag Or Drop File to Upload</header>
                            <span>Or select a File</span>
                            <input type="file" name="recipeImg" accept="image/*" onChange={ onFileDrop } />
                        </div>
                    </Card>
                </Form>
            </Container>
    )
}

export default FileUploader
