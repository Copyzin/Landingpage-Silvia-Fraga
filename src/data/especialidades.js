// Conteúdo mocado das 5 especialidades — texto contextualizado (não Lorem Ipsum)
// Estrutura: {slug, ordem, titulo, subtitulo, resumo, conteudo[], whatsappContext}

export const ESPECIALIDADES = [
  {
    slug: 'tributario-no-agro',
    ordem: 'I',
    titulo: 'Tributário no Agro',
    subtitulo:
      'Defesa e planejamento fiscal para produtores rurais, cooperativas e empresas do agronegócio.',
    resumo:
      'Recuperação de créditos, planejamento de carga tributária e contencioso especializado em ITR, FUNRURAL, ICMS e PIS/COFINS.',
    destaque: true,
    whatsappContext: 'Tributário no Agro',
    conteudo: [
      {
        type: 'p',
        text: 'O direito tributário aplicado ao agronegócio exige a leitura simultânea de três realidades: a operação no campo, o ciclo financeiro do produtor e o conjunto particular de regimes fiscais que recaem sobre a atividade rural. É nessa intersecção que nosso trabalho começa.',
      },
      {
        type: 'h2',
        text: 'Reforma tributária no agro: sua fazenda está pronta para o IBS e a CBS?',
      },
      {
        type: 'p',
        text: 'O que muda na prática e o que o produtor rural precisa saber. Antes da reforma, eram cinco tributos (PIS, Cofins, IPI, ICMS e ISS), cada um com suas regras e suas competências de estado e município.',
      },
      {
        type: 'p',
        text: 'Agora, esses cinco dão lugar a dois: o IBS e a CBS, com novidades no cálculo e no modelo de IVA dual. A lógica do IVA é direta: paga-se imposto apenas sobre o valor agregado ao produto.',
      },
      {
        type: 'p',
        text: 'Mas atenção: nem todo produtor rural será enquadrado no IBS e na CBS. O primeiro passo é descobrir em qual grupo você se encaixa, e é aí que entra a assessoria especializada, com atendimento ágil e personalizado.',
      },
      {
        type: 'h2',
        text: 'O que entregamos',
      },
      {
        type: 'p',
        text: 'Atuamos na revisão de apurações de FUNRURAL, ITR e na recuperação de créditos de PIS/COFINS sobre insumos. Construímos planejamentos preventivos que dialogam com a realidade da safra e do regime de caixa do produtor, não com modelos abstratos importados de outras indústrias.',
      },
      {
        type: 'p',
        text: 'No contencioso, defendemos clientes em execuções fiscais, autos de infração estaduais (especialmente em operações de ICMS interestadual) e em demandas envolvendo a aplicação da Lei Kandir a produtos do agro.',
      },
      {
        type: 'quote',
        text: 'A tributação no agro não é apenas técnica fiscal: é a tradução jurídica de como o capital circula no campo.',
      },
      {
        type: 'h2',
        text: 'Quando nos procurar',
      },
      {
        type: 'p',
        text: 'Procure-nos antes da próxima safra. A maioria das economias tributárias relevantes não vem de litígio, mas de decisões estruturais tomadas com antecedência: forma de comercialização, escolha do regime, organização societária da operação rural.',
      },
    ],
  },
  {
    slug: 'planejamento-sucessorio',
    ordem: 'II',
    titulo: 'Planejamento Sucessório',
    subtitulo:
      'Proteção patrimonial e transição entre gerações com instrumentos jurídicos sob medida.',
    resumo:
      'Holdings familiares, testamentos, doações com reserva de usufruto e pactos antenupciais alinhados ao seu projeto familiar.',
    destaque: false,
    whatsappContext: 'Planejamento Sucessório',
    conteudo: [
      {
        type: 'p',
        text: 'Planejar a sucessão patrimonial é, antes de qualquer coisa, um exercício de honestidade familiar. O direito entra como ferramenta (não como protagonista) para preservar relações, evitar litígios futuros e proteger o patrimônio construído ao longo de uma vida.',
      },
      {
        type: 'h2',
        text: 'Por que não deixar o planejamento sucessório para depois?',
      },
      {
        type: 'p',
        text: 'Para o produtor rural, planejar a sucessão é decisivo: não se trata apenas de patrimônio, mas da história construída ao longo de uma vida e da transferência de gestão e de bens entre gerações.',
      },
      {
        type: 'p',
        text: 'É imprescindível que o planejamento esteja conectado à governança, à estruturação jurídica e às ferramentas adequadas a cada caso, evitando os altos custos do inventário e o risco de fragmentação das terras, assegurando a continuidade e a profissionalização do negócio.',
      },
      {
        type: 'p',
        text: 'Há diversas ferramentas (doação com reserva de usufruto, testamento, Fiagro, holding familiar, entre outras), mas só um diagnóstico patrimonial e familiar revela qual é a mais adequada. Um bom planejamento impede, ainda, que a propriedade rural seja dividida em áreas inviáveis para a atividade agrícola.',
      },
      {
        type: 'h2',
        text: 'Instrumentos que utilizamos',
      },
      {
        type: 'p',
        text: 'Trabalhamos com a combinação adequada de holdings familiares, doações com reserva de usufruto, testamentos, pactos antenupciais e protocolos familiares. Não defendemos um modelo único: cada família tem uma estrutura emocional e patrimonial particular, e o instrumento jurídico precisa servir a ela.',
      },
      {
        type: 'p',
        text: 'No caso de famílias com patrimônio rural, somamos camadas adicionais: a continuidade da exploração da terra, o acesso ao crédito rural, a sucessão de quotas em sociedades produtoras e a relação com cooperativas.',
      },
      {
        type: 'quote',
        text: 'Um bom planejamento sucessório não é o que protege o patrimônio do imposto: é o que protege a família dela mesma.',
      },
      {
        type: 'p',
        text: 'Acompanhamos o cliente na implementação completa: redação dos instrumentos, registros nos cartórios e juntas comerciais, comunicação com herdeiros e revisões periódicas conforme a vida muda.',
      },
    ],
  },
  {
    slug: 'defesa-em-execucao-fiscal',
    ordem: 'III',
    titulo: 'Defesa em Execução Fiscal',
    subtitulo:
      'Bloqueio judicial revertido, dívida questionada, patrimônio protegido.',
    resumo:
      'Embargos, exceções de pré-executividade e estratégias de garantia para suspender cobranças indevidas.',
    destaque: false,
    whatsappContext: 'Defesa em Execução Fiscal',
    conteudo: [
      {
        type: 'p',
        text: 'A execução fiscal chega quase sempre como um susto: um bloqueio via SISBAJUD, uma penhora online, a citação na empresa. Nesse momento, a primeira tarefa não é discutir o mérito: é estancar o sangue.',
      },
      {
        type: 'h2',
        text: 'Como atuamos',
      },
      {
        type: 'p',
        text: 'Avaliamos rapidamente a regularidade da inscrição em dívida ativa, identificamos vícios formais que permitam exceção de pré-executividade e desenhamos a melhor estratégia de garantia: seguro-garantia, fiança bancária, depósito ou penhora indicada. O objetivo imediato: suspender a exigibilidade e devolver oxigênio operacional ao cliente.',
      },
      {
        type: 'p',
        text: 'Em paralelo, atuamos no mérito por meio de embargos à execução, sempre cruzando teses tributárias com a realidade contábil da operação. Não apresentamos defesa genérica: cada execução é única.',
      },
      {
        type: 'quote',
        text: 'Defender execução fiscal é, antes do direito, um exercício de tempo de resposta.',
      },
      {
        type: 'p',
        text: 'Também atuamos preventivamente, revisando inscrições em dívida ativa antes que se transformem em execução, e negociando transações tributárias quando esse caminho for o mais vantajoso ao cliente.',
      },
    ],
  },
  {
    slug: 'regularizacao-fundiaria',
    ordem: 'IV',
    titulo: 'Regularização Fundiária',
    subtitulo:
      'Da posse ao título: o caminho jurídico para consolidar a propriedade rural.',
    resumo:
      'Georreferenciamento, retificação de matrícula e regularização perante o INCRA.',
    destaque: false,
    whatsappContext: 'Regularização Fundiária',
    conteudo: [
      {
        type: 'p',
        text: 'A regularização fundiária é, na prática, o reconhecimento jurídico daquilo que já existe no campo: a posse mansa e pacífica, a delimitação real da gleba, a continuidade da exploração produtiva. Nosso papel é dar a esse fato a forma de direito que ele merece.',
      },
      {
        type: 'h2',
        text: 'Frentes de atuação',
      },
      {
        type: 'p',
        text: 'Conduzimos ações de usucapião rural (extrajudicial e judicial), processos de retificação de área, regularização perante o INCRA com cadastro no SNCR/CCIR, georreferenciamento da gleba e adequação ao CAR. Em algumas situações, articulamos com prefeituras e estados o processo de titulação em regularizações coletivas.',
      },
      {
        type: 'p',
        text: 'Atendemos tanto o pequeno produtor (que precisa do título para acessar crédito rural e segurança jurídica de família) quanto o grande proprietário, cuja regularização viabiliza operações de investimento, garantia e sucessão.',
      },
      {
        type: 'quote',
        text: 'Terra sem matrícula é trabalho sem garantia.',
      },
      {
        type: 'p',
        text: 'O processo é geralmente longo, mas começa pequeno: uma reunião para entender a posse, ler a documentação existente e desenhar o caminho mais econômico de regularização.',
      },
    ],
  },
  {
    slug: 'holding-rural',
    ordem: 'V',
    titulo: 'Holding Rural',
    subtitulo:
      'Estrutura societária que organiza patrimônio, otimiza tributação e prepara a sucessão.',
    resumo:
      'Constituição, integralização de imóveis rurais, governança familiar e regimes tributários adequados.',
    destaque: false,
    whatsappContext: 'Holding Rural',
    conteudo: [
      {
        type: 'p',
        text: 'A holding rural é a estrutura societária pensada para famílias e empresas que combinam patrimônio imobiliário, atividade produtiva e projeto sucessório. Bem desenhada, ela organiza ao mesmo tempo três planos: o tributário, o societário e o familiar.',
      },
      {
        type: 'h2',
        text: 'O que verificamos antes de constituir',
      },
      {
        type: 'p',
        text: 'Avaliamos a vocação da operação: se há exploração rural direta, arrendamento, parceria, atividade agroindustrial ou simples gestão patrimonial. Cada vocação aponta para um regime tributário mais eficiente: lucro real, presumido ou regimes específicos para atividade rural pessoa jurídica.',
      },
      {
        type: 'p',
        text: 'Analisamos também a integralização dos imóveis rurais: matrículas, ônus, georreferenciamento, ITBI, ganho de capital diferido e os efeitos no ITR. Não basta criar a holding: é preciso integralizar bem.',
      },
      {
        type: 'quote',
        text: 'Holding rural mal feita é apenas custo extra com aparência de planejamento.',
      },
      {
        type: 'h2',
        text: 'Governança',
      },
      {
        type: 'p',
        text: 'Acompanhamos a redação de acordo de sócios, protocolo familiar, definição de cargos e regras de retirada, porque a holding só protege o que se discute antes do conflito.',
      },
    ],
  },
]

export const findEspecialidade = (slug) =>
  ESPECIALIDADES.find((e) => e.slug === slug) || null
