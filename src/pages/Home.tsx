import React from 'react';
import { ArrowRight, CheckCircle, Users, Award, ChartBar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1605629713998-167cdc70afa2?auto=format&fit=crop&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-800/75" />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Piauí + Genética
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed animate-slide-up">
              Transformando a pecuária piauiense através da tecnologia e do melhoramento genético.
              Junte-se a nós nesta jornada de inovação e desenvolvimento sustentável.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up">
              <Link
                to="/inscricao"
                className="inline-flex items-center bg-white text-green-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Inscreva-se agora
                <ArrowRight className="ml-2" />
              </Link>
              <Link
                to="/faq"
                className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all"
              >
                Saiba mais
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">
            Por que escolher o Piauí + Genética?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <CheckCircle className="w-12 h-12 text-green-600" />,
                title: "Tecnologia Avançada",
                description: "Acesso às mais modernas técnicas de melhoramento genético e reprodução animal."
              },
              {
                icon: <Users className="w-12 h-12 text-green-600" />,
                title: "Suporte Especializado",
                description: "Equipe técnica qualificada para orientação e acompanhamento contínuo."
              },
              {
                icon: <Award className="w-12 h-12 text-green-600" />,
                title: "Resultados Comprovados",
                description: "Melhoria significativa na qualidade do rebanho e produtividade."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-green-700">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "1000+", label: "Produtores Atendidos" },
              { number: "5000+", label: "Inseminações Realizadas" },
              { number: "200+", label: "Técnicos Capacitados" },
              { number: "10", label: "Centrais de Apoio" }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-800 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Transforme seu Rebanho
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Junte-se aos produtores que já estão revolucionando a pecuária piauiense
            com o programa Piauí + Genética.
          </p>
          <Link
            to="/inscricao"
            className="inline-flex items-center bg-white text-green-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Comece Agora
            <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;