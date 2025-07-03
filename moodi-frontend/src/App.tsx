import Loginpage from './Loginpage.tsx'
import Landingpage from './Landingpage.tsx'
import Me from './Me.tsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Landingpage/>}/>
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="/me" element={<Me/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;