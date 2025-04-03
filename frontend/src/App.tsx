import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './Pages/signup'
import { UserInfo } from './Pages/userInfo'
import { LLHome } from './Pages/LandLordDashHome'
import { Signin } from './Pages/signin'
import StudentDashboard from './Pages/StudentDash'
import HomePage from './Pages/HomePage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/userInfo' element={<UserInfo/>}/>
        <Route path='/studentDashboard' element={<StudentDashboard/>}/>
        <Route path='/llhome' element={<LLHome/>}/>
       <Route path='/' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
