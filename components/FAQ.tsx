"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    question: "O valor da calculadora é exatamente o valor final que irei pagar?",
    answer:
      "A calculadora fornece uma estimativa de alta precisão baseada em nossos valores de tabela e campanhas ativas. Na consulta de avaliação presencial, o médico especialista examinará sua anatomia e indicará a dosagem exata (ex: quantidade de unidades de toxina ou mls de ácido hialurônico), podendo o valor ser ajustado para mais ou para menos conforme sua necessidade real.",
  },
  {
    question: "Como funciona o agendamento após solicitar a proposta?",
    answer:
      "Assim que você clica em 'Solicitar Proposta', seus dados chegam instantaneamente à nossa equipe de Concierge. Um profissional entrará em contato pelo WhatsApp para confirmar o horário mais conveniente, tirar dúvidas e enviar as orientações pré-procedimento.",
  },
  {
    question: "Quais são as condições e formas de pagamento aceitas?",
    answer:
      "Trabalhamos com Pix à vista com 5% de desconto adicional, cartões de crédito em até 10x sem juros (ou 12x com pequeno acréscimo), além de opções de faturamento corporativo para pacotes empresariais.",
  },
  {
    question: "Os procedimentos possuem tempo de recuperação (downtime)?",
    answer:
      "A maioria dos nossos protocolos (como Toxina Botulínica, Bioestimuladores e Drenagem) permite retorno imediato às atividades cotidianas e ao trabalho no mesmo dia, apenas com pequenas restrições de esforço físico nas primeiras 24 a 48 horas.",
  },
  {
    question: "A consulta médica inicial é obrigatória?",
    answer:
      "Sim. Por rigor ético e normas do Conselho Federal de Medicina (CFM), todo procedimento injetável ou com tecnologia de ponta é precedido por anamnese e exame clínico presencial detalhado para garantir total segurança à sua saúde.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="scroll-mt-16 py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3.5 py-1 text-xs font-semibold text-muted-foreground mb-3">
            <HelpCircle className="size-3.5 text-primary" />
            <span>Tire suas Dúvidas</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Tudo o que você precisa saber sobre nosso atendimento, valores e procedimentos.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-border/70 bg-card overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-foreground cursor-pointer hover:bg-muted/30 transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-emerald-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-border/50 px-5 pt-3 pb-5 text-xs text-muted-foreground leading-relaxed bg-muted/10">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
