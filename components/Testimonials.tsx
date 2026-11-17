import { Star, Quote, CheckCircle } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Dra. Camila Vasconcelos",
    role: "Advogada e Paciente há 3 anos",
    comment:
      "A transparência da calculadora foi o que me chamou a atenção. Sempre tive receio de surpresas em orçamentos de estética. Na Lumina, tudo foi cumprido à risca e os resultados do bioestimulador superaram minhas expectativas!",
    treatment: "Bioestimulador & Botox",
    rating: 5,
  },
  {
    name: "Rodrigo Mendonça",
    role: "Empresário",
    comment:
      "Fiz o protocolo Ultraformer para papada e contorno do rosto. Atendimento cirúrgico, médicos muito atenciosos e sem empurrar procedimentos desnecessários. Recomendo de olhos fechados.",
    treatment: "Ultrassom Microfocado",
    rating: 5,
  },
  {
    name: "Juliana Peixoto",
    role: "Arquiteta",
    comment:
      "Amei a facilidade de simular o plano trimestral online. Recebi o contato da equipe no WhatsApp em menos de 10 minutos e a consulta médica presencial confirmou exatamente o que combinamos.",
    treatment: "Harmonização & Peeling",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="scroll-mt-16 py-16 md:py-24 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1 text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="size-4 fill-amber-500" />
            ))}
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Histórias Reais de Pacientes Encantados
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            A satisfação e o bem-estar de quem confiou em nossos protocolos médicos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-xs relative overflow-hidden"
            >
              <Quote className="absolute right-4 top-4 size-10 text-muted/30 stroke-1 pointer-events-none" />
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="size-3.5 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic mb-6">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="border-t border-border/60 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <span>{t.name}</span>
                    <CheckCircle className="size-3 text-emerald-500 fill-emerald-500/20" />
                  </h4>
                  <p className="text-[11px] text-muted-foreground">{t.role}</p>
                </div>
                <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-foreground">
                  {t.treatment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
