import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Points from './pages/Points';
import Coupons from './pages/Coupons';
import Qr from './components/Qr';
import Ranking from './pages/Ranking';
import Notfound from './pages/Notfound';

// 1. "/" : 메인 마이페이지
// 2. "/category/points" : 포인트 조회페이지
// 3. "/category/coupons" : 쿠폰 조회페이지
// 4. "/category/qr" : qr페이지 모달
// 5. "/category/ranking" : 랭킹 페이지

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category/points' element={<Points />} />
        <Route path='/category/coupons' element={<Coupons />} />
        <Route path='/category/qr' element={<Qr />} />
        <Route path='/category/ranking' element={<Ranking />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </>
  )
}

export default App
