import { useState } from "react";
import Text from "./ui/Text";
import Button from "./ui/Button";
import { useIsMobile } from "../hooks/useIsMobile";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import hopionCell from "../assets/hopion-cell.png";
import hopionSearch from "../assets/hopion-search.png";
import hopionLight from "../assets/hopion-light.png";
import hopionCard from "../assets/hopion-card.png";
import hopionDesk from "../assets/hopion-desk.png";
import hopionCycle from "../assets/hopion-cycle.png";
import hopionIa from "../assets/hopion-ia.png";
import hopionHelp from "../assets/hopion-help.png";
import hopionCode from "../assets/hopion-code.png";

type ServiceCategory = "landing" | "sistemas" | "integracoes" | "consultoria";

function About() {
  const isMobile = useIsMobile();
  const { scrollToSection } = useSmoothScroll();
  const [activeTab, setActiveTab] = useState<ServiceCategory>("landing");

  const scrollToForm = () => {
    scrollToSection("formSection");
  };

  const tabs = [
    { id: "landing" as ServiceCategory, label: "Landing Pages" },
    { id: "sistemas" as ServiceCategory, label: "Sistemas e Aplicações Web" },
    { id: "integracoes" as ServiceCategory, label: "Integrações e Automações" },
    { id: "consultoria" as ServiceCategory, label: "Consultoria Técnica" },
  ];

  const handlePrevTab = () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
    setActiveTab(tabs[prevIndex].id);
  };

  const handleNextTab = () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    const nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
    setActiveTab(tabs[nextIndex].id);
  };

  const services = {
    landing: [
      {
        title: "Landing Pages Otimizadas",
        description: "Páginas profissionais e estruturadas para gerar conversão, com foco em performance e navegação eficiente.",
        image: hopionSearch,
      },
      {
        title: "SEO & Identidade Visual",
        description: "Construção alinhada ao SEO e à identidade visual da sua marca, garantindo presença digital forte e consistente.",
        image: hopionLight,
      },
    ],
    sistemas: [
      {
        title: "Sistemas e Aplicações Web",
        description: "Desenvolvimento completo de sistemas internos e aplicações para o crescimento do seu negócio.",
        image: hopionCard,
      },
      {
        title: "Dashboards & Ferramentas Internas",
        description: "Soluções personalizadas, escaláveis e seguras para automatizar processos e ferramentas internas e plataformas sob demanda.",
        image: hopionDesk,
      },
    ],
    integracoes: [
      {
        title: "Integrações",
        description: "Conectamos seu software a APIs e serviços externos para centralizar dados e otimizar seu fluxo de trabalho.",
        image: hopionCycle,
      },
      {
        title: "Automações",
        description: "Automatizamos tarefas operacionais para reduzir erros, poupar tempo e melhorar a eficiência da sua operação.",
        image: hopionIa,
      },
    ],
    consultoria: [
      {
        title: "Consultoria Técnica",
        description: "Apoio especializado para empresários e equipes com tecnologias modernas.",
        image: hopionHelp,
      },
      {
        title: "Stack JavaScript",
        description: "Suporte em React, Node.js, TypeScript e outras ferramentas do ecossistema para soluções robustas e escaláveis.",
        image: hopionCode,
      },
    ],
  };

  const mobileCards = [
    {
      variant: "hero",
      title: "Sobre a Hopion",
      description: "A Hopion nasceu com um propósito simples: construir softwares que unem performance, design e tecnologia moderna.",
      image: hopionCell,
    },
    {
      variant: "plain",
      title: "Tecnologia que entrega",
      description: "Desenvolvimento rápido e eficiente com design moderno e responsivo para garantir sites otimizados, bonitos e funcionais.",
    },
    {
      variant: "plain",
      title: "Feito para você",
      description: "Soluções sob medida e suporte humano e direto, garantindo atendimento próximo e resultados alinhados ao seu negócio.",
    },
    {
      variant: "plain",
      title: "Somos apaixonados por transformar ideias",
      description: "Trabalhamos com foco em velocidade, personalização e resultado porque acreditamos que cada negócio merece uma solução feita sob medida.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-16 px-8" id="about">
      {!isMobile && (
        <div className={`flex ${isMobile ? "flex-col" : "flex-row justify-between items-start"} gap-8 mb-12`}>
          <div className={isMobile ? "" : "max-w-md"}>
            <Text
              variant={isMobile ? "medium-highlight" : "heading-md"}
              tag="h2"
              className="mb-6"
              text="Sobre a Hopion"
            />
            <Button variant="primary" onClick={scrollToForm}>
              Entrar em contato
            </Button>
          </div>

          <div className={isMobile ? "" : "max-w-xl"}>
            <Text
              variant={isMobile ? "small" : "body-large"}
              tag="p"
              text="A Hopion nasceu com um propósito simples: construir softwares que unem performance, design e tecnologia moderna."
            />
          </div>
        </div>
      )}

      {isMobile ? (
        <div className="flex flex-col gap-6 mb-12">
          {mobileCards.map((card, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 flex flex-col ${card.variant === "hero" ? "min-h-[260px] relative overflow-hidden bg-cover bg-center justify-center" : "bg-secondary"}`}
              style={card.variant === "hero" ? { backgroundImage: `url(${card.image})` } : undefined}
            >
              <div className={card.variant === "hero" ? "relative z-10" : ""}>
                <Text variant={card.variant === "hero" ? "medium-highlight" : "small-highlight"} tag="h3" className="mb-3" text={card.title} />
                <Text variant="small" tag="p" className="mb-4" text={card.description} />
                {card.variant === "hero" && (
                  <div className="mt-4">
                    <Button variant="primary" onClick={scrollToForm}>
                      Entrar em contato
                    </Button>
                  </div>
                )}
              </div>
              {card.variant !== "hero" && card.image && (
                <img src={card.image} alt={card.title} className="w-full h-auto object-contain rounded-lg mt-2" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-6 mb-12`}>
          <div
            className={`bg-secondary rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden bg-cover bg-center min-h-[300px] ${isMobile ? "w-full" : "flex-[1.2]"}`}
            style={{
              backgroundImage: `url(${hopionCell})`,
            }}
          >
            <Text
              variant={isMobile ? "small-highlight" : "medium-highlight"}
              tag="h3"
              className="relative z-10"
              text="Somos apaixonados por transformar ideias em projetos reais."
            />
            <Text
              variant="small"
              tag="p"
              className="relative z-10"
              text="Trabalhamos com foco em velocidade, personalização e resultado porque acreditamos que cada negócio merece uma solução feita sob medida."
            />
          </div>

          <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-6 ${isMobile ? "w-full" : "flex-[1.8]"}`}>
            <div className="bg-secondary rounded-3xl p-6 flex flex-col">
              <Text
                variant={isMobile ? "small-highlight" : "medium-highlight"}
                tag="h3"
                className="mb-3"
                text="Tecnologia que entrega"
              />
              <div className="flex-1 flex items-center">
                <Text
                  variant="small"
                  tag="p"
                  text="Desenvolvimento rápido e eficiente com design moderno e responsivo para garantir sites otimizados, bonitos e funcionais em qualquer dispositivo."
                />
              </div>
            </div>

            <div className="bg-secondary rounded-3xl p-6 flex flex-col">
              <Text
                variant={isMobile ? "small-highlight" : "medium-highlight"}
                tag="h3"
                className="mb-3"
                text="Feito para você"
              />
              <div className="flex-1 flex items-center">
                <Text
                  variant="small"
                  tag="p"
                  text="Soluções sob medida e suporte humano e direto, garantindo atendimento próximo e resultados alinhadas às necessidades do seu negócio."
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center" id="services">
        <Text
          variant={isMobile ? "medium-highlight" : "heading-md"}
          tag="h2"
          className="mb-6"
          text="Por que a Hopion é a Escolha Certa para seu Projeto?"
        />
        <Text
          variant={isMobile ? "small" : "body-large"}
          tag="p"
          className="mb-8 max-w-4xl mx-auto"
          text="Na Hopion, combinamos estratégia, design e tecnologia para criar soluções digitais inteligentes. Acompanhamos você em cada etapa do conceito ao lançamento, garantindo que sua marca se destaque e cresça de forma sustentável."
        />

        <div className="mb-12">
          {isMobile ? (
            <div className="relative flex items-center justify-between mb-4">
              <div
                onClick={handlePrevTab}
                className="cursor-pointer p-2 text-text-default hover:text-button-primary transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <Text
                variant="medium-highlight"
                tag="h3"
                text={tabs.find(t => t.id === activeTab)?.label || ""}
              />
              <div
                onClick={handleNextTab}
                className="cursor-pointer p-2 text-text-default hover:text-button-primary transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-0">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="cursor-pointer py-4 px-4 transition-all duration-300 text-center"
                >
                  <Text
                    variant="small"
                    tag="span"
                    className={`transition-colors duration-300 ${
                      activeTab === tab.id
                        ? "text-text-default"
                        : "text-text-default/60 hover:text-text-default"
                    }`}
                    text={tab.label}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="relative w-full h-1 bg-text-default/20 rounded-full overflow-hidden">
            <div
              className="absolute h-full transition-all duration-300 rounded-full"
              style={{
                width: `${100 / tabs.length}%`,
                left: `${(tabs.findIndex(t => t.id === activeTab) * 100) / tabs.length}%`,
                background: "linear-gradient(to right, #1853CE 0%, #063088 100%)",
              }}
            />
          </div>
        </div>

        {isMobile ? (
          <div className="overflow-x-auto flex gap-4 snap-x snap-mandatory pb-6">
            {services[activeTab].map((service, index) => (
              <div
                key={index}
                className="bg-secondary rounded-3xl p-6 flex-shrink-0 w-[80%] snap-center"
              >
                <Text
                  variant="small-highlight"
                  tag="h3"
                  className="mb-4"
                  text={service.title}
                />
                <Text
                  variant="small"
                  tag="p"
                  className="mb-6"
                  text={service.description}
                />
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8 mt-12">
            {services[activeTab].map((service, index) => (
              <div
                key={index}
                className="bg-secondary rounded-3xl p-6 text-left flex flex-col justify-between"
              >
                <Text
                  variant="medium-highlight"
                  tag="h3"
                  className="mb-4"
                  text={service.title}
                />
                <Text
                  variant="small"
                  tag="p"
                  className="mb-6"
                  text={service.description}
                />
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default About;
