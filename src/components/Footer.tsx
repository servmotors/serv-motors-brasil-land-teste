
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <span className="text-3xl font-display font-bold text-primary">
                Serv<span className="text-white">Motors</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Conectando pessoas e transformando a mobilidade urbana no Brasil.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-primary hover:text-black transition-colors p-2 rounded-full">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-primary hover:text-black transition-colors p-2 rounded-full">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-primary hover:text-black transition-colors p-2 rounded-full">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-primary hover:text-black transition-colors p-2 rounded-full">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Sobre nós</a></li>
              <li><a href="#motoristas" className="text-gray-400 hover:text-primary transition-colors">Para Motoristas</a></li>
              <li><a href="#passageiros" className="text-gray-400 hover:text-primary transition-colors">Para Passageiros</a></li>
              <li><a href="#empresas" className="text-gray-400 hover:text-primary transition-colors">Para Empresas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Carreiras</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-4">Suporte</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-primary mr-3 mt-1" />
                <span className="text-gray-400">Av. Paulista, 1000 - São Paulo, SP</span>
              </li>
              <li className="flex items-start">
                <Phone size={20} className="text-primary mr-3 mt-1" />
                <span className="text-gray-400">+55 11 3456-7890</span>
              </li>
              <li className="flex items-start">
                <Mail size={20} className="text-primary mr-3 mt-1" />
                <span className="text-gray-400">contato@servmotors.com.br</span>
              </li>
            </ul>
            <div className="mt-6">
              <button className="btn-primary">Fale Conosco</button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Serv Motors. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
