import React from 'react';
import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';

const Header = () => {
  const menuItems = ['Início', 'Vendas', 'Sugestões', 'Serviços'];

  return (
    <header className="bg-secondary border-b border-subtle sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-accent-primary">
            Squarespace The Last
          </h1>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-secondary hover:text-accent-primary transition-colors duration-200 font-medium"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Discord Button */}
        <Button 
          className="btn-primary"
          onClick={() => window.open('https://discord.gg/eM6WnEVs', '_blank')}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Discord
        </Button>
      </div>
    </header>
  );
};

export default Header;