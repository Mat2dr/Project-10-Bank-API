import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from './slices/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser(null));
  }, [dispatch]);

  return (
    <BrowserRouter>
    <Header/>
    <main>
      <Routes>
        <Route path='/' element={<LandingPage />} exact/>
        <Route path='/login' element={<Login />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route to='/not-found' /> 
      </Routes>
    </main>
    <Footer/>
  </BrowserRouter>
  )
}

export default App;
