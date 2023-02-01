import { useEffect, useState } from "react"
import { Container, Form } from "react-bootstrap"

const SearchBar = ({ jsonData, setQueries }) => {    
    const [count, setCount] = useState(null)
    const searchChange = e => {
        if(!e.target.value) return setQueries(jsonData)
        let filteredData
        if (jsonData[0].name) {
            filteredData = jsonData
            .filter(data => 
                data.name.toLowerCase().includes(e.target.value.toLowerCase()) 
            )
        }
        setQueries(filteredData)
        setCount(Object.keys(filteredData).length)
    }

    useEffect(() => {
        setQueries(jsonData)
        if (jsonData) {
            setCount(Object.keys(jsonData).length)
        }
    }, [jsonData])

    return (
        <Container className='px-3'>
            <p className="fw-light pb-0">{ count } recipe found</p>
            <Form.Control
                type="search"
                placeholder="Type the recipe name you are looking for"
                className="me-2"
                onChange={searchChange}
                onSubmit={(e) => e.preventDefault()}
                autoFocus
            />
        </Container>
    )
}

export default SearchBar
