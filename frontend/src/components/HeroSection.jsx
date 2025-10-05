import React, { useRef, useEffect, useState } from 'react';
import { Button } from './ui/button';
import MoonModel from './MoonModel'; // Importa o modelo 3D

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handlePlayClick = () => {
    // Abre o Minecraft com o servidor já preenchido usando a URL fixa fornecida
    window.location.href = "minecraft://?addExternalServer=SquarespaceTheLast|plus-02.bedhosting.com.br:10354";
  };

  return (
    <section className="hero-minecraft-bg">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full relative">
          {/* Left Side - Text Content */}
          <div className="space-y-8 animate-fade-in max-w-[700px]">
            <div>
              <h1 className="display-lg text-primary mb-6">
                O melhor servidor de{' '}
                <span className="text-accent-primary">Minecraft</span>{' '}
                do Brasil
              </h1>
              <p className="body-lg text-secondary max-w-xl">
                Hospedagem e diversão garantida para todos os jogadores!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary" onClick={handlePlayClick}>
                Começar a Jogar
              </Button>
              <Button 
                className="btn-secondary"
                onClick={() => window.open('https://discord.gg/eM6WnEVs', '_blank')}
              >
                Entrar no Discord
              </Button>
            </div>
          </div>

          {/* Right Side - MoonModel */}
          <div className="flex justify-center lg:justify-end min-h-[400px] mt-8 lg:mt-0 lg:pl-20">
            <div className="model-minecraft-hero">
              <MoonModel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;