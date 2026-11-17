"use client";

import { useState } from "react";
import { Sparkles, MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      {/* Top Bar Promocional */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-primary py-1.5 px-4 text-center text-xs font-medium text-white shadow-xs">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="size-3.5" />
          <span>Campanha Exclusiva: até 20% OFF em protocolos combinados este mês!</span>
          <button
            onClick={() => scrollToSection("calculadora")}
            className="underline underline-offset-2 ml-1 cursor-pointer font-bold hover:text-emerald-100"
          >
            Simular agora →
          </button>
        </span>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="size-5" />
          </div>
          <div>
            <span className="font-heading text-lg font-bold tracking-tight text-foreground">
              Lumina<span className="text-emerald-600">.</span>
            </span>
            <span className="block text-[10px] uppercase tracking-wider font-semibold text-muted-foreground -mt-1">
              Clínica & Bem-Estar
            </span>
          </div>
        </div>

        {/* Links Desktop */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <button
            onClick={() => scrollToSection("tratamentos")}
            className="transition-colors hover:text-foreground cursor-pointer"
          >
            Tratamentos
          </button>
          <button
            onClick={() => scrollToSection("calculadora")}
            className="transition-colors hover:text-foreground cursor-pointer"
          >
            Calculadora
          </button>
          <button
            onClick={() => scrollToSection("diferenciais")}
            className="transition-colors hover:text-foreground cursor-pointer"
          >
            Diferenciais
          </button>
          <button
            onClick={() => scrollToSection("depoimentos")}
            className="transition-colors hover:text-foreground cursor-pointer"
          >
            Depoimentos
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="transition-colors hover:text-foreground cursor-pointer"
          >
            Dúvidas
          </button>
        </nav>

        {/* CTAs Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20os%20tratamentos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <MessageCircle className="size-4" />
            <span>Falar no WhatsApp</span>
          </a>

          <Button
            size="sm"
            onClick={() => scrollToSection("calculadora")}
            className="cursor-pointer gap-1.5 shadow-sm"
          >
            <span>Simular Orçamento</span>
            <ArrowUpRight className="size-3.5" />
          </Button>
        </div>

        {/* Botão Mobile */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground focus:outline-none"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background px-4 pt-2 pb-6 md:hidden">
          <div className="flex flex-col gap-3 py-2 text-base font-medium">
            <button
              onClick={() => scrollToSection("tratamentos")}
              className="text-left py-1.5 text-muted-foreground hover:text-foreground"
            >
              Tratamentos
            </button>
            <button
              onClick={() => scrollToSection("calculadora")}
              className="text-left py-1.5 text-muted-foreground hover:text-foreground"
            >
              Calculadora Interativa
            </button>
            <button
              onClick={() => scrollToSection("diferenciais")}
              className="text-left py-1.5 text-muted-foreground hover:text-foreground"
            >
              Diferenciais
            </button>
            <button
              onClick={() => scrollToSection("depoimentos")}
              className="text-left py-1.5 text-muted-foreground hover:text-foreground"
            >
              Depoimentos
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-left py-1.5 text-muted-foreground hover:text-foreground"
            >
              Dúvidas Frequentes
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-2 pt-2 border-t border-border">
            <Button
              className="w-full cursor-pointer justify-center"
              onClick={() => scrollToSection("calculadora")}
            >
              Simular Orçamento Agora
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
