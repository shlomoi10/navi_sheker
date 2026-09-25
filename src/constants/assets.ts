const base = import.meta.env.BASE_URL

export const ASSETS = {
  homeUrl: base,
  logo: `${base}logo.png`,
  likeGif: `${base}like.gif`,
  prophetGif: `${base}hhh.gif`,
} as const
