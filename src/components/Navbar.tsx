import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we're on the home page
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Inscrição', path: '/inscricao' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contato', path: '/contato' }
  ];

  const externalLinks = [
    {
      name: 'Ouvidoria',
      url: 'http://transparencia.corrente.pi.gov.br/corrente/servicosonline/ouvidoria'
    },
    {
      name: 'Portal da Transparência',
      url: 'http://transparencia.corrente.pi.gov.br/corrente'
    }
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isHomePage && !isScrolled
          ? 'bg-transparent'
          : 'bg-white shadow-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <img
                src="https://i.imgur.com/B90IYr2.png"
                alt="Prefeitura de Corrente"
                className="h-16 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-green-600'
                    : isHomePage && !isScrolled
                    ? 'text-white hover:text-green-400'
                    : 'text-gray-700 hover:text-green-600'
                } before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-green-600 before:scale-x-0 before:origin-right before:transition-transform hover:before:scale-x-100 hover:before:origin-left`}
              >
                {link.name}
              </Link>
            ))}
            {externalLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-medium transition-colors ${
                  isHomePage && !isScrolled
                    ? 'text-white hover:text-green-400'
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? (
              <X className={`h-6 w-6 ${isHomePage && !isScrolled ? 'text-white' : 'text-gray-700'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isHomePage && !isScrolled ? 'text-white' : 'text-gray-700'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                location.pathname === link.path
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {externalLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;