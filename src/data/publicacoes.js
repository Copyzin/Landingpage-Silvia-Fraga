// Publicações mocadas — autor=null usa default "Sílvia Fraga"
export const PUBLICACOES = [
  {
    id: 'pub-1',
    titulo: 'FUNRURAL após o STF: o que muda para o produtor rural pessoa física',
    autor: null,
    dataISO: '2026-04-22',
    imagem: 'https://picsum.photos/seed/silvia-pub-funrural/1200/800',
    resumo:
      'Uma leitura prática das decisões recentes e dos caminhos administrativos disponíveis ao produtor pessoa física.',
    corpo: [
      'A discussão sobre o FUNRURAL atravessou mais de uma década no STF e, mesmo com as decisões consolidadas, o produtor rural pessoa física ainda lida com cenários de cobrança e crédito que merecem atenção técnica.',
      'Este artigo aborda três pontos que recebemos com mais frequência em consultoria: (i) a estabilização da exigência, (ii) os créditos pretéritos que ainda podem ser recuperados, e (iii) o impacto contábil da escolha entre folha e receita bruta.',
      'O ponto que costuma surpreender o cliente: muitas economias relevantes não vêm de litígio, mas de reorganização da forma de comercialização — e essa decisão pertence ao mundo do planejamento, não do contencioso.',
    ],
    destaque: true,
  },
  {
    id: 'pub-2',
    titulo: 'Holding familiar: o erro silencioso da integralização sem laudo',
    autor: null,
    dataISO: '2026-03-15',
    imagem: 'https://picsum.photos/seed/silvia-pub-holding-laudo/1000/700',
    resumo:
      'Por que a integralização de imóveis pelo valor histórico pode custar caro no longo prazo.',
    corpo: [
      'A constituição de uma holding familiar é, com frequência, apresentada como solução universal. Na prática, há uma decisão crítica que precede o resto: como integralizar os bens.',
      'Optar pelo valor histórico parece economizar imposto no presente, mas pode comprometer toda a estratégia futura — especialmente em cenários de venda, doação ou sucessão.',
    ],
    destaque: false,
  },
  {
    id: 'pub-3',
    titulo: 'Usucapião extrajudicial: o caminho que evita o judiciário',
    autor: null,
    dataISO: '2026-02-08',
    imagem: 'https://picsum.photos/seed/silvia-pub-usucapiao/1000/700',
    resumo:
      'Em quais hipóteses a via cartorária é viável e o que costuma travar o procedimento.',
    corpo: [
      'A usucapião extrajudicial é, na maior parte dos casos, mais rápida e mais previsível que a via judicial. Mas ela depende de um conjunto de condições que precisam estar bem desenhadas desde o início.',
      'Discutimos aqui o checklist que aplicamos antes de iniciar o processo: documentos da posse, anuências dos confrontantes, georreferenciamento e a redação da ata notarial.',
    ],
    destaque: false,
  },
  {
    id: 'pub-4',
    titulo: 'Execução fiscal: como agir nas primeiras 48 horas após o bloqueio',
    autor: 'Equipe Silvia Fraga',
    dataISO: '2026-01-19',
    imagem: 'https://picsum.photos/seed/silvia-pub-execucao/1000/700',
    resumo:
      'Um roteiro prático de resposta imediata: garantia, suspensão e estratégia.',
    corpo: [
      'O bloqueio via SISBAJUD costuma chegar sem aviso e exige resposta cirúrgica nas primeiras horas. Aqui está o roteiro que adotamos.',
      'Avaliação imediata da regularidade da CDA, garantia alternativa quando cabível e levantamento das teses de defesa que podem desaguar em embargos ou exceção de pré-executividade.',
    ],
    destaque: false,
  },
  {
    id: 'pub-5',
    titulo: 'ITR e CAR: por que regularizar antes de declarar',
    autor: null,
    dataISO: '2025-11-04',
    imagem: 'https://picsum.photos/seed/silvia-pub-itr-car/1000/700',
    resumo:
      'A relação entre dados ambientais e a apuração do imposto territorial rural.',
    corpo: [
      'A apuração do ITR é hoje fortemente integrada aos dados do Cadastro Ambiental Rural. Divergências entre os dois sistemas tornaram-se uma fonte de autuações.',
      'Recomendamos a revisão anual do CAR antes da declaração — o custo é baixo, o ganho é evitar contencioso futuro.',
    ],
    destaque: false,
  },
]

export const formatarDataPtBR = (iso) => {
  try {
    const d = new Date(iso + 'T12:00:00')
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(d)
  } catch {
    return iso
  }
}
