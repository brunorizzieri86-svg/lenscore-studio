# LENS CORE STUDIO V0.6.1 — Relatório de atualização e auditoria

Data: **8 de outubro de 2026**

## Objetivo

Corrigir a desorganização visual da Agenda e da tela Inicial, ajustar o logo e substituir o financeiro resumido por uma estrutura gerencial para fotógrafos e videomakers.

## Tela Inicial

- “Hoje” passou a se chamar **Inicial**.
- Logo de acesso reduzido, centralizado e limitado por altura.
- Texto quebrado abaixo dos quatro botões removido.
- Ícone, título e descrição dos atalhos alinhados no celular.
- Demonstração antiga que mostrava “LUME Studio” passa a exibir **LENS CORE STUDIO**.

## Agenda

- Dia, Semana, Quinzenal, Mensal e Trimestral reunidos em um seletor compacto.
- Data, setas, botão “Ir para hoje” e total pertencem ao mesmo bloco.
- Calendário antes da lista; compromissos correspondentes logo abaixo.
- Filtro por todos, pendentes e concluídos.
- Cartões mantêm editar, concluir/reabrir, WhatsApp e excluir.
- Organização em duas linhas no celular, sem faixa horizontal.

## Financeiro completo

O módulo possui seis áreas:

1. **Visão geral:** recebidas, pagas, saldo realizado, saldo contratado, contas a pagar e vencidos.
2. **Movimentações:** filtros, categoria, conta, competência, pagamento, conferência, edição e exclusão.
3. **A receber:** parcelas dos clientes, vencimento e baixa.
4. **A pagar:** parcelas e custos de parceiros, vencimento e pagamento.
5. **Por trabalho:** contratado, recebido, despesas, resultado e margem.
6. **Contas e categorias:** saldo por conta e listas configuráveis.

Também inclui gráfico de seis meses, próximos vencimentos, ocultação de valores, lançamentos administrativos sem projeto, documento/observações, CSV detalhado e classificação automática das baixas de clientes e parceiros. As cores aparecem em bordas e etiquetas discretas.

## O que veio da análise do Meu Terreiro App

Foram adaptados os conceitos de período, contas, categorias, competência, conferência, previsão e separação entre realizado e pendente. A linguagem foi ajustada para cliente, trabalho, parceiro, parcela e margem da produção.

## Auditoria AQC

| Critério | Pontuação |
|---|---:|
| Funcionalidade e integração | 28/30 |
| Integridade e cálculos | 20/20 |
| Organização e responsividade | 16/20 |
| Backup, acesso e proteção | 18/20 |
| Documentação e entrega | 10/10 |
| **Total** | **92/100** |

Resultado: **APROVADO** pelo mínimo de 85%.

Foram aprovados **63 testes do núcleo** e **23 testes de Plano PRO/backup**, totalizando **86 verificações automatizadas**. Foram checados cálculos, cadastros, vínculos, parcelas, agenda, restauração, licenças e ausência da chave privada nos arquivos públicos.

## Limite da validação

A responsividade foi verificada pelas regras de layout e renderização lógica. Não houve inspeção manual em aparelho Android físico nesta rodada. Por isso a nota visual não recebeu pontuação máxima. Prints reais do novo Index podem orientar ajustes finos.

## Compatibilidade

- O armazenamento atual foi preservado.
- Registros antigos recebem valores padrão quando não têm categoria, conta ou competência.
- Backups anteriores continuam compatíveis.
- Contas e categorias entram no backup da versão 0.6.1.

## Próxima prioridade

A versão 0.7 deve conectar proposta, trabalho e recebimento: aceitar proposta, criar trabalho, definir parcelas e registrar o sinal sem recadastro. Depois entram orçamento mensal, recorrências, transferências, DRE e relatórios financeiros em PDF.

O arquivo **PLANO-EVOLUCAO-LENSCORE.md** contém a lista completa de ideias.
