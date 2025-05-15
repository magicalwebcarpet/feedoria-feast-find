
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import DeliveryPage from './DeliveryPage';

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/delivery" element={<DeliveryPage />} />
    </Routes>
  );
};

export default Index;
