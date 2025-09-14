import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Points from './pages/Points';
import Coupons from './pages/Coupons';
import History from './pages/History';
import PointShop from './pages/PointShop';
import Ranking from './pages/Ranking';
import LoginAuth from './pages/LoginAuth';
import UnAuthorized from './pages/UnAuthorized';
import Notfound from './pages/Notfound';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category/points' element={<Points />} />
        <Route path='/category/giftbox/coupons' element={<Coupons />} />
        <Route path='/category/giftbox/history' element={<History />} />
        <Route path='/category/pointshop' element={<PointShop />} />
        <Route path='/category/ranking' element={<Ranking />} />
        <Route path='/login/auth' element={<LoginAuth />} />
        <Route path='/login/unauthorized' element={<UnAuthorized />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;