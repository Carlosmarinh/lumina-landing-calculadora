"use client";

import { useState, useMemo } from "react";
import {
  Calculator,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  User,
  MessageSquare,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

interface ServiceItem {
  id: string;
  name: string;
  category: "facial" | "corporal" | "longevidade";
  price: number;
  description: string;
  popular?: boolean;
}

const AVAILABLE_SERVICES: ServiceItem[] = [
  // Facial
  {
    id: "botox",
    name: "Toxina Botulínica (Botox Completo)",
    category: "facial",
    price: 980,
    description: "Tratamento de testa, glabela e pés de galinha com marcas consagradas.",
    popular: true,
  },
  {
    id: "hialuronico",
    name: "Preenchimento com Ácido Hialurônico (1ml)",
    category: "facial",
    price: 1250,
    description: "Contorno labial, malar ou definição de mandíbula com efeito natural.",
    popular: true,
  },
  {
    id: "sculptra",
    name: "Bioestimulador de Colágeno (Sculptra / Radiesse)",
    category: "facial",
    price: 2400,
    description: "Tratamento de flacidez profunda e estímulo celular prolongado por até 2 anos.",
  },
  {
    id: "ultraformer",
    name: "Ultrassom Microfocado (Efeito Lifting Facial)",
    category: "facial",
    price: 1850,
    description: "Lifting dérmico sem cirurgia, ancoragem muscular e estímulo de colágeno.",
  },
  {
    id: "peeling",
    name: "Peeling Químico Médico + Limpeza Fotônica",
    category: "facial",
    price: 420,
    description: "Renovação celular para manchas, poros dilatados e textura aveludada.",
  },

  // Corporal
  {
    id: "criolipolise",
    name: "Criolipólise 360° com Contraste Térmico",
    category: "corporal",
    price: 890,
    description: "Redução de gordura localizada com ponteira de sucção tridimensional.",
    popular: true,
  },
  {
    id: "drenagem",
    name: "Protocolo de Drenagem & Modelagem Corporal",
    category: "corporal",
    price: 210,
    description: "Ativação do sistema linfático, combate à retenção e alívio do inchaço.",
  },
  {
    id: "laser_corporal",
    name: "Laser Fracionado para Estrias & Firmeza",
    category: "corporal",
    price: 950,
    description: "Remodelamento da pele corporal para melhora visível de textura e estrias.",
  },

  // Longevidade e Saúde
  {
    id: "consulta_integrativa",
    name: "Consulta Médica Integrativa + Bioimpedância 3D",
    category: "longevidade",
    price: 450,
    description: "Check-up metabólico, composição corporal computadorizada e orientação preventiva.",
    popular: true,
  },
  {
    id: "soroterapia",
    name: "Soroterapia Avançada (Imunidade & Vitalidade)",
    category: "longevidade",
    price: 520,
    description: "Infusão intravenosa de antioxidantes, vitaminas e cofatores celulares de alta biodisponibilidade.",
  },
];

interface PlanOption {
  id: string;
  name: string;
  discountPercentage: number;
  description: string;
  badge?: string;
}

const PLAN_OPTIONS: PlanOption[] = [
  {
    id: "avulso",
    name: "Sessão Avulsa",
    discountPercentage: 0,
    description: "Ideal para experimentar ou realizar manutenção pontual.",
  },
  {
    id: "trimestral",
    name: "Plano Trimestral (3 sessões)",
    discountPercentage: 10,
    description: "Evolução progressiva com acompanhamento contínuo.",
    badge: "Mais Procurado (-10%)",
  },
  {
    id: "semestral",
    name: "Tratamento Completo (6 sessões)",
    discountPercentage: 20,
    description: "Resultados duradouros + Consulta de Retorno Cortesia.",
    badge: "Melhor Custo-Benefício (-20%)",
  },
];

interface AddonOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

const ADDON_OPTIONS: AddonOption[] = [
  {
    id: "concierge",
    name: "Canal Direto WhatsApp com Corpo Clínico",
    price: 90,
    description: "Tire dúvidas 7 dias por semana diretamente com os especialistas.",
  },
  {
    id: "scan_3d",
    name: "Mapeamento Fotográfico & Escaneamento 3D",
    price: 140,
    description: "Comparativo de antes e depois com tecnologia de volumetria.",
  },
  {
    id: "home_care",
    name: "Kit Home Care Dermocosméticos Personalizados",
    price: 280,
    description: "Fórmulas manipuladas específicas para potencializar seu resultado em casa.",
  },
];

export function BudgetCalculator() {
  // Estado da Calculadora
  const [activeCategory, setActiveCategory] = useState<"facial" | "corporal" | "longevidade">("facial");
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(["botox"]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("trimestral");
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  // Estado do Formulário de Lead
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    email: "",
    mensagem: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<{
    id?: string;
    nome: string;
    valor: number;
    protocolo: string;
    warningNote?: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Manipular seleção de serviços
  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // manter ao menos um
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  // Manipular seleção de opcionais
  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Formatar máscara do WhatsApp
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 11) val = val.slice(0, 11);

    if (val.length > 6) {
      val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    } else if (val.length > 2) {
      val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    } else if (val.length > 0) {
      val = `(${val}`;
    }
    setFormData((prev) => ({ ...prev, whatsapp: val }));
  };

  // Cálculos em tempo real
  const selectedPlan = useMemo(
    () => PLAN_OPTIONS.find((p) => p.id === selectedPlanId) || PLAN_OPTIONS[0],
    [selectedPlanId]
  );

  const selectedServices = useMemo(
    () => AVAILABLE_SERVICES.filter((s) => selectedServiceIds.includes(s.id)),
    [selectedServiceIds]
  );

  const selectedAddons = useMemo(
    () => ADDON_OPTIONS.filter((a) => selectedAddonIds.includes(a.id)),
    [selectedAddonIds]
  );

  const { subtotal, discountAmount, addonsTotal, finalTotal, pixPrice, installmentsPrice } =
    useMemo(() => {
      const servicesSum = selectedServices.reduce((acc, curr) => acc + curr.price, 0);
      const discount = (servicesSum * selectedPlan.discountPercentage) / 100;
      const discountedServices = servicesSum - discount;
      const addonsSum = selectedAddons.reduce((acc, curr) => acc + curr.price, 0);
      const total = discountedServices + addonsSum;

      return {
        subtotal: servicesSum,
        discountAmount: discount,
        addonsTotal: addonsSum,
        finalTotal: total,
        pixPrice: total * 0.95, // 5% extra no pix
        installmentsPrice: total / 10, // 10x sem juros
      };
    }, [selectedServices, selectedPlan, selectedAddons]);

  // Envio para o Supabase
  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validações básicas
    if (formData.nome.trim().length < 3) {
      setErrorMessage("Por favor, informe seu nome completo.");
      return;
    }

    const rawPhone = formData.whatsapp.replace(/\D/g, "");
    if (rawPhone.length < 10) {
      setErrorMessage("Por favor, informe um WhatsApp válido com DDD.");
      return;
    }

    setSubmitting(true);

    const leadPayload = {
      nome: formData.nome.trim(),
      whatsapp: formData.whatsapp,
      email: formData.email.trim() || null,
      servicos: selectedServices.map((s) => ({
        id: s.id,
        name: s.name,
        price: s.price,
        category: s.category,
      })),
      plano: selectedPlan.name,
      sessoes: selectedPlanId === "avulso" ? 1 : selectedPlanId === "trimestral" ? 3 : 6,
      valor_estimado: parseFloat(finalTotal.toFixed(2)),
      desconto_aplicado: parseFloat(discountAmount.toFixed(2)),
      mensagem: formData.mensagem.trim() || null,
      origem: "calculadora_web",
      status: "novo",
    };

    const protocolo = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      // Inserção direta sem .select() para respeitar a política RLS (onde SELECT é restrito a autenticados)
      const { error } = await supabase.from("leads").insert([leadPayload]);

      if (error) {
        console.error("Erro na inserção do Supabase:", error);
        setErrorMessage(
          `Erro ao gravar no Supabase: ${error.message} (Código: ${error.code || "desconhecido"}). Verifique as políticas de RLS ou a tabela leads.`
        );
        return;
      }

      // Confirmação de gravação bem-sucedida no banco
      setSubmittedLead({
        nome: formData.nome,
        valor: finalTotal,
        protocolo,
      });
    } catch (err: unknown) {
      console.error("Erro inesperado:", err);
      const msg = err instanceof Error ? err.message : "Falha na comunicação com o banco de dados.";
      setErrorMessage(`Erro ao enviar proposta: ${msg}`);
    } finally {
      setSubmitting(false);
    }
  };

  const resetCalculator = () => {
    setSubmittedLead(null);
    setFormData({ nome: "", whatsapp: "", email: "", mensagem: "" });
    setSelectedServiceIds(["botox"]);
    setSelectedPlanId("trimestral");
    setSelectedAddonIds([]);
  };

  const getWhatsAppDirectLink = () => {
    const servicesText = selectedServices.map((s) => s.name).join(", ");
    const text = encodeURIComponent(
      `Olá! Meu nome é ${formData.nome || "Visitante"}. Fiz uma simulação na calculadora da Clínica Lumina:\n\n` +
        `• Procedimentos: ${servicesText}\n` +
        `• Modalidade: ${selectedPlan.name}\n` +
        `• Valor Estimado: R$ ${finalTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\n\n` +
        `Gostaria de agendar uma avaliação com os especialistas!`
    );
    return `https://wa.me/5511999999999?text=${text}`;
  };

  return (
    <section id="calculadora" className="scroll-mt-16 py-16 md:py-24 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary mb-3">
            <Calculator className="size-3.5" />
            <span>Simulador Inteligente</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Calculadora de Orçamento em Tempo Real
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Selecione os procedimentos desejados, escolha a frequência ideal e receba na hora uma estimativa transparente de investimento com condições especiais.
          </p>
        </div>

        {/* Card de Sucesso após Envio do Lead */}
        {submittedLead ? (
          <div className="mx-auto max-w-2xl">
            <Card className="border-emerald-500/30 bg-card shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-white/20 mb-3 backdrop-blur-xs">
                  <Check className="size-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-bold">Proposta Solicitada com Sucesso!</h3>
                <p className="text-sm text-emerald-100 mt-1">
                  Protocolo de Atendimento: <span className="font-mono font-bold">{submittedLead.protocolo}</span>
                </p>
              </div>

              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className="rounded-xl border border-border bg-muted/40 p-4 space-y-3 text-sm">
                  <div className="flex justify-between items-center gap-4 pb-2 border-b border-border">
                    <span className="text-muted-foreground shrink-0 font-medium">Paciente:</span>
                    <span className="font-semibold text-foreground text-right">{submittedLead.nome}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4 pb-2 border-b border-border">
                    <span className="text-muted-foreground shrink-0 font-medium">Procedimentos:</span>
                    <span className="font-medium text-foreground text-right break-words max-w-[280px]">
                      {selectedServices.map((s) => s.name).join(" + ")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4 pb-2 border-b border-border">
                    <span className="text-muted-foreground shrink-0 font-medium">Plano selecionado:</span>
                    <span className="font-medium text-foreground text-right">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between items-baseline gap-4 pt-1 text-base">
                    <span className="font-bold text-foreground shrink-0">Investimento Estimado:</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-right">
                      R$ {submittedLead.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {submittedLead.warningNote && (
                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2">
                    <AlertCircle className="size-4 shrink-0 mt-0.5" />
                    <span>{submittedLead.warningNote}</span>
                  </div>
                )}

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>
                    • Nossa equipe médica entrará em contato via WhatsApp nas próximas horas para validar indicações e tirar dúvidas.
                  </p>
                  <p>• O orçamento inclui materiais originais lacrados, termo de rastreabilidade e retorno médico.</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={getWhatsAppDirectLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                  >
                    <MessageSquare className="size-4" />
                    <span>Conversar Agora no WhatsApp</span>
                  </a>

                  <Button
                    variant="outline"
                    onClick={resetCalculator}
                    className="cursor-pointer gap-2"
                  >
                    <RotateCcw className="size-4" />
                    <span>Nova Simulação</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Grid da Calculadora */
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            {/* LADO ESQUERDO: Seletor de Serviços, Planos e Opcionais (8 colunas) */}
            <div className="space-y-8 lg:col-span-7">
              {/* Etapa 1: Categorias e Serviços */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      1
                    </span>
                    <h3 className="text-base font-bold text-foreground">Escolha os Procedimentos</h3>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    {selectedServices.length} {selectedServices.length === 1 ? "selecionado" : "selecionados"}
                  </span>
                </div>

                {/* Abas de Categoria */}
                <div className="flex rounded-xl bg-muted p-1 mb-6 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveCategory("facial")}
                    className={`flex-1 py-2 text-center rounded-lg transition-all cursor-pointer ${
                      activeCategory === "facial"
                        ? "bg-background text-foreground shadow-xs font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Estética Facial
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategory("corporal")}
                    className={`flex-1 py-2 text-center rounded-lg transition-all cursor-pointer ${
                      activeCategory === "corporal"
                        ? "bg-background text-foreground shadow-xs font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Estética Corporal
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategory("longevidade")}
                    className={`flex-1 py-2 text-center rounded-lg transition-all cursor-pointer ${
                      activeCategory === "longevidade"
                        ? "bg-background text-foreground shadow-xs font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Saúde & Longevidade
                  </button>
                </div>

                {/* Lista de Procedimentos da Categoria Ativa */}
                <div className="space-y-3">
                  {AVAILABLE_SERVICES.filter((s) => s.category === activeCategory).map((service) => {
                    const isSelected = selectedServiceIds.includes(service.id);
                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`group relative flex cursor-pointer items-start justify-between gap-4 rounded-xl border p-4 transition-all ${
                          isSelected
                            ? "border-emerald-500/80 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-xs ring-1 ring-emerald-500/50"
                            : "border-border/70 bg-card hover:border-border hover:bg-muted/40"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                              isSelected
                                ? "border-emerald-600 bg-emerald-600 text-white"
                                : "border-muted-foreground/40 bg-background"
                            }`}
                          >
                            {isSelected && <Check className="size-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-semibold text-foreground">{service.name}</h4>
                              {service.popular && (
                                <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-400">
                                  Destaque
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <span className="block text-sm font-bold text-foreground">
                            R$ {service.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </span>
                          <span className="text-[11px] text-muted-foreground">por sessão</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Etapa 2: Frequência e Descontos */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    2
                  </span>
                  <h3 className="text-base font-bold text-foreground">
                    Plano de Frequência & Desconto Especial
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {PLAN_OPTIONS.map((plan) => {
                    const isSelected = selectedPlanId === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`flex cursor-pointer flex-col justify-between rounded-xl border p-4 transition-all ${
                          isSelected
                            ? "border-emerald-500/80 bg-emerald-50/50 dark:bg-emerald-950/20 ring-1 ring-emerald-500/50"
                            : "border-border/70 bg-card hover:border-border hover:bg-muted/30"
                        }`}
                      >
                        <div>
                          {plan.badge ? (
                            <span className="inline-block rounded-md bg-emerald-600/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                              {plan.badge}
                            </span>
                          ) : (
                            <span className="inline-block rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground mb-2">
                              Básico
                            </span>
                          )}
                          <h4 className="text-sm font-bold text-foreground">{plan.name}</h4>
                          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                            {plan.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-2 border-t border-border/60 flex items-center justify-between text-xs">
                          <span className="text-muted-foreground font-medium">Economia:</span>
                          <span
                            className={`font-bold ${
                              plan.discountPercentage > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
                            }`}
                          >
                            {plan.discountPercentage > 0 ? `${plan.discountPercentage}% OFF` : "Preço padrão"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Etapa 3: Cuidados Extras & Upgrades */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    3
                  </span>
                  <h3 className="text-base font-bold text-foreground">
                    Complementos Opcionais de Excelência
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {ADDON_OPTIONS.map((addon) => {
                    const isChecked = selectedAddonIds.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all ${
                          isChecked
                            ? "border-emerald-500/80 bg-emerald-50/40 dark:bg-emerald-950/20"
                            : "border-border/60 bg-card hover:bg-muted/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex size-4.5 shrink-0 items-center justify-center rounded-md border text-xs transition-colors ${
                              isChecked
                                ? "border-emerald-600 bg-emerald-600 text-white"
                                : "border-muted-foreground/40 bg-background"
                            }`}
                          >
                            {isChecked && <Check className="size-3 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-foreground">{addon.name}</span>
                            <p className="text-[11px] text-muted-foreground">{addon.description}</p>
                          </div>
                        </div>

                        <span className="text-xs font-bold text-foreground shrink-0 ml-2">
                          + R$ {addon.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* LADO DIREITO: Painel de Resumo & Formulário de Solicitação (5 colunas) */}
            <div className="lg:col-span-5 sticky top-24 space-y-6">
              <Card className="border-border/90 bg-card shadow-lg ring-1 ring-foreground/5">
                <CardHeader className="border-b border-border/60 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Sparkles className="size-4 text-emerald-600" />
                      <span>Resumo da Estimativa</span>
                    </CardTitle>
                    <Badge variant="secondary" className="text-[11px]">
                      Tempo Real
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    Valores atualizados conforme suas escolhas ao lado
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 space-y-5">
                  {/* Lista de itens selecionados */}
                  <div className="space-y-2 text-xs">
                    <span className="font-semibold text-muted-foreground block text-[11px] uppercase tracking-wider">
                      Itens Inclusos ({selectedServices.length}):
                    </span>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                      {selectedServices.map((s) => (
                        <div key={s.id} className="flex justify-between items-center text-foreground">
                          <span className="truncate max-w-[200px]">• {s.name}</span>
                          <span className="font-mono text-muted-foreground">
                            R$ {s.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      ))}
                      {selectedAddons.map((a) => (
                        <div key={a.id} className="flex justify-between items-center text-foreground text-[11px]">
                          <span className="truncate max-w-[200px] text-emerald-700 dark:text-emerald-400">
                            + {a.name}
                          </span>
                          <span className="font-mono text-muted-foreground">
                            R$ {a.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detalhamento financeiro */}
                  <div className="border-t border-border/80 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal dos procedimentos:</span>
                      <span className="font-mono">
                        R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between font-semibold text-emerald-600 dark:text-emerald-400">
                        <span>Desconto ({selectedPlan.discountPercentage}% no plano):</span>
                        <span className="font-mono">
                          - R$ {discountAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    )}

                    {addonsTotal > 0 && (
                      <div className="flex justify-between text-muted-foreground">
                        <span>Opcionais selecionados:</span>
                        <span className="font-mono">
                          + R$ {addonsTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    )}

                    <div className="border-t border-border/80 pt-2 flex items-baseline justify-between">
                      <div>
                        <span className="text-sm font-extrabold text-foreground block">
                          Total Estimado:
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {selectedPlan.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-foreground">
                          R$ {finalTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    {/* Formas facilitadas */}
                    <div className="rounded-lg bg-emerald-500/10 p-2.5 text-[11px] text-emerald-800 dark:text-emerald-300 space-y-1 mt-2">
                      <div className="flex justify-between font-medium">
                        <span>À vista no Pix (com +5% OFF):</span>
                        <span className="font-bold">
                          R$ {pixPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Ou parcelado no cartão:</span>
                        <span>10x de R$ {installmentsPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} sem juros</span>
                      </div>
                    </div>
                  </div>

                  {/* FORMULÁRIO DE CAPTURA DO LEAD */}
                  <form onSubmit={handleSubmitLead} className="border-t border-border pt-4 space-y-3.5">
                    <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <User className="size-3.5 text-primary" />
                      <span>Preencha para receber a proposta detalhada</span>
                    </div>

                    {errorMessage && (
                      <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-2.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                        <AlertCircle className="size-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <Label htmlFor="nome" className="text-xs">
                        Nome Completo *
                      </Label>
                      <Input
                        id="nome"
                        placeholder="Ex: Dra. Mariana Silva"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        required
                        className="h-9 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="whatsapp" className="text-xs">
                        WhatsApp com DDD *
                      </Label>
                      <Input
                        id="whatsapp"
                        placeholder="(11) 99999-9999"
                        value={formData.whatsapp}
                        onChange={handlePhoneChange}
                        required
                        className="h-9 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="email" className="text-xs">
                        E-mail (opcional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seuemail@exemplo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-9 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="mensagem" className="text-xs">
                        Alguma dúvida ou melhor horário? (opcional)
                      </Label>
                      <Input
                        id="mensagem"
                        placeholder="Ex: Prefiro contato no período da tarde"
                        value={formData.mensagem}
                        onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                        className="h-9 text-xs"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full h-11 text-sm font-bold shadow-md cursor-pointer gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                    >
                      {submitting ? (
                        <span>Enviando Proposta...</span>
                      ) : (
                        <>
                          <span>Solicitar Proposta</span>
                          <ArrowRight className="size-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1">
                      <ShieldCheck className="size-3 text-emerald-600" />
                      <span>Seus dados estão protegidos pela LGPD médica. Sem spam.</span>
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
