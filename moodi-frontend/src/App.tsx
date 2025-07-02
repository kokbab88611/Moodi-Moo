import Loginpage from './Loginpage.tsx'
import Landingpage from './Landingpage.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Landingpage/>}/>
        <Route path="/login" element={<Loginpage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;