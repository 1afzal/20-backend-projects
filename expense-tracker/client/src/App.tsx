import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import ExpenseForm from "./components/ExpenseForm";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupForm/>}/>
        <Route path="/signin" element={<SigninForm/>}/>
        <Route path="/expenses" element={<ExpenseForm/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App;