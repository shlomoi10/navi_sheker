import { ASSETS } from '../constants/assets'

const BUILDER_URL = 'https://yesh-click.com'

export function Footer() {
  return (
    <footer className="px-4 pt-10 pb-36 sm:pb-40">
      <div className="mx-auto flex w-fit items-center gap-3 rounded-full border border-line bg-white/70 px-5 py-2.5 text-sm text-subtle shadow-soft backdrop-blur-sm">
        <span>נבנה ע"י</span>
        <a
          href={BUILDER_URL}
          target="_blank"
          rel="noopener"
          className="rounded-md transition hover:opacity-80 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
        >
          <img src={ASSETS.builderLogo} alt="יש קליק" width="2448" height="951" className="h-7 w-auto sm:h-8" />
        </a>
      </div>
    </footer>
  )
}
