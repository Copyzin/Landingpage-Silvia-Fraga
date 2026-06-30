// Artigos do blog. Cada artigo pertence a uma categoria (slug de uma
// especialidade em especialidades.js) e e renderizado em pagina propria
// (ArtigoLayout) na rota /especialidades/:categoria/:artigo.
// Estrutura: {slug, categoria, titulo, subtitulo, dataISO, whatsappContext, conteudo[]}
// Texto de partida redigido no tom do escritorio — revisar com a Dra. Silvia.

export const ARTIGOS = [
  // ===== Direito Civil =====
  {
    slug: 'elaboracao-de-contratos',
    categoria: 'direito-civil',
    titulo: 'Elaboração de Contratos',
    subtitulo:
      'Um contrato bem redigido previne o litígio que um contrato genérico provoca.',
    dataISO: '2026-06-18',
    whatsappContext: 'Elaboração de Contratos',
    conteudo: [
      {
        type: 'p',
        text: 'Um contrato é o conjunto de regras da relação entre as partes. Quando é escrito com cuidado, ele antecipa os cenários, distribui os riscos e evita que cada divergência futura vire um processo. Quando é copiado de um modelo genérico, ele costuma calar justamente onde o conflito vai aparecer.',
      },
      {
        type: 'h2',
        text: 'Cláusulas que não podem faltar',
      },
      {
        type: 'p',
        text: 'Há um núcleo que consideramos inegociável: objeto bem definido, preço e forma de pagamento, prazos, obrigações de cada parte, hipóteses de rescisão, multas e penalidades, e o foro ou a forma de resolução de conflitos. Em torno desse núcleo, cada negócio pede cláusulas próprias: confidencialidade, garantias, reajuste, condições suspensivas.',
      },
      {
        type: 'p',
        text: 'Redigir é, antes de tudo, ouvir. Entendemos a operação real por trás do contrato e traduzimos essa intenção em texto claro, sem ambiguidade. Um contrato sob medida custa menos do que o primeiro mês de uma disputa judicial mal prevista.',
      },
      {
        type: 'quote',
        text: 'A maior parte dos processos contratuais tem raiz em uma frase ambígua ou em uma cláusula que ninguém escreveu.',
      },
      {
        type: 'h2',
        text: 'Quando nos procurar',
      },
      {
        type: 'p',
        text: 'Procure-nos antes de assinar e, idealmente, antes mesmo de fechar o acordo verbal. É na fase de redação que se ganha segurança barata: depois da assinatura, o que sobra é interpretar o que ficou escrito.',
      },
    ],
  },
  {
    slug: 'analise-de-contratos',
    categoria: 'direito-civil',
    titulo: 'Análise de Contratos',
    subtitulo:
      'Antes de assinar, saber exatamente a que você está se obrigando.',
    dataISO: '2026-06-10',
    whatsappContext: 'Análise de Contratos',
    conteudo: [
      {
        type: 'p',
        text: 'Receber um contrato pronto para assinar não significa que ele esteja pronto para você. A análise contratual é a leitura técnica que separa o que parece favorável do que realmente protege os seus interesses.',
      },
      {
        type: 'h2',
        text: 'O que verificamos',
      },
      {
        type: 'p',
        text: 'Mapeamos as obrigações que recaem sobre você, as garantias exigidas, as multas, as hipóteses de rescisão e os pontos de desequilíbrio entre as partes. Sinalizamos as cláusulas de risco, as renúncias escondidas e as omissões que podem custar caro, e indicamos exatamente o que renegociar antes da assinatura.',
      },
      {
        type: 'quote',
        text: 'O melhor momento para discutir uma cláusula é antes de assiná-la, não quando ela é cobrada.',
      },
      {
        type: 'p',
        text: 'Ao final, você recebe um retorno objetivo: o que está adequado, o que merece ajuste e o que, em nossa avaliação, não deveria ser aceito como está. A decisão continua sendo sua, agora com a informação completa.',
      },
    ],
  },

  // ===== Direito Imobiliário =====
  {
    slug: 'contrato-de-compra-e-venda-de-imoveis',
    categoria: 'direito-imobiliario',
    titulo: 'Contrato de Compra e Venda de Imóveis',
    subtitulo:
      'Da matrícula ao registro: o caminho seguro para comprar ou vender um imóvel.',
    dataISO: '2026-06-02',
    whatsappContext: 'Compra e Venda de Imóveis',
    conteudo: [
      {
        type: 'p',
        text: 'A compra de um imóvel costuma ser o maior negócio da vida de uma família, e também um dos que mais escondem armadilhas. A segurança não está apenas no preço combinado: está na situação jurídica do imóvel e na forma como cada etapa é formalizada.',
      },
      {
        type: 'h2',
        text: 'Antes de assinar',
      },
      {
        type: 'p',
        text: 'Conferimos a matrícula atualizada e os ônus que recaem sobre o bem, levantamos débitos de IPTU, condomínio e tributos, e verificamos a situação de quem vende. É essa investigação que revela penhoras, hipotecas, indisponibilidades e riscos de fraude antes que eles virem prejuízo.',
      },
      {
        type: 'p',
        text: 'Estruturamos o instrumento adequado a cada caso: contrato preliminar, promessa de compra e venda ou escritura definitiva, com cláusulas de pagamento, prazos, multas e distrato bem definidas. E acompanhamos o negócio até o ponto que de fato transfere a propriedade: o registro na matrícula.',
      },
      {
        type: 'quote',
        text: 'No Brasil, só é dono quem registra. Contrato assinado é promessa; propriedade é o que consta na matrícula.',
      },
      {
        type: 'p',
        text: 'Procure-nos antes de pagar o sinal. A maioria dos problemas de uma compra mal feita poderia ter sido vista na matrícula, na semana anterior à assinatura.',
      },
    ],
  },
  {
    slug: 'regularizacao-imobiliaria',
    categoria: 'direito-imobiliario',
    titulo: 'Regularização Imobiliária',
    subtitulo:
      'Imóvel sem documentação em ordem é patrimônio que não circula.',
    dataISO: '2026-05-22',
    whatsappContext: 'Regularização Imobiliária',
    conteudo: [
      {
        type: 'p',
        text: 'Muita gente vive ou trabalha em um imóvel há anos sem ter o título em ordem: a escritura nunca foi registrada, a construção não está averbada, a área da matrícula não corresponde à realidade ou o bem foi herdado sem inventário. Enquanto a documentação não fecha, o patrimônio fica preso.',
      },
      {
        type: 'h2',
        text: 'Os caminhos da regularização',
      },
      {
        type: 'p',
        text: 'O primeiro passo é diagnosticar a origem da irregularidade, porque cada uma tem uma solução. Atuamos na averbação de construções, na retificação de área e de registro, na regularização de heranças e doações pendentes e na adequação da matrícula à situação real do imóvel, na via extrajudicial sempre que possível.',
      },
      {
        type: 'quote',
        text: 'Um imóvel regular pode ser vendido, financiado, dado em garantia e herdado sem litígio. Um imóvel irregular, nenhum disso.',
      },
      {
        type: 'p',
        text: 'Regularizar costuma ser mais simples e mais barato do que o proprietário imagina, mas tende a ficar mais caro quanto mais se adia. O melhor momento para resolver é antes de precisar vender ou dar o bem em garantia.',
      },
    ],
  },
  {
    slug: 'adjudicacao-compulsoria',
    categoria: 'direito-imobiliario',
    titulo: 'Adjudicação Compulsória',
    subtitulo:
      'Quando o vendedor se recusa a outorgar a escritura, a Justiça pode fazê-lo por ele.',
    dataISO: '2026-05-14',
    whatsappContext: 'Adjudicação Compulsória',
    conteudo: [
      {
        type: 'p',
        text: 'Você comprou um imóvel, pagou tudo o que foi combinado, mas o vendedor desapareceu, morreu sem inventário ou simplesmente se recusa a assinar a escritura. A adjudicação compulsória existe exatamente para essa situação: é a ação que pede ao juiz que supra a vontade de quem deveria transferir o imóvel e não transfere.',
      },
      {
        type: 'h2',
        text: 'Os requisitos',
      },
      {
        type: 'p',
        text: 'Em regra, é preciso comprovar o contrato de compra e venda ou a promessa, o pagamento integral do preço e a recusa ou a impossibilidade de o vendedor outorgar a escritura. Com isso, a sentença substitui a assinatura do vendedor e autoriza o registro do imóvel em seu nome.',
      },
      {
        type: 'quote',
        text: 'Quem pagou pelo imóvel não deve ficar refém da boa vontade de quem vendeu.',
      },
      {
        type: 'p',
        text: 'Reúna o contrato, os comprovantes de pagamento e a matrícula e procure orientação. Quanto mais organizada a prova do negócio e da quitação, mais direto tende a ser o caminho até o título definitivo.',
      },
    ],
  },
  {
    slug: 'usucapiao',
    categoria: 'direito-imobiliario',
    titulo: 'Usucapião',
    subtitulo:
      'Transformar posse longa e mansa em propriedade registrada.',
    dataISO: '2026-05-06',
    whatsappContext: 'Usucapião',
    conteudo: [
      {
        type: 'p',
        text: 'A usucapião é a aquisição da propriedade pelo tempo: quem ocupa um imóvel de forma contínua, pública e sem oposição, como se dono fosse, pode ter esse fato reconhecido como direito. É o caminho de quem mora ou produz há anos em uma terra que nunca esteve formalmente em seu nome.',
      },
      {
        type: 'h2',
        text: 'Modalidades e prazos',
      },
      {
        type: 'p',
        text: 'A lei prevê várias modalidades, com prazos e exigências diferentes, conforme o tempo de posse, a existência de moradia ou trabalho no imóvel e a boa-fé do possuidor. Definir a modalidade correta é o passo que organiza toda a estratégia e a prova do caso.',
      },
      {
        type: 'p',
        text: 'A usucapião pode tramitar pela via extrajudicial, em cartório, quando há acordo dos confrontantes e documentação bem montada, ou pela via judicial, quando há resistência ou lacunas a suprir. Em ambas, o trabalho começa muito antes de protocolar: é preciso documentar a posse com fotos, testemunhas, contas e benfeitorias.',
      },
      {
        type: 'quote',
        text: 'A posse antiga vale o que a prova dela conseguir demonstrar.',
      },
      {
        type: 'p',
        text: 'O processo costuma ser longo, mas começa pequeno: uma reunião para entender há quanto tempo e de que forma a posse é exercida, e para desenhar o caminho mais seguro até a matrícula.',
      },
    ],
  },

  // ===== Direito de Família =====
  {
    slug: 'divorcio',
    categoria: 'direito-de-familia',
    titulo: 'Divórcio',
    subtitulo:
      'Encerrar o casamento com clareza sobre filhos, bens e os próximos passos.',
    dataISO: '2026-04-28',
    whatsappContext: 'Divórcio',
    conteudo: [
      {
        type: 'p',
        text: 'O divórcio é, ao mesmo tempo, o fim de um vínculo e o início de uma nova organização de vida. Conduzido com técnica e discrição, ele pode ser muito menos desgastante do que se imagina, especialmente quando as partes conseguem separar a emoção do momento das decisões que precisam ser tomadas.',
      },
      {
        type: 'h2',
        text: 'Consensual ou litigioso',
      },
      {
        type: 'p',
        text: 'Quando há acordo sobre os pontos principais, o divórcio consensual pode ser rápido e, em muitos casos sem filhos menores ou incapazes, feito diretamente em cartório. Quando o acordo não é possível, atuamos na via judicial para proteger os seus direitos com firmeza, sem perder de vista a estabilidade da solução.',
      },
      {
        type: 'p',
        text: 'O divórcio raramente vem sozinho: ele carrega a partilha dos bens, a definição sobre guarda e convivência dos filhos e os alimentos. Tratamos cada um desses pontos com o cuidado de quem sabe que eles vão reger a vida das pessoas pelos próximos anos.',
      },
      {
        type: 'quote',
        text: 'O melhor desfecho de uma separação é aquele que as partes ainda consideram justo anos depois.',
      },
      {
        type: 'p',
        text: 'Se você está avaliando esse passo, uma conversa reservada ajuda a enxergar o caminho: o que pode ser consensual, o que precisa de decisão judicial e como proteger o que mais importa para você.',
      },
    ],
  },
]

export const findArtigo = (slug) =>
  ARTIGOS.find((a) => a.slug === slug) || null

export const artigosDaCategoria = (categoria) =>
  ARTIGOS.filter((a) => a.categoria === categoria)
