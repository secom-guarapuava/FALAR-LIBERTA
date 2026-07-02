# FALAR TE LIBERTA — site da campanha (Guarapuava)

Landing **estática e responsiva** que apresenta o caminho de atendimento à violência
sexual com a identidade visual da campanha **FALAR TE LIBERTA** (cordel / xilogravura:
preto + ciano + creme). Pensada para abrir a partir do **QR Code** da campanha.

## Como ver
Abra o `index.html` no navegador (duplo clique). A fonte Exo 2 vem do Google Fonts
(precisa de internet); a Eldes Cordel já está embutida em `assets/fonts/`.

## Estrutura do conteúdo (enxuta, focada no fluxo)
**Hero** (identidade + mensagem) → **Acolhimento** (curto) → **O Fluxo** (até / após 72h, interativo)
→ **Contatos** (rede de proteção) → fechamento → rodapé.
Sem dados/estatísticas, sem os princípios da campanha e sem a explicação do conceito (defesa da KV).

## Arquivos
- `index.html` · `styles.css` · `script.js`
- `assets/` — grafismos **vetoriais** da campanha + `logos.png` + `fonts/EldesCordel.otf`
- `.nojekyll` — para o GitHub Pages servir `assets/` sem processamento

## Tipografia
- **Eldes Cordel** — títulos de maior destaque (só em frases sem acento; a versão Demo não
  tem glifos acentuados, então o `unicode-range` faz acentos caírem para a Exo 2).
- **Exo 2** (Google Fonts) — corpos de texto e títulos menores.

## Grafismos
Todos vindos dos **PDFs vetoriais** que você enviou (Asset 2–11 + Prancheta 8), exportados
inteiros e com transparência — sem cortes. Hero = pássaro com lanterna (versão com branco para
contraste); wordmark = "FALAR TE LIBERTA" (branca no hero, preta no fechamento).

## Rodapé
Parceria: **Prefeitura Municipal de Guarapuava** e **Câmara Municipal de Guarapuava** (logos vetoriais).
Rede de proteção: Vigilância em Saúde · Procuradoria da Mulher · Conselho Tutelar · CRAM · CREAS · #TAMO JUNTO.

## Publicar no GitHub Pages
1. Suba os arquivos na **raiz** de um repositório.
2. **Settings → Pages → Branch: `main` / `(root)` → Save**.
3. Aponte o **QR Code** para a URL gerada.

## Mantido conforme seu retorno
- (42) 9 8405-1929 como **uso exclusivo da rede de enfrentamento**.
- **Disque 100** + **Ligue 180**.
- **"Sair rápido"** (topo + tecla ESC).
- Respeita `prefers-reduced-motion`.
