import { useState }               from 'react'
import { TABLES }                 from '../config'
import { Categories }             from '../containers'
import { Container, Form }        from 'react-bootstrap'
import { useGetRecipesQuery }     from '../api/apiSlice'
import { RecipeCard, SearchBar }  from '../components'

const Home = () => {
  let content
  const [queries, setQueries] = useState([])
  const {
    data: jsonData,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetRecipesQuery() 

  if (isLoading)  content = <p className="loading">Loading...</p>
  if (isSuccess)  content = <>
    {/* REFRESH LOCALSTOREGE WHEN SOMETHING IS CHANGED */}
    { localStorage.removeItem(TABLES.recipes) }
    { localStorage.setItem(TABLES.recipes, JSON.stringify(jsonData.resp)) }
    { queries && queries.map( item => {
        return <RecipeCard key={ item.id } item={ item } />
      })
    }
  </>
  else if(isError) content = <p>{ error }</p>
  return (
    <Container className='p-3 mt-3'>
      <Container className=''>
        <SearchBar jsonData={isSuccess ? jsonData.resp: [] } setQueries={setQueries} />
      </Container>
      <Categories />
      <Container className='p-3 mt-3 cardGrid'>
        { content }
      </Container>
    </Container>
  )
}

export default Home
