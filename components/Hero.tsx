"use client";

import { Sparkles, ShieldCheck, Star, Users, ArrowRight, Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToCalculator = () => {
    const el = document.getElementById("calculadora");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Luz ambiente de fundo */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="size-[500px] rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-500/5" />
        <div className="size-[400px] rounded-full bg-teal-500/10 blur-[140px] -translate-x-40" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge de Destaque */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-6 shadow-xs">
            <Sparkles className="size-3.5" />
            <span>Medicina Estética & Bem-Estar de Alta Performance</span>
          </div>

          {/* Título Principal */}
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl sm:leading-[1.15]">
            Realce sua beleza natural com{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-primary bg-clip-text text-transparent">
              precisão médica e transparência
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg sm:leading-relaxed">
            Descubra os protocolos mais avançados em harmonização, rejuvenescimento e saúde integrativa. Simule sua proposta em tempo real com nossa calculadora inteligente.
          </p>

          {/* Botões de Ação */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              onClick={scrollToCalculator}
              className="h-12 px-7 text-sm font-semibold shadow-md cursor-pointer gap-2"
            >
              <span>Calcular Orçamento em Tempo Real</span>
              <ArrowRight className="size-4" />
            </Button>

            <a
              href="https://wa.me/5511999999999?text=Olá!%20Vim%20pelo%20site%20da%20Lumina%20e%20gostaria%20de%20tirar%20algumas%20dúvidas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Falar com Concierge VIP
            </a>
          </div>

          {/* Bullets de confiança */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground font-medium">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-500" />
              Equipe Médica Especialista (CRM/RQE)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-500" />
              Tecnologias Aprovadas pela Anvisa e FDA
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-500" />
              Ambiente Privativo com Estacionamento
            </span>
          </div>

          {/* Grid de Métricas / Social Proof */}
          <div className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-4 rounded-2xl border border-border/80 bg-card/60 p-6 backdrop-blur-sm sm:grid-cols-4 sm:p-8">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-amber-500 mb-1">
                <Star className="size-4 fill-amber-500" />
                <span className="text-xl font-bold text-foreground">4.9 / 5</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">+1.400 avaliações no Google</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-emerald-600 mb-1">
                <Users className="size-4" />
                <span className="text-xl font-bold text-foreground">+5.200</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">Pacientes atendidos</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-teal-600 mb-1">
                <ShieldCheck className="size-4" />
                <span className="text-xl font-bold text-foreground">100%</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">Produtos estéreis e lacrados</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-primary mb-1">
                <Award className="size-4" />
                <span className="text-xl font-bold text-foreground">12 Anos</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">De excelência clínica</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
