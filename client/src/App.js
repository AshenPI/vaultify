import {BrowserRouter , Routes , Route, Navigate} from "react-router-dom";
import Homepage from './pages/Homepage';
import Items from './pages/Items';
import CartPage from './pages/CartPage';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bills from "./pages/Bills";
import Customers from "./pages/Customers";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={ <ProtectedRoute> <Homepage /></ProtectedRoute>}/>
        <Route path='/items' element={ <ProtectedRoute> <Items /></ProtectedRoute>} />
        <Route path='/cart' element={ <ProtectedRoute> <CartPage /></ProtectedRoute>} />
        <Route path='/bills' element={ <ProtectedRoute> <Bills /> </ProtectedRoute>} />
        <Route path='/customers' element={ <ProtectedRoute> <Customers /> </ProtectedRoute>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Login />} />
        <Route path="*" element={" 404 no page with this path"} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;


export function ProtectedRoute({children}){
  if(localStorage.getItem('pos-user')){
    return children
  }else{
    return <Navigate to="/login" />
  }
}