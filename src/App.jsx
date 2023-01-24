import { Container } from "react-bootstrap"
import { Layout } from "./containers"
import { logo } from "./assets"
import { Routes, Route, Link }  from 'react-router-dom'
import { Home, NewRecipe, Notfound, ShowRecipe, SpecFoods } from "./pages"

function App() {

  return (
    <Container>
      <header className="w-100 d-flex justify-content-between align-items-center p-3">
        <Link to="/" >
          <img src={ logo } alt="logo" style={{ width: "40px"}} />
        </Link>
        <Link to="/newrecipe/0" className="btn btn-sm btn-info">
          New recipe
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/specfood/:type" element={ <SpecFoods  /> } />
          <Route path="/newrecipe/:id"      element={ <NewRecipe  /> } />
          <Route path="/showrecipe/:id" element={ <ShowRecipe /> } />
          
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </Container>
  )
}

export default App
