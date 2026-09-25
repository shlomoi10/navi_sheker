interface LoadingOverlayProps {
  message: string | null
}

export function LoadingOverlay({ message }: LoadingOverlayProps) {
  if (message === null) return null

  return (
    <div
      role="status"
      className="fixed top-1/2 left-1/2 z-9 w-[min(90vw,280px)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-line bg-white/90 px-7 py-6 shadow-card backdrop-blur-md"
    >
      <div className="mx-auto size-9 animate-spin rounded-full border-4 border-primary-soft border-t-primary" />
      <p className="mt-3 text-lg">{message}</p>
    </div>
  )
}

interface DarkOverlayProps {
  visible: boolean
}

export function DarkOverlay({ visible }: DarkOverlayProps) {
  if (!visible) return null

  return <div className="fixed inset-0 z-8 animate-fade-in bg-ink/20 backdrop-blur-[1.5px]" />
}
