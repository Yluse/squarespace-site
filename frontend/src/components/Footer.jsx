import React from 'react';
import { ExternalLink } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    { name: 'Início', href: '#' },
    { name: 'Vendas', href: '#' },
    { name: 'Sugestões', href: '#' },
    { name: 'Serviços', href: '#' },
    { name: 'Discord', href: 'https://discord.gg/eM6WnEVs', external: true }
  ];

  return (
    <footer className="footer">
      <div className="container mx-auto">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="h3 text-accent-primary mb-4">
                Squarespace The Last
              </h3>
              <p className="body-md text-secondary max-w-md">
                O melhor servidor de Minecraft do Brasil, oferecendo diversão 
                e experiências únicas para todos os jogadores.
              </p>
            </div>
            
            {/* Social Link */}
            <div className="flex space-x-4">
              <a
                href="https://discord.gg/eM6WnEVs"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="h4 text-primary mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-muted hover:text-accent-primary transition-colors duration-200 flex items-center"
                  >
                    {link.name}
                    {link.external && (
                      <ExternalLink className="w-3 h-3 ml-1" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Server Info */}
          <div>
            <h4 className="h4 text-primary mb-6">Servidor</h4>
            <ul className="space-y-3">
              <li className="text-muted">
                <span className="text-accent-primary">IP:</span> plus-02.bedhosting.com.br
              </li>
              <li className="text-muted">
                <span className="text-accent-primary">Versão:</span> 1.21.101.1
              </li>
              <li className="text-muted">
                <span className="text-accent-primary">Jogadores:</span> 0/10
              </li>
            </ul>
          </div>

          {/* Discord Info */}
          <div>
            <h4 className="h4 text-primary mb-6">Comunidade</h4>
            <div className="space-y-4">
              <p className="body-sm text-muted">
                Junte-se ao nosso Discord para ficar por dentro de todas as novidades 
                e interagir com outros jogadores.
              </p>
              <a
                href="https://discord.gg/eM6WnEVs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-accent-primary hover:text-accent-hover transition-colors duration-200"
              >
                Entrar no Discord
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-subtle mt-12 pt-8 text-center">
          <p className="body-sm text-muted">
            © 2024 Squarespace The Last – Servidor de Minecraft. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;