# AQC — Lens Core Studio V0.7.6

## Resultado

**Status:** aprovado para entrega.  
**Meta mínima:** 85/100.  
**Pontuação AQC:** 97/100.

## Escopo validado

- Compilação de todos os scripts e do Service Worker.
- Financeiro analítico, filtros, categorias, rentabilidade, margem e ticket médio.
- Relatório PDF detalhado e exportação CSV por período.
- Categorias distintas para receitas e despesas.
- Plano PRO de 1, 6 e 12 meses diretamente na tela Mais.
- Fornecedores/parceiros e relatórios acessíveis em Mais e na tela Inicial.
- Cálculo de desconto à vista.
- Cartão de crédito de 1 a 12 parcelas, com ou sem juros.
- Persistência das condições em propostas e contratos.
- Inclusão das condições comerciais nos PDFs.
- Responsividade em telas pequenas.
- Regressão de iPhone, WhatsApp, agenda, GPS, backup, PDFs e ativação PRO.

## Critério de arredondamento

O total com juros é calculado em centavos. O valor exibido por parcela usa arredondamento para cima para nunca apresentar uma soma inferior ao total contratado. O PDF também informa o total exato no cartão.

## Dependências externas

A abertura do WhatsApp, mapas e compartilhamento depende do navegador e dos aplicativos instalados no aparelho. Os cálculos financeiros e a geração dos documentos permanecem locais.
