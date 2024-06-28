// src/Route/index.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home'; // Adjusted path
import Options from '../Pages/Options'; // Adjusted path
import StoreDropdown from '../Components/StoreDropdown'; // Adjusted path
import Count from '../Pages/Count'; // Adjusted path
import DownloadPage from '../Pages/Download'; // Adjusted path
import Login from '../Components/Login'; // Adjusted path
import { AuthProvider } from '../context/AuthContext'; // Adjusted path

export function RouteApp() {
  return (
    <AuthProvider>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/options" element={<Options />} />
          <Route path="/options/:storeId" element={<Options />} />
          <Route path="/store-dropdown" element={<StoreDropdown />} />
          <Route path="/count" element={<Count />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}