import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Points from './pages/Points';
import Coupons from './pages/Coupons';
import PointShop from './pages/PointShop';
import Ranking from './pages/Ranking';
import LoginAuth from './pages/LoginAuth';
import UnAuthorized from './pages/UnAuthorized';
import Notfound from './pages/Notfound';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category/points' element={<Points />} />
        <Route path='/category/coupons' element={<Coupons />} />
        <Route path='/category/pointshop' element={<PointShop />} />
        <Route path='/category/ranking' element={<Ranking />} />
        <Route path='/login/auth' element={<LoginAuth />} />
        <Route path='/login/unauthorized' element={<UnAuthorized />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </>
  );
};

export default App;