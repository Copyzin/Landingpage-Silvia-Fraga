// Constantes centrais de contato e endereços
// Edite TODO_INSTAGRAM_HANDLE quando o handle real for fornecido

const WHATSAPP_NUMERO = '5519996049795'
const MENSAGEM_PADRAO =
  'Olá! Vim pelo site da Silvia Fraga Advocacia e gostaria de mais informações.'

const ENDERECO_CAMPINAS = 'R. Comendador Tórlogo Dauntre, 74 - Cambuí, Campinas - SP'
const ENDERECO_SAO_PAULO = 'Av. Eng. Luiz Carlos Berrini, 1478 - Itaim Bibi, São Paulo - SP'

const EMAIL_DESTINO = 'silviafraga@silviaerguyfragaadvocacia.com.br'
const EMAIL_ASSUNTO = 'Contato via site — Silvia Fraga Advocacia'
const EMAIL_CORPO =
  'Olá, Dra. Sílvia!\n\n' +
  'Vim pelo site da Silvia Fraga Advocacia e gostaria de mais informações sobre os serviços do escritório.\n\n' +
  'Aguardo seu retorno.\n\n' +
  'Atenciosamente,\n'

const enc = (s) => encodeURIComponent(s)

export const CONTATO = {
  // WhatsApp
  whatsappNumero: WHATSAPP_NUMERO,
  whatsappDisplay: '+55 (19) 99604-9795',
  whatsappCallUrl: `tel:+${WHATSAPP_NUMERO}`,
  whatsappMessageUrl: `https://wa.me/${WHATSAPP_NUMERO}?text=${enc(MENSAGEM_PADRAO)}`,
  whatsappMessageWithContext: (contexto) =>
    `https://wa.me/${WHATSAPP_NUMERO}?text=${enc(
      `Olá! Vim pelo site da Silvia Fraga Advocacia e gostaria de falar sobre ${contexto}.`
    )}`,

  // E-mail (mailto com assunto + corpo pré-preenchido mencionando vinda pelo site)
  email: EMAIL_DESTINO,
  emailUrl: `mailto:${EMAIL_DESTINO}?subject=${enc(EMAIL_ASSUNTO)}&body=${enc(EMAIL_CORPO)}`,
  emailUrlWithContext: (contexto) =>
    `mailto:${EMAIL_DESTINO}?subject=${enc(
      `Contato via site — ${contexto}`
    )}&body=${enc(
      'Olá, Dra. Sílvia!\n\n' +
        `Vim pelo site da Silvia Fraga Advocacia e gostaria de conversar sobre ${contexto}.\n\n` +
        'Aguardo seu retorno.\n\n' +
        'Atenciosamente,\n'
    )}`,

  // Telefone
  telefoneDisplay: '+55 (19) 99604-9795',
  telefoneUrl: `tel:+${WHATSAPP_NUMERO}`,

  // Instagram (placeholder até o handle real)
  instagramHandle: 'TODO_INSTAGRAM_HANDLE',
  instagramUrl: 'https://instagram.com/TODO_INSTAGRAM_HANDLE',

  // Endereços
  sedes: [
    {
      cidade: 'Campinas',
      endereco: ENDERECO_CAMPINAS,
      mapsEmbed: `https://maps.google.com/maps?q=${enc(ENDERECO_CAMPINAS)}&output=embed`,
      mapsSearch: `https://www.google.com/maps/search/?api=1&query=${enc(ENDERECO_CAMPINAS)}`,
      mapsDirections: `https://www.google.com/maps/dir/?api=1&destination=${enc(ENDERECO_CAMPINAS)}`,
      fachadas: [
        'https://picsum.photos/seed/silvia-fachada-campinas-vault/1200/750',
        'https://picsum.photos/seed/silvia-fachada-campinas-interior/1200/750',
        'https://picsum.photos/seed/silvia-fachada-campinas-recepcao/1200/750',
      ],
    },
    {
      cidade: 'São Paulo',
      endereco: ENDERECO_SAO_PAULO,
      mapsEmbed: `https://maps.google.com/maps?q=${enc(ENDERECO_SAO_PAULO)}&output=embed`,
      mapsSearch: `https://www.google.com/maps/search/?api=1&query=${enc(ENDERECO_SAO_PAULO)}`,
      mapsDirections: `https://www.google.com/maps/dir/?api=1&destination=${enc(ENDERECO_SAO_PAULO)}`,
      fachadas: [
        'https://picsum.photos/seed/silvia-fachada-saopaulo-itaim/1200/750',
        'https://picsum.photos/seed/silvia-fachada-saopaulo-interior/1200/750',
        'https://picsum.photos/seed/silvia-fachada-saopaulo-sala/1200/750',
      ],
    },
  ],

  // Parceiro responsável pelo site
  parceiroSiteNome: 'Almeida Escala Digital',
  parceiroSiteUrl: 'https://almeidaescaladigital.com/',
}
