import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import SignupPage from "./Pages/SignupPage"


function App() {


  return (
    <>
    <div className="h-screen min-h-full flex items-center justify-center  ">
      <div className="w-full max-w-md space-y-5">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
        </Routes>
        
        </BrowserRouter>

      </div>

    </div>
    </>
  )
}

export default App
