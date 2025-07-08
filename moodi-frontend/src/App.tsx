import Loginpage from './Loginpage.tsx'
import Landingpage from './Landingpage.tsx'
import Me from './Me.tsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from './UserProvider.tsx'; 
import { PublicRoute, PrivateRoute } from './PrivateRoutes.tsx';

function App() {
  return (
    <BrowserRouter> 
      <UserProvider>
        <Routes>
          <Route path="/" element={<PublicRoute><Landingpage/></PublicRoute>}/>
          <Route path="/login" element={<Loginpage/>}/>
          <Route path="/me" element={<PrivateRoute><Me /></PrivateRoute>} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;