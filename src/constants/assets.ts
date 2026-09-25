const base = import.meta.env.BASE_URL

export const ASSETS = {
  homeUrl: base,
  logo: `${base}logo.png`,
  likeGif: `${base}like.gif`,
  prophetGif: `${base}hhh.gif`,
  builderLogo: `${base}yesh-click-logo.svg`,
} as const
