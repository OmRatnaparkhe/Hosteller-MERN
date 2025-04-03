import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './Pages/signup'
import { UserInfo } from './Pages/userInfo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/userInfo' element={<UserInfo/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
