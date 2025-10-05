import React from 'react';
import { Button } from './ui/button';
import { ExternalLink, MessageCircle, Users, Headphones } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="display-md text-primary mb-6">
            Precisa de Ajuda?
          </h2>
          <p className="body-lg text-secondary mb-12">
            Entre em contato com nosso suporte no Discord! Nossa comunidade está 
            sempre pronta para ajudar jogadores novos e experientes.
          </p>

          {/* Discord CTA */}
          <div className="bg-secondary rounded-2xl p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3 className="h3 text-primary mb-2">Junte-se ao nosso Discord</h3>
                <p className="body-md text-secondary">
                  Conecte-se com outros jogadores, receba suporte e fique por dentro das novidades!
                </p>
              </div>
              <Button 
                className="btn-primary glow-effect"
                onClick={() => window.open('https://discord.gg/eM6WnEVs', '_blank')}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Entrar no Discord
              </Button>
            </div>
          </div>

          {/* Support Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-accent-primary" />
              </div>
              <h4 className="h4 text-primary mb-2">Chat em Tempo Real</h4>
              <p className="body-sm text-muted">
                Converse com outros jogadores e tire suas dúvidas instantaneamente
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-accent-primary" />
              </div>
              <h4 className="h4 text-primary mb-2">Suporte Dedicado</h4>
              <p className="body-sm text-muted">
                Equipe de moderadores sempre disponível para resolver problemas
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent-primary" />
              </div>
              <h4 className="h4 text-primary mb-2">Nova Comunidade</h4>
              <p className="body-sm text-muted">
                Conheça novos amigos e faça parte de uma comunidade amigável
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;