import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Registration from './pages/Registration';
import ThankYou from './pages/ThankYou';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="inscricao" element={<Registration />} />
          <Route path="obrigado" element={<ThankYou />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contato" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;