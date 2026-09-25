import { useCallback, useState } from 'react'

export function useTypewriter(speed: number) {
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const type = useCallback(
    (fullText: string, onDone?: () => void) => {
      setText('')
      setIsTyping(true)
      let index = 0

      const step = () => {
        if (index < fullText.length) {
          setText(fullText.substring(0, index + 1))
          index++
          setTimeout(step, speed)
        } else {
          setIsTyping(false)
          onDone?.()
        }
      }

      step()
    },
    [speed],
  )

  const clear = useCallback(() => setText(''), [])

  return { text, isTyping, type, clear }
}
