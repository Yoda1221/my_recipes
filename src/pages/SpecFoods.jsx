import { useEffect, useState } from 'react'
import { TABLES }       from '../config'
import { RecipeCard }   from '../components'
import { Categories }   from '../containers'
import { Container }    from 'react-bootstrap'
import { useParams }    from 'react-router-dom'

const SpecFoods = () => {
    const param         = useParams()
    const recipes       = JSON.parse(localStorage.getItem(TABLES.recipes))
    const [specFood, setSpecFood] = useState(null)
    
    const searchSpecFood = (type) => {
        const filtered = recipes.filter( recipe => {
            return recipe.type.includes(type) 
        })
        setSpecFood(filtered)
    }
    
    useEffect(() => {
        searchSpecFood(param.type)
    }, [param.type])
    
  return (
    <>
        <Categories />
        <Container className='my-5'>
            <div className='grid'>
                {specFood && specFood.map( item => (
                    <RecipeCard key={ item.id } item={ item } />
                ))}
            </div>
        </Container>
    </>
  )
}

export default SpecFoods
