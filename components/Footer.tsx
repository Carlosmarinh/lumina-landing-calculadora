import { Sparkles, MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-card text-card-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Coluna 1: Marca & Propósito */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
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
            <p className="text-xs text-muted-foreground leading-relaxed">
              Referência em medicina estética humanizada, rejuvenescimento e saúde integrativa com corpo clínico especializado.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-emerald-600" />
              <span>Responsável Técnico: Dra. R. Lumina • CRM/SP 148.920</span>
            </div>
          </div>

          {/* Coluna 2: Procedimentos Rápidos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Procedimentos
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>Toxina Botulínica Preventiva</li>
              <li>Preenchimento Facial & Labial</li>
              <li>Bioestimulador de Colágeno</li>
              <li>Ultrassom Microfocado</li>
              <li>Criolipólise 360°</li>
              <li>Soroterapia & Longevidade</li>
            </ul>
          </div>

          {/* Coluna 3: Horários & Contato */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Atendimento
            </h4>
            <div className="space-y-2.5 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <Clock className="size-3.5 shrink-0 mt-0.5 text-primary" />
                <span>Segunda a Sexta: 08h às 20h<br />Sábados: 09h às 15h</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-3.5 shrink-0 text-emerald-600" />
                <span>WhatsApp: (11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 shrink-0 text-primary" />
                <span>contato@clinicalumina.com.br</span>
              </div>
            </div>
          </div>

          {/* Coluna 4: Localização */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Unidade Jardins
            </h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="size-4 shrink-0 mt-0.5 text-primary" />
                <span>
                  Av. Brigadeiro Luís Antônio, 3500 - 12º andar<br />
                  Jardins, São Paulo - SP<br />
                  Estacionamento com Valet no Local
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Linha Inferior com Aviso Legal */}
        <div className="mt-12 border-t border-border/60 pt-6 text-center text-[11px] text-muted-foreground space-y-2">
          <p>
            As informações contidas neste website têm caráter meramente informativo e educacional. Não substituem a consulta médica presencial individualizada, em conformidade com o Código de Ética Médica (CFM).
          </p>
          <p>© 2026 Clínica Lumina - Todos os direitos reservados. Conectado via Supabase.</p>
        </div>
      </div>
    </footer>
  );
}
