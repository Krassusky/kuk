import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home' // Importação da exportação padrão do Home

export function RouteApp() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}