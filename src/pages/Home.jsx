import { TABLES } from '../config'
import { useState }  from 'react'
import { Container, Form }              from 'react-bootstrap'
import { Categories }       from '../containers'
import { RecipeCard }       from '../components'
import { useGetRecipesQuery } from '../api/apiSlice'

const Home = () => {
  let content
  const [query, setQuery]           = useState("")
  const {
    data: recipes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetRecipesQuery() 

  if (isLoading)  content = <p className="loading">Loading...</p>
  if (isSuccess)  content = <>
    {/* REFRESH LOCALSTOREGE WHEN SOMETHING IS CHANGED */}
    { localStorage.removeItem(TABLES.recipes) }
    { localStorage.setItem(TABLES.recipes, JSON.stringify(recipes.respRecipe)) }
    { recipes && recipes.respRecipe
      .filter(recipe => recipe.name.toLowerCase().includes(query))
      .map( item => {
        return (
          <RecipeCard key={ item.id } item={ item } />
        )
      })
    }
  </>
  else if(isError) content = <p>{ error }</p>

  return (
    <Container className='p-3 mt-3'>
      <Container className=''>
        <Form.Control
          type="search"
          className="me-2"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
      </Container>
      <Categories />
      <Container className='p-3 mt-3 cardGrid'>
        { content }
      </Container>
    </Container>
  )
}

export default Home
