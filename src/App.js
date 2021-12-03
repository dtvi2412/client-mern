import './App.css';
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import AuthContextProvider from "./Context/AuthContext"
import PostsContextProvider from './Context/PostsContext'

import HomePage from "./Components/Homepage/HomePage";
import Auth from './views/Auth/Auth';
import Dashboard from './views/Dashboard/Dashboard';
import ProtectedRoute from "./routing/ProtectedRoute";
import PageNotFound from './views/PageNotFound/PageNotFound';
import About from './views/About/About';

function App() {
  return (
    <AuthContextProvider>  
      <PostsContextProvider>
        <Router>
            <Routes>
                <Route path="/login" element={ <Auth authRoute='login'/> } />
                <Route path="/register" element={<Auth authRoute='register'/> } />
              
                  <Route path="/dashboard"
                      element={ <ProtectedRoute>      
                                    <Dashboard/>  
                                </ProtectedRoute>} />
                  <Route path="/about" element={  <ProtectedRoute> 
                                                    <About/> 
                                                  </ProtectedRoute> } />
              
                <Route path="/" element={<HomePage/>} />
                <Route path="*" element={<PageNotFound/>} />     
            </Routes>
        </Router>  
      </PostsContextProvider>
    </AuthContextProvider>
  );
}

export default App;
