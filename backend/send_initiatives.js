/*
 Temporarily script to test API endpoints, please delete it 
 after the actual backend tests are created
*/

const BASE = process.env.BASE_URL || 'http://localhost:3000';

async function req(method, path, body) {
  const url = `${BASE}${path}`;
  const init = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body !== undefined) init.body = JSON.stringify(body);
  const res = await fetch(url, init);
  const text = await res.text();
  let json;
  try { json = text ? JSON.parse(text) : null; } catch { json = text; }
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} ${res.statusText} for ${method} ${path}`);
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}

async function sendInitiatives(user) {
    const initiatives = [
      {
        title: 'Portal Interativo para Onboarding de Novos Investidores',
        description: 'Processo de onboarding de novos investidores na bolsa',
        theme: 'Cultura',
        context: 'Processo de onboarding de novos investidores na bolsa',
        deliverable: 'Portal interativo que oriente novos investidores sobre produtos, riscos e oportunidades do mercado de capitais',
        evaluationCriteria: 'Número de acessos, taxa de conclusão das trilhas e feedback dos usuários.',
        authorId: user.id,
      },
      {
        title: 'Restaurante Corporativo Inteligente',
        description: 'Reduzir atrasos e otimizar o tempo de almoço dos funcionários',
        theme: 'Cultura',
        context: 'Funcionários perdem tempo durante as duas horas de almoço devido a atrasos e filas',
        deliverable: 'Restaurante interno com sistema de pedidos antecipados e cardápio digital',
        evaluationCriteria: 'Tempo médio de espera, satisfação dos funcionários, adesão ao sistema',
        authorId: user.id,
      },
      {
        title: 'Programa de Mentoria para Novos Colaboradores',
        description: 'Facilitar integração e desenvolvimento de novos funcionários',
        theme: 'Governança',
        context: 'Novos colaboradores têm dificuldades de adaptação nos primeiros meses',
        deliverable: 'Plataforma de mentoria conectando novos e antigos funcionários',
        evaluationCriteria: 'Taxa de retenção, avaliações de satisfação, número de interações mentor-mentorado',
        authorId: user.id,
      },
      {
        title: 'Campanha de Reciclagem Comunitária',
        description: 'Aumentar a participação da comunidade na reciclagem',
        theme: 'Ecossistema',
        context: 'Baixa taxa de reciclagem em bairros urbanos',
        deliverable: 'Relatórios mensais sobre recicláveis coletados e taxa de participação',
        evaluationCriteria: 'Toneladas coletadas, % de participação domiciliar, feedback da comunidade',
        authorId: user.id,
      },
      {
        title: 'Plataforma de Ideias Inovadoras',
        description: 'Canal digital para coleta e avaliação de ideias dos funcionários',
        theme: 'Governança',
        context: 'Falta de espaço estruturado para sugestões internas',
        deliverable: 'Portal online para submissão, votação e acompanhamento de ideias',
        evaluationCriteria: 'Número de ideias submetidas, taxa de implementação, engajamento dos funcionários',
        authorId: user.id,
      },
      {
        title: 'Trilhas de Capacitação Digital',
        description: 'Capacitar colaboradores em ferramentas digitais essenciais',
        theme: 'P&D',
        context: 'Necessidade de atualização digital dos times administrativos',
        deliverable: 'Cursos online e workshops presenciais sobre ferramentas digitais',
        evaluationCriteria: 'Nível de proficiência pós-treinamento, participação, avaliações dos cursos',
        authorId: user.id,
      },
      {
        title: 'Semana da Saúde Mental',
        description: 'Promover bem-estar e saúde mental no ambiente de trabalho',
        theme: 'Cultura',
        context: 'Aumento de casos de estresse e ansiedade entre colaboradores',
        deliverable: 'Palestras, rodas de conversa e atividades de relaxamento',
        evaluationCriteria: 'Participação, avaliações dos eventos, redução de afastamentos por saúde mental',
        authorId: user.id,
      },
      {
        title: 'Hackathon de Soluções Internas',
        description: 'Engajar equipes na resolução de desafios internos',
        theme: 'P&D',
        context: 'Necessidade de soluções criativas para problemas operacionais',
        deliverable: 'Evento de hackathon com premiação para melhores soluções',
        evaluationCriteria: 'Número de soluções implementadas, engajamento, feedback dos participantes',
        authorId: user.id,
      },
      {
        title: 'Programa de Voluntariado Empresarial',
        description: 'Estimular o engajamento social dos colaboradores',
        theme: 'Ecossistema',
        context: 'Baixa participação em ações sociais promovidas pela empresa',
        deliverable: 'Calendário anual de ações voluntárias e parcerias com ONGs',
        evaluationCriteria: 'Número de voluntários, impacto social mensurado, satisfação dos participantes',
        authorId: user.id,
      },
      {
        title: 'Sistema de Feedback Contínuo',
        description: 'Aprimorar a cultura de feedback entre equipes',
        theme: 'Governança',
        context: 'Feedbacks são realizados apenas em avaliações anuais',
        deliverable: 'Ferramenta digital para feedbacks rápidos e anônimos',
        evaluationCriteria: 'Frequência de feedbacks, satisfação dos colaboradores, melhoria nos indicadores de clima',
        authorId: user.id,
      }
    ];

    const createdInitiatives = [];
    for (const initiative of initiatives) {
      const created = await req('post', '/initiatives', initiative);
      createdInitiatives.push(created);
    }

    return createdInitiatives;
}

function logStep(title, data) {
  console.log(`\n=== ${title} ===`);
  if (data !== undefined) {
    try {
      console.log(JSON.stringify(data, null, 2));
    } catch {
      console.log(data);
    }
  }
}

(async () => {
  try {
    logStep('Base URL', BASE);

    // 1) Create two users
    const userA = await req('POST', '/users', {
      name: 'Alice Tester',
      email: `alice_${Date.now()}@example.com`,
    });
    logStep('Created User A', userA);

    const userB = await req('POST', '/users', {
      name: 'Bob Reviewer',
      email: `bob_${Date.now()}@example.com`,
    });
    logStep('Created User B', userB);

    // 2) List users
    const users = await req('GET', '/users');
    logStep('List Users', users);

    // 3) Send initiatives
    const initiatives = await sendInitiatives(userA);
    logStep('Sent Initiatives', initiatives);

    // 4) List initiatives
    const list = await req('GET', '/initiatives');
    logStep('List Initiatives', list);

    console.log('\nAll tests completed successfully.');
  } catch (err) {
    console.error('\nTest failed:');
    console.error(err.message);
    if (err.body) console.error('Body:', JSON.stringify(err.body, null, 2));
    process.exitCode = 1;
  }
})();
