import { useCallback, useEffect, useRef, useState, type ClipboardEvent, type FormEvent, type KeyboardEvent } from 'react'
import { flushSync } from 'react-dom'
import {
  ALWAYS_MAGIC_CHAR,
  MAGIC_END_CHAR,
  MAGIC_TEXT,
  OVERLAY_MESSAGES,
  PASTE_ERROR,
  SHORT_CALL,
  TIMINGS,
  type CallError,
} from '../constants/content'
import { getMagicChar } from '../lib/device'
import { pickProphecy, pickRandom } from '../lib/random'
import { useCelebration } from './useCelebration'
import { useTypewriter } from './useTypewriter'

export function useProphet() {
  const callInputRef = useRef<HTMLInputElement>(null)
  const questionInputRef = useRef<HTMLInputElement>(null)
  const tryAgainRef = useRef<HTMLButtonElement>(null)

  const [magicChar] = useState(getMagicChar)
  const originalContentRef = useRef('')
  const isMagicModeRef = useRef(false)
  const wasMagicModeRef = useRef(false)

  // Mirrored in a ref so synchronous checks (Enter key) always read the latest value.
  const revealDisabledRef = useRef(true)
  const [isRevealDisabled, setIsRevealDisabledState] = useState(true)
  const setRevealDisabled = useCallback((disabled: boolean) => {
    revealDisabledRef.current = disabled
    setIsRevealDisabledState(disabled)
  }, [])

  const tryAgainVisibleRef = useRef(false)
  const [isTryAgainVisible, setIsTryAgainVisible] = useState(false)

  const [callError, setCallError] = useState<CallError | null>(null)
  const [pasteError, setPasteError] = useState('')
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null)
  const [isDarkOverlayVisible, setIsDarkOverlayVisible] = useState(false)
  const [isAnswerShown, setIsAnswerShown] = useState(false)

  const typewriter = useTypewriter(TIMINGS.typingSpeed)
  const celebration = useCelebration()

  const toggleRevealButton = useCallback(() => {
    const callValue = callInputRef.current?.value ?? ''
    const questionValue = questionInputRef.current?.value ?? ''
    setRevealDisabled(!(callValue.length > 0 && questionValue.length > 0))
  }, [setRevealDisabled])

  const handleCallInput = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const input = event.currentTarget
      setRevealDisabled(input.value.trim() === '')
      setPasteError('')

      const value = input.value
      const firstChar = value.charAt(0)

      if (!isMagicModeRef.current && (firstChar === magicChar || firstChar === ALWAYS_MAGIC_CHAR)) {
        isMagicModeRef.current = true
        wasMagicModeRef.current = true
        originalContentRef.current = ''
        input.value = ''
        return
      }

      if (isMagicModeRef.current) {
        if (value.endsWith(MAGIC_END_CHAR)) {
          isMagicModeRef.current = false
          input.value = value.slice(0, -1)
        } else {
          originalContentRef.current += value.charAt(value.length - 1)
          input.value = MAGIC_TEXT.slice(0, originalContentRef.current.length)
        }
      }

      toggleRevealButton()
    },
    [magicChar, setRevealDisabled, toggleRevealButton],
  )

  const handleCallKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (isMagicModeRef.current && event.key === 'Backspace') {
      originalContentRef.current = originalContentRef.current.slice(0, -1)
      event.currentTarget.value = MAGIC_TEXT.slice(0, originalContentRef.current.length)
      event.preventDefault()
    }
  }, [])

  const handleCallPaste = useCallback((event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    setPasteError(PASTE_ERROR)
  }, [])

  const validateCall = useCallback((value: string) => {
    if (!value.startsWith(SHORT_CALL)) {
      setCallError('disrespect')
      return false
    }
    if (value !== SHORT_CALL && value !== MAGIC_TEXT) {
      setCallError('manners')
      return false
    }
    setCallError(null)
    return true
  }, [])

  const showTryAgainButton = useCallback(() => {
    if (tryAgainVisibleRef.current) return
    setTimeout(() => {
      tryAgainVisibleRef.current = true
      flushSync(() => setIsTryAgainVisible(true))
      tryAgainRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, TIMINGS.tryAgainDelay)
  }, [])

  const { type, clear: clearTypedText } = typewriter
  const { start: startFallingLogos, stop: stopFallingLogos, resume: resumeFallingLogos } = celebration

  const revealText = useCallback(() => {
    if (revealDisabledRef.current) return

    const inputValue = callInputRef.current?.value ?? ''
    if (!validateCall(inputValue)) {
      setIsAnswerShown(false)
      return
    }

    setRevealDisabled(true)
    setLoadingMessage(pickRandom(OVERLAY_MESSAGES))

    setTimeout(() => {
      setLoadingMessage(null)
      setIsDarkOverlayVisible(true)

      setTimeout(() => {
        const finalText = wasMagicModeRef.current ? originalContentRef.current : pickProphecy()

        setIsAnswerShown(true)
        resumeFallingLogos()
        type(finalText, () => {
          setRevealDisabled(false)
          showTryAgainButton()
          setIsDarkOverlayVisible(true)
          startFallingLogos(wasMagicModeRef.current ? 'like' : 'laugh')
        })
      }, TIMINGS.beforeAnswer)
    }, TIMINGS.loadingOverlay)
  }, [validateCall, setRevealDisabled, resumeFallingLogos, type, showTryAgainButton, startFallingLogos])

  const resetMagic = useCallback(() => {
    stopFallingLogos()

    if (callInputRef.current) callInputRef.current.value = ''
    if (questionInputRef.current) questionInputRef.current.value = ''
    clearTypedText()
    setIsAnswerShown(false)
    tryAgainVisibleRef.current = false
    setIsTryAgainVisible(false)
    isMagicModeRef.current = false
    wasMagicModeRef.current = false
    originalContentRef.current = ''
    toggleRevealButton()
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, TIMINGS.resetScrollDelay)
    setIsDarkOverlayVisible(false)
  }, [stopFallingLogos, clearTypedText, toggleRevealButton])

  const revealTextRef = useRef(revealText)
  useEffect(() => {
    revealTextRef.current = revealText
  }, [revealText])

  useEffect(() => {
    const handleEnter = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Enter' && !revealDisabledRef.current) {
        revealTextRef.current()
      }
    }
    document.addEventListener('keydown', handleEnter)
    return () => document.removeEventListener('keydown', handleEnter)
  }, [])

  return {
    tryAgainRef,
    form: {
      callInputRef,
      questionInputRef,
      isRevealDisabled,
      callError,
      pasteError,
      onCallInput: handleCallInput,
      onCallKeyDown: handleCallKeyDown,
      onCallPaste: handleCallPaste,
      onQuestionInput: toggleRevealButton,
      onReveal: revealText,
    },
    answer: {
      text: typewriter.text,
      isTyping: typewriter.isTyping,
      isShown: isAnswerShown,
    },
    loadingMessage,
    isDarkOverlayVisible,
    isTryAgainVisible,
    celebration: { drops: celebration.drops, burst: celebration.burst },
    resetMagic,
  }
}
