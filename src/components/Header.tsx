import { ASSETS } from '../constants/assets'

export function Header() {
  return (
    <header className="flex justify-center px-4 pt-5 pb-2 sm:pt-7">
      <a
        href={ASSETS.homeUrl}
        className="inline-flex rounded-full bg-white p-2.5 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:-rotate-3 hover:shadow-card"
      >
        <img className="h-auto w-11 sm:w-[50px]" src={ASSETS.logo} width="535" height="535" alt="Wizard Logo" />
      </a>
    </header>
  )
}
