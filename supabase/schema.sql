-- ==============================================================================
-- TABELA LEADS - CLÍNICA & AGÊNCIA LUMINA
-- Script SQL completo para rodar no SQL Editor do Supabase
-- ==============================================================================

-- 1. Garante a extensão para geração de UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Criação da tabela de leads
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    email TEXT,
    servicos JSONB NOT NULL DEFAULT '[]'::jsonb,
    plano TEXT NOT NULL DEFAULT 'Avulso',
    sessoes INTEGER DEFAULT 1,
    valor_estimado NUMERIC(10, 2) NOT NULL,
    desconto_aplicado NUMERIC(10, 2) DEFAULT 0.00,
    mensagem TEXT,
    origem TEXT DEFAULT 'calculadora_web',
    status TEXT DEFAULT 'novo', -- 'novo', 'em_contato', 'agendado', 'finalizado'
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Habilita o Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 4. Limpeza de políticas existentes (permite reexecutar sem erro)
DROP POLICY IF EXISTS "Permitir insercao publica anonima" ON public.leads;
DROP POLICY IF EXISTS "Permitir leitura apenas para autenticados" ON public.leads;
DROP POLICY IF EXISTS "Permitir atualizacao para autenticados" ON public.leads;

-- 5. POLÍTICA DE INSERÇÃO: Permite que visitantes (públicos/anônimos) salvem orçamentos
CREATE POLICY "Permitir insercao publica anonima"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 6. POLÍTICA DE LEITURA: Apenas administradores autenticados podem ver os leads
CREATE POLICY "Permitir leitura apenas para autenticados"
ON public.leads
FOR SELECT
TO authenticated
USING (true);

-- 7. POLÍTICA DE ATUALIZAÇÃO: Apenas administradores autenticados podem alterar status
CREATE POLICY "Permitir atualizacao para autenticados"
ON public.leads
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 8. Concede as permissões necessárias
GRANT ALL ON TABLE public.leads TO anon, authenticated, service_role;

-- 9. Índices para performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_whatsapp ON public.leads (whatsapp);
