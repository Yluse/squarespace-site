import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import SalesSection from '../components/SalesSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { mockItems } from '../data/mock';

const Home = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Simulating API call with mock data
    setItems(mockItems);
  }, []);

  const handleAddToCart = (item) => {
    // Show message that items are fictional
    alert('⚠️ Atenção: Este é um item fictício para demonstração. Não é possível realizar compras reais neste protótipo.');
  };

  return (
    <div className="min-h-screen bg-primary text-primary">
      <Header />
      <HeroSection />
      <SalesSection items={items} onAddToCart={handleAddToCart} />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;