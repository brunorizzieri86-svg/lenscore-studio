# Lens Core Studio — atualização V0.7.4

Data: 13/10/2026

## Gerador PRO corrigido

- Substituído o código criptográfico longo por código curto no padrão operacional do arquivo de referência.
- Novo formato: `LCS-ABCDEFGH-1A123`.
- ID mantido no formato `LC-ABCD-EFGH`.
- Planos de 1, 6 e 12 meses.
- Sequências independentes de A a Z e 0 a 9.
- Um código por geração, com botão Copiar.
- Conferência do código e do ID dentro do próprio gerador.
- Mensagens específicas para formato incorreto, outro aparelho e código alterado.

## Ativação dentro do aplicativo

- Campo compacto para o código curto.
- Código normalizado em maiúsculas.
- Validação pelo mesmo algoritmo utilizado no gerador.
- Código vinculado ao ID exibido no aplicativo.
- Cada código é aceito somente uma vez.
- Na renovação, o novo período começa no vencimento atual, preservando os dias restantes.
- Licenças criptográficas antigas continuam compatíveis.
- Histórico de licenças permanece disponível.

## Correção do iPhone preservada

- Cabeçalho fora da área do relógio e sensores.
- Barra inferior acima da área do gesto do iPhone.
- Largura fixa em seis colunas.
- Zoom acidental por toque duplo bloqueado na navegação.
- Cache renovado para `lenscore-studio-v0.7.4`.

## Separação de segurança

O gerador existe somente no pacote administrativo completo e no ZIP separado do gerador. O pacote PWA para publicar não contém o gerador.
