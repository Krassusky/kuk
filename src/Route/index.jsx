import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Options from '../Pages/Options';
import StoreDropdown from '../Components/StoreDropdown';
import Count from '../Pages/Count';
import DownloadPage from '../Pages/Download';
import Login from '../Pages/Login';
import { AuthProvider } from '../context/AuthContext'; // Adjust the import path as necessary
import ProtectedRoute from '../Components/ProtectedRoute'; // Adjust the import path as necessary

export function RouteApp() {
  return (
    <AuthProvider>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute element={Home} />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/store-dropdown" element={<ProtectedRoute element={StoreDropdown} />} /> */}
          <Route path="/options" element={<ProtectedRoute element={Options} />} />
          <Route path="/options/:storeId" element={<ProtectedRoute element={Options} />} />
          <Route path="/count" element={<ProtectedRoute element={Count} />} />
          <Route path="/download" element={<ProtectedRoute element={DownloadPage} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}