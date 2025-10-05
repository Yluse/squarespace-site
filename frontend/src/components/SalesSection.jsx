import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ShoppingCart, Sword, Shield, Heart } from 'lucide-react';

const SalesSection = ({ items, onAddToCart }) => {
  const getItemIcon = (type) => {
    switch (type) {
      case 'weapon':
        return <Sword className="w-8 h-8 text-accent-primary" />;
      case 'armor':
        return <Shield className="w-8 h-8 text-accent-primary" />;
      case 'pet':
        return <Heart className="w-8 h-8 text-accent-primary" />;
      default:
        return <ShoppingCart className="w-8 h-8 text-accent-primary" />;
    }
  };

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="display-md text-primary mb-6">
            Vendas de Itens Personalizados
          </h2>
          <p className="body-lg text-secondary max-w-3xl mx-auto">
            O servidor Squarespace The Last está com vendas de itens personalizados 
            por um preço acessível.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <Card 
              key={item.id} 
              className="feature-card hover-lift group cursor-pointer"
            >
              <div className="text-center space-y-6">
                {/* Item Icon */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-tertiary rounded-full flex items-center justify-center group-hover:bg-accent-bg transition-colors duration-300">
                    {getItemIcon(item.type)}
                  </div>
                </div>

                {/* Item Details */}
                <div>
                  <h3 className="h3 text-primary mb-2">{item.name}</h3>
                  <p className="body-md text-muted mb-4">{item.description}</p>
                  
                  {/* Price */}
                  <div className="text-2xl font-bold text-accent-primary mb-6">
                    R$ {item.price}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button 
                  className="btn-primary w-full"
                  onClick={() => onAddToCart(item)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Adicionar ao Carrinho
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Notice about fictional items */}
        <div className="mt-12 text-center">
          <div className="bg-tertiary border border-accent-primary/20 rounded-lg p-6 max-w-2xl mx-auto">
            <h4 className="h4 text-accent-primary mb-2">⚠️ Aviso Importante</h4>
            <p className="body-md text-secondary">
              Todos os itens exibidos são fictícios e destinados apenas para demonstração. 
              Este é um protótipo e não processa compras reais.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesSection;