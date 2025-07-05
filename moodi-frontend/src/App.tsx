import Loginpage from './Loginpage.tsx'
import Landingpage from './Landingpage.tsx'
import Me from './Me.tsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from './UserContext.tsx';
function App() {
  return (
    <BrowserRouter> 
      <UserProvider>
        <Routes>
        <Route path="/" element={<Landingpage/>}/>
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="/me" element={<Me/>}/>  
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;