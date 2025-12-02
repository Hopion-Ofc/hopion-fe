import { useState, useEffect } from "react";
import Text from "./ui/Text";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { useIsMobile } from "../hooks/useIsMobile";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import hopion_eclipse from "../assets/hopion-eclipse.png";
import hopion_eclipse_mobile from "../assets/hopion-eclipse-mobile.png";
import smoothscroll from 'smoothscroll-polyfill';
import { contactService } from "../services/api";

function Footer() {
  const isMobile = useIsMobile();
  const isXMobile = useIsMobile(500);
  const { scrollToSection } = useSmoothScroll();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    descricao: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      await contactService.sendContact({
        name: formData.nome,
        email: formData.email,
        subject: 'Nova ideia de software',
        message: formData.descricao,
      });

      setSubmitStatus({
        type: 'success',
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      });
      setFormData({ nome: '', email: '', descricao: '' });
    } catch (error: unknown) {
      const apiError = error as { errors?: Array<{ message: string }> };
      setSubmitStatus({
        type: 'error',
        message: apiError?.errors?.[0]?.message || 'Erro ao enviar mensagem. Tente novamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    scrollToSection("formSection");
  };

  return (
    <footer>
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div
          className={
            isMobile
              ? "flex flex-col text-start gap-5"
              : "flex flex-col text-center gap-5"
          }
        >
          <Text
            variant={isMobile ? "medium-highlight" : "heading-md"}
            tag="span"
            text="Como funciona?"
          />
          <Text
            variant={isMobile ? "small" : "body-large"}
            className="mb-5"
            tag="p"
            text="Transformamos sua ideia em uma solução digital completa. Da pesquisa ao lançamento, guiamos cada etapa com transparência, colaboração e foco nos resultados."
          />
        </div>

        <div
          className={`flex gap-3 ${
            isMobile ? "overflow-x-auto snap-x snap-mandatory" : "justify-center"
          } px-4
  `}
        >
          {[
            {
              num: "1",
              title: "Você envia sua ideia",
              text: "Preencha o formulário ou fale conosco pelo WhatsApp e conte o que você quer criar",
            },
            {
              num: "2",
              title: "Planejamos juntos",
              text: "Entendemos sua necessidade e enviamos uma proposta personalizada e transparente.",
            },
            {
              num: "3",
              title: "Desenvolvemos seu software",
              text: "Usamos as melhores tecnologias para entregar um produto rápido, bonito e funcional.",
            },
            {
              num: "4",
              title: "Você lança e cresce",
              text: "Receba seu projeto pronto para uso, com suporte e acompanhamento da nossa equipe",
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`flex flex-col gap-5 rounded-2xl p-6 ${
                isMobile ? "w-64 bg-secondary snap-start flex-shrink-0" : "w-64"
              }`}
            >
              <Text
                variant={isMobile ? "medium-highlight" : "heading-md-highlight"}
                tag="h3"
                text={card.num}
              />
              <Text
                variant={isMobile ? "small-highlight" : "medium-highlight"}
                tag="h4"
                text={card.title}
              />
              <Text variant="small" tag="p" text={card.text} />
            </div>
          ))}
        </div>

        <div className="relative my-16">
          <img
            src={isMobile ? hopion_eclipse_mobile : hopion_eclipse}
            alt="Hopion Eclipse"
            className={`w-auto max-w-full ${!isMobile ? 'rounded-lg' : ''}`}
          />
          <div className={`absolute top-1/2 transform -translate-y-1/2 text-left ${isXMobile ? 'right-3 left-[50%]' : isMobile ? 'right-4 left-[50%]' : 'right-8 left-[50%]'}`}>
            <div className="max-w-full">
              <Text
                variant={isXMobile ? "xxsmall-highlight" : isMobile ? "xsmall-highlight" : "heading-sm-highlight"}
                tag="h2"
                className={isXMobile ? "mb-1 leading-tight" : isMobile ? "mb-2 leading-tight" : "mb-4"}
                text="Quer começar seu projeto agora?"
              />
              <Text
                variant={isXMobile ? "xxsmall" : isMobile ? "xxsmall" : "medium"}
                tag="p"
                className={isXMobile ? "mb-1.5 leading-tight" : isMobile ? "mb-2 leading-tight" : "mb-3"}
                text="Fale com a gente e transforme sua visão em realidade."
              />
              <Button variant="invisible" onClick={scrollToForm}>Falar com a Hopion</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12" id="formSection">
          <div className="flex flex-col justify-center">
            <Text
              variant={isMobile ? "medium-highlight" : "heading-md"}
              className="mb-6"
              tag="h2"
              text="Entre em contato conosco e aproveite diversas ideias que podem se tornar realidade."
            />
            <Text
              variant={isMobile ? "small" : "body-large"}
              tag="p"
              text={
                <>
                  Compartilhe{" "}
                  <Text
                    variant={
                      isMobile ? "small-highlight" : "body-large-highlight"
                    }
                    tag="span"
                    text="sua ideia com a Hopion"
                  />{" "}
                  e receba um retorno personalizado da nossa equipe para{" "}
                  <Text
                    variant={
                      isMobile ? "small-highlight" : "body-large-highlight"
                    }
                    tag="span"
                    text="transformar seu projeto em realidade"
                  />
                  .
                </>
              }
            />
          </div>

          <div className="bg-secondary rounded-2xl py-12 px-7.5">
            <form onSubmit={handleSubmit}>
              <Input
                label="Nome completo"
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder=""
              />
              <Input
                label="E-mail"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=""
              />
              <Input
                label="Descrição da ideia de software"
                type="textarea"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder=""
                rows={6}
              />
              
              {submitStatus.type && (
                <div
                  className={`mb-4 p-4 rounded-2xl border-2 ${
                    submitStatus.type === 'success'
                      ? 'bg-success-bg border-success-border'
                      : 'bg-error-bg border-error-border'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Text
                      variant={submitStatus.type === 'success' ? 'success-icon' : 'error-icon'}
                      tag="span"
                      text={submitStatus.type === 'success' ? '✓' : '⚠'}
                    />
                    <div className="flex-1">
                      <Text
                        variant={submitStatus.type === 'success' ? 'success-title' : 'error-title'}
                        tag="p"
                        className="mb-1"
                        text={submitStatus.type === 'success' ? 'Sucesso!' : 'Erro'}
                      />
                      <Text
                        variant={submitStatus.type === 'success' ? 'success-message' : 'error-message'}
                        tag="p"
                        text={submitStatus.message}
                      />
                    </div>
                  </div>
                </div>
              )}

              <Button
                variant={isMobile ? "primary-small" : "primary"}
                type="submit"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar minha Ideia'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;