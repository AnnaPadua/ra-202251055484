# Vitrine Feiras — Fase 1

Protótipo de uma vitrine digital para feiras e eventos de negócios locais. O projeto foi desenvolvido somente com HTML5, CSS3 e JavaScript puro, sem frameworks, bibliotecas de interface ou etapa de compilação.

## Como executar

Abra `index.html` diretamente em um navegador moderno. Para evitar restrições do navegador ao conteúdo do mapa, também é possível servir a pasta com qualquer servidor HTTP local.

Exemplo com a extensão Live Server do VS Code:

1. Abra a pasta `fase-1` no VS Code.
2. Clique com o botão direito em `index.html`.
3. Selecione **Open with Live Server**.

O mapa usa uma incorporação do OpenStreetMap e precisa de conexão com a internet. Todo o restante da interface funciona sem dependências externas, com fontes de sistema como fallback.

## Páginas

- `index.html`: apresentação, números da plataforma e filtros de feiras por nome e categoria.
- `feira.html`: detalhes, programação, patrocinadores e empresas participantes.
- `empresa.html`: detalhes da empresa, filtros de produtos e inclusão no carrinho.
- `mapa.html`: localização do evento e acesso às empresas.
- `carrinho.html`: itens, cupom, resumo e formulário de checkout.
- `conta.html`: perfil, gamificação, pontos e recompensas.

## Funcionalidades

- Busca e filtro de feiras por nome, cidade e categoria.
- Busca e filtro de empresas por nome e segmento.
- Busca de produtos, categoria, faixa de preço e filtro de ofertas.
- Carrinho persistido em `localStorage` e contador também registrado em cookie.
- Alteração de quantidades, remoção de itens e cupom fictício `FEIRA10`.
- Checkout com validação nativa dos campos.
- Programação organizada por trilhas e lista de patrocinadores.
- Mapa do evento fornecido pelo OpenStreetMap.
- Menu responsivo e mensagens acessíveis para ações da interface.

## Estrutura

```text
fase-1/
├── assets/
│   ├── css/styles.css
│   └── js/
│       ├── app.js
│       └── data.js
├── index.html
├── feira.html
├── empresa.html
├── mapa.html
├── carrinho.html
├── conta.html
├── requirements.md
└── README.md
```

## Requisitos atendidos

- Seis páginas HTML interligadas por navegação.
- HTML5 semântico com cabeçalho, navegação, conteúdo principal, seções, artigos, formulários, áreas complementares e rodapé.
- Coleção de oito empresas exibida em cards na página da feira Rota Inova, além das listagens de eventos e produtos.
- Formulário de checkout com mais de cinco campos, labels e validações nativas (`required`, `type`, `pattern` e `minlength`).
- CSS próprio com custom properties para cores, tipografia, espaçamento, raios e sombras.
- Uso de Flexbox e CSS Grid de acordo com cada composição.
- Abordagem mobile-first com breakpoints em 640 px e 960 px e largura mínima suportada de 320 px.
- Recursos de acessibilidade: link para pular conteúdo, foco visível, contraste alto, labels, regiões ao vivo e navegação por teclado.

## Dados fictícios

Os conteúdos estão em `assets/js/data.js`. Todos os nomes, contatos, produtos, eventos, preços e patrocinadores são fictícios e servem exclusivamente para demonstração acadêmica.
