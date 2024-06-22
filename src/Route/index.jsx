import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home'; // Importação da exportação padrão do Home
import Options from '../Pages/Options';
import StoreDropdown from '../Components/StoreDropdown';
import Count from '../Pages/Count';


export function RouteApp() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/options" element={<Options />} />
        <Route path="/options/:storeId" element={<Options />} />
        <Route path="/store-dropdown" element={<StoreDropdown />} />
        <Route path="/Count/:storeId/:option" element={<Count />} />
      </Routes>
    </Router>
  );
}
