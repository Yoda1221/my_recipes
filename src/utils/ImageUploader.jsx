import {useState } from 'react'
import axios from '../api/axios'
import { Card, Container } from 'react-bootstrap'

const ImageUploader = () => {
    const [isSucces, setSuccess]    = useState(null)
    const [userInfo, setuserInfo]   = useState({
        file: [],
        filepreview: null,
    })
    const handleInputChange = (event) => {
        setuserInfo({
            ...userInfo,
            file: event.target.files[0],
            filepreview: URL.createObjectURL(event.target.files[0]),
        })
    }
    const submit = async () =>{
        const formdata = new FormData()
        formdata.append('avatar', userInfo.file)
        axios.post("/imageupload", formdata,{ headers: { 
            "Content-Type": "multipart/form-data" 
        }})
        .then(res => {
            console.warn(res)
            if(res.data.success === 1) setSuccess("IMAGE UPLOAD SUCCESSFULLY!")
        })
    }

    return (
        <Container className='d-flex justify-content-center'>
            <Card className='my-3' style={{ minHeight: '300px', width: "400px", borderRadius: '20px', overflow: 'hidden' }} >
                <Card.Body>
                    <div className="dndArea">
                        { userInfo.filepreview !== null 
                            ? <img className="previewimg" src={userInfo.filepreview} alt="UploadImage" />
                            : null 
                        }
                        <header>Drag and Drop File to Upload</header>
                        <span>Or select a File</span>
                        <input type="file"  name="upload_file" onChange={handleInputChange} />
                    </div>
                </Card.Body>
                <Card.Footer >
                    <button type="submit" className="btn btn-sm btn-outline-secondary my-3 mx-3 px-3" onClick={()=> submit() } >Upload</button>
                    <div className='text-center'>
                        { isSucces !== null ? <h6 className='text-info'>{ isSucces }</h6> : "" }
                    </div>
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default ImageUploader