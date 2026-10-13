# Lens Core Studio — Relatório de atualização V0.7.11

## Financeiro
- **Cadastro direto**: faixa "Cadastro direto" no topo (Receita, Despesa, Conta a receber, Conta a pagar) e um único formulário "Novo lançamento" com explicação embaixo de cada campo.
- **Forma de pagamento inteligente**: Cartão → Crédito/Débito. Crédito → parcelas (1–12) e juros (sim/não, %). Pix, Dinheiro, Débito, Transferência, Boleto e Outro → campo **Desconto** (R$ ou %). Vale para lançamentos, baixa de parcelas, recebimento de atribuições e contas a pagar/receber.
- **Despesas rápidas**: 18 itens pré-cadastrados (Luz, Internet, Locação do espaço…) + "➕ Incluir novo item". Categoria e descrição são preenchidas automaticamente.
- **Conta única**: apenas "Conta principal" + "➕ Cadastrar nova conta". Lançamentos antigos na conta "Dinheiro" são migrados para a Conta principal (a forma de pagamento "Dinheiro" é preservada).
- **Contas a pagar/receber**: agendamento direto, repetição mensal, baixa com desconto/juros, alertas de vencimento nas notificações.
- Relatórios e CSV com valor original, desconto, juros e parcelas.

## Avisos amigáveis
- Confirmações nativas do navegador (ex.: "Descartar as alterações não salvas?") substituídas por diálogo próprio do Lens Core.
- Mensagens de erro reescritas em tom mais claro (callout âmbar em vez de aviso de erro).

## Novo trabalho
- Seletor de serviços por **6 categorias** (Casamentos e eventos sociais; Comercial/corporativo; Retratos/moda/lifestyle; Shows/música/esportes; Redes sociais/digital; Documentário/natureza/jornalismo) com busca.
- **Cadastrar novo serviço** (ex.: "Chá de bebê + Foto + Vídeo") em "Meus serviços".
- Extras (Drone, Making of, Álbum, Segundo fotógrafo, etc.), formato, horário, horas de cobertura, convidados, equipe, entregáveis, referência.
- Entrada/sinal opcional gera automaticamente uma conta a receber.

## Tutorial
Novos passos: visão geral do Financeiro, lançamento direto, forma de pagamento, despesas, contas a pagar/receber, contas, serviço do trabalho.

## Qualidade
- `qa_validate_v077.js`: 43 verificações aprovadas, 0 falhas.
- Testes em navegador cobrindo formulários, descontos, parcelas, contas agendadas, migração e diálogos.

## Observações
- Cache do service worker atualizado (`lenscore-studio-v0.7.7`).
- `gerador-lenscore-pro.html` e `LEIA-ME.txt` **não** estão no ZIP (uso privado — não publicar).

## Correção iOS (V0.7.10) — telas "dançando" ao arrastar/rolar
- Causa: campos de data e opções do formulário saíam alguns pixels para fora da janela, permitindo arrasto lateral no iOS; a página de trás também rolava junto; o desfoque (blur) em camadas fixas causava tremor.
- Correções: trava de rolagem lateral nas janelas, página de fundo travada enquanto a janela está aberta, campos de data/hora ajustados à largura, desfoque removido no iOS, fonte 16px nos campos (evita zoom automático).
- Verificado em tela de 390px: nenhum formulário ultrapassa a largura. Recomenda-se testar no iPhone real.

## V0.7.10 — rolagem travando no celular
- Removido da V0.7.8 o bloqueio de arrasto (ouvinte global de toque) e a trava da página de fundo, que podiam fazer a rolagem "colar" no iPhone.
- Mantido: correção dos campos que estouravam a largura, janelas com rolagem contida, desfoque desligado no iOS.

## V0.7.10 — Mensagens do WhatsApp e paridade iOS/Android
- **Mais → Mensagens WhatsApp**: 11 modelos prontos (boas-vindas, proposta, confirmação da contratação, lembrete de sessão, reagendamento, material pronto, agradecimento, pedido de avaliação, lembrete de vencimento, cobrança em atraso, confirmação de recebimento).
- Cada modelo mostra **quando aparece** e **onde fica o botão**. Dá para personalizar (atalhos {cliente}, {valor}, {data}…), voltar ao original, copiar e enviar para qualquer cliente.
- Dados fixos: nome do estúdio, chave Pix e assinatura entram automaticamente.
- Botões nos contextos: tela do trabalho (bloco "Mensagens para o cliente", varia pela etapa), cartão do trabalho realizado (Agradecimento), Agenda (lembrete), Propostas, Financeiro → Contas a receber (faixa de atrasados em destaque + botão "Lembrete de cobrança" na frente de cada devedor; vencendo em até 3 dias → "Lembrar vencimento").
- Sem WhatsApp cadastrado, o WhatsApp abre para escolher o contato.
- **Paridade iOS/Android**: mesmo código nas duas plataformas; setas de seleção, campos, botões, fonte 16px e área segura do rodapé padronizados.
- Tutorial: novo passo "Mensagens do WhatsApp".

## V0.7.11 — Contratos com papel timbrado, assinatura e pasta do cliente
- **Contrato autopreenchido**: modelo completo (objeto, valor, prazos, direção artística, direitos autorais, cancelamento, condições gerais e foro) montado com os dados do cliente, do trabalho e do fotógrafo. Valores por extenso automáticos. Texto 100% editável depois de montado.
- **Cláusulas adicionais**: biblioteca (assinatura eletrônica, LGPD, drone, equipe adicional, álbum, uso comercial, deslocamento, menores de idade, guarda do material, clima, entrega expressa, confidencialidade) + cláusulas personalizadas. Entram numeradas antes do foro.
- **PDF timbrado**: logo e dados do fotógrafo no cabeçalho, rodapé com contato, numeração de páginas e código do contrato, campos de assinatura do contratante, assinatura e carimbo do fotógrafo e linhas de testemunhas (opcional). Há também o "PDF de revisão" sem assinatura.
- **Perfil do fotógrafo**: desenhar a assinatura com o dedo ou enviar foto (fundo removido automaticamente), enviar carimbo e informar dados extras do timbre.
- **Fluxo**: Rascunho → Gerado → Enviado (compartilhar/WhatsApp) → Assinado (ao anexar o PDF devolvido pelo cliente).
- **Pasta do cliente** (Clientes → Ver cliente): lista contratos e arquivos, com "Anexar arquivo", "Exportar arquivo" e "Excluir". Arquivos de até 5 MB, incluídos no backup.
- Nova mensagem de WhatsApp "Envio do contrato" e novo passo no tutorial.
- Observação: modelo de contrato de apoio; recomenda-se revisão jurídica. A assinatura eletrônica do cliente (ex.: gov.br) reforça a validade.
