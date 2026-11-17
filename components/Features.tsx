import {
  Shield,
  Activity,
  HeartHandshake,
  Sparkles,
  Award,
  Zap,
  Building2,
} from "lucide-react";

const DIFFERENTIALS = [
  {
    icon: Award,
    title: "Corpo Clínico Especialista",
    description:
      "Médicos dermatologistas e cirurgiões com títulos reconhecidos pela Associação Médica Brasileira e CRM/RQE ativo.",
  },
  {
    icon: Zap,
    title: "Tecnologias Padrão-Ouro",
    description:
      "Equipamentos importados de última geração devidamente certificados pela Anvisa e FDA para máxima segurança.",
  },
  {
    icon: Shield,
    title: "Insumos 100% Lacrados e Originais",
    description:
      "Apresentamos os lacres e números de lote de toxinas e ácidos hialurônicos diretamente a você antes da aplicação.",
  },
  {
    icon: HeartHandshake,
    title: "Abordagem Naturalista e Individualizada",
    description:
      "Sem exageros ou padronizações. O objetivo é realçar sua anatomia preservando sua identidade e expressividade.",
  },
  {
    icon: Activity,
    title: "Mapeamento Fotográfico 3D",
    description:
      "Avaliação inicial computadorizada e comparativo de alta precisão entre o antes e depois do seu protocolo.",
  },
  {
    icon: Building2,
    title: "Ambiente VIP e Acolhedor",
    description:
      "Consultórios privativos, atendimento pontual, lounge com café gourmet e serviço de manobrista cortesia.",
  },
];

export function Features() {
  return (
    <section id="diferenciais" className="scroll-mt-16 py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3.5 py-1 text-xs font-semibold text-muted-foreground mb-3">
            <Sparkles className="size-3.5 text-primary" />
            <span>Excelência Médica</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Por que confiar seu cuidado à Lumina?
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Combinamos ciência de ponta, ética médica inegociável e hospitalidade para proporcionar uma experiência transformadora.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIALS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-border/70 bg-card p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-md"
              >
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
