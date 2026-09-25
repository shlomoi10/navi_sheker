import type { ClipboardEventHandler, FormEventHandler, KeyboardEventHandler, RefObject } from 'react'
import { CALL_ERRORS, MAGIC_TEXT, type CallError } from '../constants/content'
import { InfoTooltip } from './InfoTooltip'

interface ProphetFormProps {
  questionInputRef: RefObject<HTMLInputElement | null>
  callInputRef: RefObject<HTMLInputElement | null>
  isRevealDisabled: boolean
  callError: CallError | null
  pasteError: string
  onQuestionInput: () => void
  onCallInput: FormEventHandler<HTMLInputElement>
  onCallKeyDown: KeyboardEventHandler<HTMLInputElement>
  onCallPaste: ClipboardEventHandler<HTMLInputElement>
  onReveal: () => void
}

const INPUT_CLASS =
  'w-full rounded-xl border border-line bg-[#fbfaff] px-4 py-3 text-right font-input text-base outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary-soft'

export function ProphetForm({
  questionInputRef,
  callInputRef,
  isRevealDisabled,
  callError,
  pasteError,
  onQuestionInput,
  onCallInput,
  onCallKeyDown,
  onCallPaste,
  onReveal,
}: ProphetFormProps) {
  const hasErrors = callError !== null || pasteError !== ''

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mx-auto flex w-full max-w-lg flex-col gap-4 rounded-3xl border border-line bg-white/85 p-5 shadow-card backdrop-blur-sm sm:p-8"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="questionText" className="text-lg font-medium">
          ובכן מה השאלה?
        </label>
        <input
          ref={questionInputRef}
          id="questionText"
          type="text"
          autoComplete="off"
          onInput={onQuestionInput}
          className={INPUT_CLASS}
        />
      </div>

      <div className="h-px bg-linear-to-l from-transparent via-line to-transparent" />

      <div className="flex flex-col gap-2">
        <p className="text-lg font-medium">רוצים תשובה לשאלה? תקראו לי</p>
        <p className="leading-relaxed text-subtle">
          יש לקרוא לי ע"י: <strong className="text-sm font-bold text-ink sm:text-[0.95rem]">{MAGIC_TEXT}</strong>
          <InfoTooltip text='מידי פעם אפשר לקרוא לי רק עם "נביא השקר". שימו לב לא להגזים, זה מזלזל בי' />
        </p>
        <input
          ref={callInputRef}
          id="inputText"
          type="text"
          autoComplete="off"
          placeholder=""
          aria-invalid={callError !== null}
          onInput={onCallInput}
          onKeyDown={onCallKeyDown}
          onPaste={onCallPaste}
          className={`${INPUT_CLASS} aria-invalid:border-danger`}
        />
      </div>

      {hasErrors && (
        <div className="flex flex-col gap-1.5" aria-live="polite">
          {callError && (
            <span className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">{CALL_ERRORS[callError]}</span>
          )}
          {pasteError && <span className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">{pasteError}</span>}
        </div>
      )}

      <button
        type="button"
        disabled={isRevealDisabled}
        onClick={onReveal}
        className="min-w-36 self-center rounded-full bg-primary px-7 py-3 font-input font-semibold text-white shadow-[0_8px_20px_rgb(140_126_224/30%)] transition enabled:hover:-translate-y-px enabled:hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-[#c9c5d8] disabled:shadow-none"
      >
        תשובה
      </button>
    </form>
  )
}
