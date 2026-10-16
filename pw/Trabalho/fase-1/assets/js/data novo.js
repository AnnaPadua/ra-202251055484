"use strict";

window.VITRINE_DATA = {
  markets: [
    {
      id: "market-001",
      name: "Feira Sabores do RN",
      organizer: "REDE SABORES",
      brandMark: "s!",
      brandTitle: "SABORES",
      brandSubtitle: "DO RN · 2026",
      headerColor: "#8b5cf6",
      status: "Acontecendo agora",
      dates: "18 a 27 de setembro",
      dateDays: "18 a 27",
      dateMonthYear: "de setembro · 2026",
      hours: "10h às 21h",
      city: "Natal · Centro de Convenções",
      venue: "Centro de Convenções",
      region: "Natal · Rio Grande do Norte",
      category: "Alimentos",
      categories: ["Alimentos", "Bebidas", "Artesanato"],
      participantCount: 8, // Atualizado para 8
      description: "Uma celebração dos sabores, ideias e pequenos negócios que movimentam Pernambuco.",
      color: "#c8ff4d",
      center: [-34.87105, -8.06151],
      // Adicionadas as empresas 022, 023 e 024 para completar 8 itens
      companies: ["company-001", "company-002", "company-015", "company-016", "company-017", "company-022", "company-023", "company-024"],
      supporters: [
        { name: "Banco Aurora", tier: "Diamante" },
        { name: "Rede Horizonte", tier: "Ouro" },
        { name: "Instituto Capibaribe", tier: "Prata" }
      ],
      scheduleDays: [{ id: 1, label: "Dia 1 · 18/09" }, { id: 2, label: "Dia 2 · 19/09" }],
      schedule: [
        { day: 1, time: "09:00", title: "Abertura: sabores que movimentam o RN", description: "Boas-vindas com produtores e realizadores", venue: "Palco Sabores" },
        { day: 1, time: "11:00", title: "Do campo à xícara", description: "Conversa com produtores de cafés especiais", venue: "Cozinha Escola" },
        { day: 1, time: "15:00", title: "Cozinha regional ao vivo", description: "Receitas, histórias e degustação", venue: "Arena Gourmet" },
        { day: 2, time: "10:00", title: "Cadeias curtas e comércio justo", description: "Painel com cooperativas locais", venue: "Palco Sabores" },
        { day: 2, time: "14:00", title: "Oficina de embalagem artesanal", description: "Atividade prática · 40 vagas", venue: "Sala Prática" },
        { day: 2, time: "18:00", title: "Encerramento com feira noturna", description: "Aberto ao público", venue: "Área Livre" }
      ]
    },
    {
      id: "market-002",
      name: "Feira Criativa Potiguar",
      organizer: "CRIATIVA RN",
      brandMark: "c!",
      brandTitle: "CRIATIVA",
      brandSubtitle: "POTIGUAR 2026",
      headerColor: "#8b5cf6",
      status: "Acontecendo agora",
      dates: "20 a 24 de setembro",
      dateDays: "20 a 24",
      dateMonthYear: "de setembro · 2026",
      hours: "14h às 22h",
      city: "Natal · Praia de Ponta Negra",
      venue: "Praia de Ponta Negra",
      region: "Natal · Rio Grande do Norte",
      category: "Moda",
      categories: ["Moda", "Design", "Artesanato"],
      participantCount: 8, // Atualizado para 8
      description: "Moda, artesanato, design e cultura feitos por criadores que carregam o Agreste em cada detalhe.",
      color: "#8b5cf6",
      center: [-35.96997, -8.28455],
      // Adicionadas as empresas 025, 026, 027 e 028 para completar 8 itens
      companies: ["company-003", "company-004", "company-018", "company-019", "company-025", "company-026", "company-027", "company-028"],
      supporters: [
        { name: "Serra Viva", tier: "Mandacaru" },
        { name: "Fundação Asa Branca", tier: "Caroá" }
      ],
      scheduleDays: [{ id: 1, label: "Dia 1 · 07/11" }, { id: 2, label: "Dia 2 · 08/11" }],
      schedule: [
        { day: 1, time: "10:00", title: "Criatividade como modelo de negócio", description: "Com Carla Nogueira", venue: "Palco Mandacaru" },
        { day: 1, time: "14:00", title: "Moda autoral e território", description: "Referências locais na criação de coleções", venue: "Palco Caroá" },
        { day: 1, time: "17:00", title: "Fotografia de produto com celular", description: "Oficina prática · 35 vagas", venue: "Sala Prática" },
        { day: 2, time: "09:30", title: "Design que nasce do território", description: "Painel com criadores do Agreste", venue: "Palco Mandacaru" },
        { day: 2, time: "15:00", title: "Rodada de negócios criativos", description: "Encontro entre marcas e compradores", venue: "Arena Criativa" },
        { day: 2, time: "17:00", title: "Desfile novos criadores", description: "Coletivo Fio da Terra", venue: "Passarela" }
      ]
    },
    {
      id: "market-003",
      name: "Expo Casa & Construção",
      organizer: "CASA NORDESTE",
      brandMark: "e!",
      brandTitle: "EXPO CASA",
      brandSubtitle: "CONSTRUÇÃO 2026",
      headerColor: "#8b5cf6",
      status: "Em breve",
      dates: "9 a 12 de outubro",
      dateDays: "9 a 12",
      dateMonthYear: "de outubro · 2026",
      hours: "9h às 20h",
      city: "Parnamirim · Arena Expo",
      venue: "Arena Expo",
      region: "Parnamirim · Rio Grande do Norte",
      category: "Casa",
      categories: ["Casa", "Serviços", "Tecnologia"],
      participantCount: 8, // Atualizado para 8
      description: "Soluções acessíveis de arquitetura, energia e decoração para casas melhores e mais eficientes.",
      color: "#ff7058",
      center: [-34.89209, -7.99115],
      // Adicionadas as empresas 029, 030, 031 e 032 para completar 8 itens
      companies: ["company-005", "company-006", "company-020", "company-021", "company-029", "company-030", "company-031", "company-032"],
      supporters: [{ name: "Construir Nordeste", tier: "Ouro" }],
      scheduleDays: [{ id: 1, label: "Dia 1 · 09/10" }, { id: 2, label: "Dia 2 · 10/10" }],
      schedule: [
        { day: 1, time: "09:00", title: "Abertura: a casa do futuro", description: "Tendências acessíveis para morar melhor", venue: "Palco Casa" },
        { day: 1, time: "11:00", title: "Energia solar sem complicação", description: "Com Beatriz Dantas", venue: "Palco Energia" },
        { day: 1, time: "15:00", title: "Design circular na prática", description: "Materiais,超 processos e casos reais", venue: "Arena Design" },
        { day: 2, time: "10:30", title: "Reforma eficiente e econômica", description: "Painel de especialistas", venue: "Palco Casa" },
        { day: 2, time: "14:00", title: "Oficina de iluminação", description: "Atividade prática · 30 vagas", venue: "Sala Prática" }
      ]
    },
    {
      id: "market-004",
      name: "Rota Inova · Vitrine de Startups",
      organizer: "INOVA NORDESTE",
      brandMark: "r!",
      brandTitle: "ROTA",
      brandSubtitle: "INOVA 2026",
      headerColor: "#8b5cf6",
      status: "Em breve",
      dates: "18 e 19 de setembro",
      dateDays: "18 e 19",
      dateMonthYear: "de setembro · 2026",
      hours: "9h às 19h",
      city: "Natal · Centro de Convenções",
      venue: "Centro de Convenções",
      region: "Natal · Rio Grande do Norte",
      category: "Tecnologia",
      categories: ["Tecnologia", "Serviços", "Agro"],
      participantCount: 8,
      description: "Startups, comunidades e investidores reunidos para conectar problemas reais a soluções locais.",
      color: "#50d8d7",
      center: [-34.87178, -8.06312],
      companies: ["company-007", "company-008", "company-009", "company-010", "company-011", "company-012", "company-013", "company-014"],
      supporters: [{ name: "Hub Atlântico", tier: "Diamante" }],
      scheduleDays: [{ id: 1, label: "Dia 1 · 18/09" }, { id: 2, label: "Dia 2 · 19/09" }],
      schedule: [
        { day: 1, time: "09:00", title: "Abertura — o Nordeste que empreende", description: "Governo do RN · Inova Nordeste", venue: "Palco Rota" },
        { day: 1, time: "10:30", title: "Do laboratório ao mercado: pesquisa que gera receita", description: "Painel com UFRN, Embrapa e 2 spin-offs", venue: "Palco Ciência" },
        { day: 1, time: "13:00", title: "Rodada de negócios — agro e energia", description: "42 startups · 11 compradores âncora", venue: "Arena Deals" },
        { day: 1, time: "15:00", title: "Como levantar a primeira rodada fora do eixo sul", description: "Fundos regionais e anjos locais", venue: "Palco Capital" },
        { day: 1, time: "17:00", title: "Oficina: pricing para vender na feira", description: "Hands-on · 60 vagas", venue: "Sala Prática" },
        { day: 1, time: "19:00", title: "Show de abertura + feira noturna", description: "Aberto ao público", venue: "Área Livre" },
        { day: 2, time: "09:30", title: "Tecnologia feita no Nordeste", description: "Casos de crescimento fora do eixo", venue: "Palco Rota" },
        { day: 2, time: "11:00", title: "Deep tech aplicada ao semiárido", description: "Pesquisa, produto e impacto regional", venue: "Palco Ciência" }
      ]
    }
  ]
};