import { useEffect } from "react";
import Text from "./ui/Text";
import Button from "./ui/Button";
import { useIsMobile } from "../hooks/useIsMobile";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import Header from "./Header";
import smoothscroll from "smoothscroll-polyfill";
import hopionHero from "../assets/hopion-hero.png";
import hopionHandleWorld from "../assets/hopion-handle-world.png";

function Hero() {
  const isMobile = useIsMobile();
  const { scrollToSection } = useSmoothScroll();

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  const scrollToForm = () => {
    scrollToSection("formSection");
  };

  return (
    <>
      <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${hopionHero})`,
          }}
        />

        <Header />

        <div className="relative z-10 max-w-7xl mx-auto text-center px-8 flex-1 flex flex-col justify-center">
          <Text
            variant={isMobile ? "heading-md-highlight" : "heading-xl-highlight"}
            tag="h1"
            className={isMobile ? "mb-4" : "mb-6"}
            text="Hopion"
          />
          <Text
            variant={isMobile ? "small" : "body-large"}
            tag="p"
            className={`max-w-3xl mx-auto ${isMobile ? "mb-2" : "mb-8"}`}
            text="Criamos soluções digitais sob medida landing pages, sistemas e ferramentas que elevam o seu negócio para o próximo nível."
          />
        </div>

        <div className={`relative z-10 text-center px-8 ${isMobile ? "pb-6" : "pb-16"}`}>
          <Button variant="invisible" onClick={scrollToForm}>
            Falar com a Hopion
          </Button>
        </div>
      </section>

      <section className="relative w-full overflow-hidden px-8 mt-16">
        <div
          className="relative bg-cover bg-center bg-no-repeat rounded-3xl p-2 overflow-hidden"
          style={{
            backgroundImage: `url(${hopionHandleWorld})`,
          }}
        >
          <div className={`flex items-center h-full ${isMobile ? "py-12 px-8" : "py-12 px-16"}`}>
            <div className="max-w-2xl">
              <Text
                variant={isMobile ? "medium-highlight" : "heading-md-highlight"}
                tag="h2"
                className="mb-4"
                text="Quer tirar sua ideia do papel?"
              />
              <Text
                variant={isMobile ? "small" : "medium"}
                tag="p"
                className="mb-6"
                text="Conte pra gente e receba um retorno ainda hoje."
              />
              <Button variant="invisible" onClick={scrollToForm}>
                Falar com a Hopion
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
