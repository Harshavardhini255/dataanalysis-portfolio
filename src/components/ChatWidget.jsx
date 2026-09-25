import { useEffect, useRef, useState } from 'react'
import { Magnetic } from './primitives'
import { useApp } from '../lib/useApp'

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || ''
const MODEL = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini'

const SYSTEM_PROMPT = `You are the assistant for this portfolio website (currently a blank theme template). You will be given the owner's details when content is added. For now, be helpful and concise (2-4 sentences, plain text, no markdown). If asked about the owner's projects or experience, say the portfolio is still a theme framework and content has not been added yet.`

const SUGGESTIONS = ['Tell me about this site', 'Is this a real portfolio?', 'What tools is this built with?']

export default function ChatWidget() {
  const { loaded } = useApp()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.setTimeout(() => inputRef.current?.focus(), 80)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages, typing])

  const tell = (content, role = 'assistant') =>
    setMessages((m) => [...m, { role, content }])

  const send = async (text) => {
    const content = (text ?? input).trim()
    if (!content || typing) return
    setInput('')
    tell(content, 'user')
    setTyping(true)

    const reply = async () => {
      if (!API_KEY) {
        return 'Hi! I\'m wired up and ready, but the OpenAI API key isn\'t set yet. Add VITE_OPENAI_API_KEY to your .env file and I\'ll start answering questions.'
      }
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content },
          ],
          temperature: 0.4,
          max_tokens: 220,
        }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => null)
        throw new Error(err?.error?.message || `Request failed (${res.status})`)
      }
      const data = await res.json()
      return data.choices?.[0]?.message?.content || 'No response.'
    }

    reply()
      .then(tell)
      .catch((err) => tell(`Hmm, something went wrong: ${err.message}. Check your API key and try again.`))
      .finally(() => setTyping(false))
  }

  return (
    <div className="fixed bottom-5 right-5 z-[110]" data-lenis-prevent>
      {open && (
        <div
          className="mb-3 flex h-[26rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden border border-line bg-ink shadow-2xl shadow-black/60 sm:h-[28rem]"
          role="dialog"
          aria-label="Portfolio AI assistant"
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <div>
                <p className="text-xs font-medium text-paper">AI Assistant</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-mist">Portfolio helper</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center text-mist transition-colors hover:text-paper"
              aria-label="Close chat"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            {messages.length === 0 && !typing && (
              <div className="text-left">
                <p className="inline-block max-w-[85%] rounded-sm border border-line bg-ink-2 px-4 py-3 text-sm font-light leading-relaxed text-paper">
                  Hi! I'm the portfolio assistant. This site is a theme framework for now — ask me anything, or try one of the suggestions below.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-mist transition-colors hover:border-accent hover:text-accent"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <p
                  className={`max-w-[85%] rounded-sm px-4 py-3 text-sm font-light leading-relaxed ${
                    m.role === 'user' ? 'bg-accent text-ink' : 'border border-line bg-ink-2 text-paper'
                  }`}
                >
                  {m.content}
                </p>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-sm border border-line bg-ink-2 px-4 py-3">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-mist"
                      style={{ animationDelay: `${d * 0.12}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
            className="flex items-center gap-2 border-t border-line px-4 py-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              aria-label="Message the assistant"
              className="flex-1 bg-transparent text-sm font-light text-paper placeholder:text-mist focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-ink transition-opacity disabled:opacity-40"
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m0 0-6-6m6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <Magnetic strength={0.3} className="ml-auto w-fit">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
          className={`flex h-14 w-14 items-center justify-center rounded-full text-ink shadow-lg shadow-black/40 transition-colors ${
            open ? 'bg-paper' : 'bg-accent'
          }`}
          style={{ opacity: loaded ? 1 : 0 }}
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path
                d="M8 12h8M12 8v8M20 12a8 8 0 0 1-11.6 7.1L4 21l1.9-4.4A8 8 0 1 1 20 12Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </Magnetic>
    </div>
  )
}