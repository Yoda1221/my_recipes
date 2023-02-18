import { FileUploader } from "./utils"
import { logo }         from "./assets"
import { Layout }       from "./containers"
import { Container }    from "react-bootstrap"
import { Routes, Route, Link }  from 'react-router-dom'
import { Home, Login, NewRecipe, Notfound, Register, ShowRecipe, SpecFoods } from "./pages"

function App() {
  return (
    <Container>
      <header className="w-100 d-flex justify-content-between align-items-center p-3">
        <Link to="/" >
          <img src={ logo } alt="logo" style={{ width: "40px"}} />
        </Link>
        <Link to="/newrecipe" className="btn btn-sm btn-outline-info rounded-pill">
          New recipe
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Login />} />
          <Route path="/specfood/:type"   element={ <SpecFoods  /> } />
          <Route path="/newrecipe"        element={ <NewRecipe  /> } />
          <Route path="/showrecipe"       element={ <ShowRecipe /> } />
          <Route path="/fileUploader"     element={ <FileUploader /> } />
          
          <Route path="/login"            element={ <Login /> } />
          <Route path="/register"         element={ <Register /> } />
          
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </Container>
  )
}

export default App
