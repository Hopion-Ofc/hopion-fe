import { useState, useEffect, useRef } from "react";
import Text from "./ui/Text";
import Button from "./ui/Button";
import { useIsMobile } from "../hooks/useIsMobile";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import smoothscroll from "smoothscroll-polyfill";
import logo from "../assets/logo.png";

function Header() {
  const isMobile = useIsMobile();
  const { smoothScrollTo, scrollToSection } = useSmoothScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    smoothscroll.polyfill();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile &&
        isMenuOpen &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isMobile]);

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 150);
  };

  const scrollToForm = () => {
    scrollToSection("formSection");
    closeMenu();
  };

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId);
    closeMenu();
  };

  const menuItems = [
    { label: "Página inicial", action: () => smoothScrollTo(0) },
    { label: "Sobre nós", action: () => handleScrollToSection("about") },
    { label: "Serviços", action: () => handleScrollToSection("services") },
    { label: "Contato", action: scrollToForm },
  ];

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-20 transition-all duration-300 px-4">
      <div
        ref={headerRef}
        className={`transition-all duration-300 mx-auto max-w-7xl ${
          (isScrolled && !isMenuOpen) || (isMobile && isMenuOpen)
            ? "backdrop-blur-md bg-primary-bg/80 shadow-lg rounded-3xl mt-4"
            : isMenuOpen && isMobile
            ? "backdrop-blur-md bg-primary-bg/80 shadow-lg rounded-3xl mt-4"
            : "bg-transparent"
        }`}
      >
        <nav className={`max-w-7xl mx-auto flex items-center justify-between py-6 px-8 ${isMobile && isMenuOpen ? "border-b border-text-default/20 mx-4" : ""}`}>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Hopion Logo" className="h-10 w-auto" />
          </div>

          {!isMobile && (
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-8">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  onClick={item.action}
                  className="text-text-default hover:text-button-primary transition-colors cursor-pointer"
                >
                  <Text variant="small" tag="span" text={item.label} />
                </div>
              ))}
            </div>
          )}

          {!isMobile && (
            <div>
              <Button variant="primary" onClick={scrollToForm}>
                Entrar em contato
              </Button>
            </div>
          )}

          {isMobile && (
            <div
              onClick={() => {
                if (isMenuOpen) {
                  closeMenu();
                } else {
                  setIsMenuOpen(true);
                }
              }}
              className="text-text-default z-30 cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </div>
          )}
        </nav>

        {isMobile && isMenuOpen && (
          <div className={`p-8 mb-6 ${isClosing ? 'animate-[slideUp_0.15s_ease-out]' : 'animate-[slideDown_0.3s_ease-out]'}`}>
            <ul className="flex flex-col gap-4 w-full">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  onClick={item.action}
                  className={`text-text-default hover:text-button-primary transition-colors cursor-pointer ${isClosing ? 'animate-[fadeOut_0.1s_ease-out]' : 'animate-[fadeIn_0.4s_ease-out] opacity-0'}`}
                  style={{ 
                    animationDelay: isClosing ? '0s' : `${index * 0.1}s`, 
                    animationFillMode: 'forwards' 
                  }}
                >
                  <Text variant="small" tag="span" text={item.label} />
                </li>
              ))}
              <li 
                className={`${isClosing ? 'animate-[fadeOut_0.1s_ease-out]' : 'animate-[fadeIn_0.4s_ease-out] opacity-0'}`}
                style={{ 
                  animationDelay: isClosing ? '0s' : `${menuItems.length * 0.1}s`, 
                  animationFillMode: 'forwards' 
                }}
              >
                <Button variant="primary-small" wide keepSize onClick={scrollToForm}>
                  Entrar em contato
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
