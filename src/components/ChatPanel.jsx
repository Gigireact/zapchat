import React, { useState, useRef, useEffect } from 'react';
import { colorFor, initials, isOnline, REPLY_BANKS } from '../data';
// import styles from './ChatPanel.module.css';

export default function ChatPanel({ currentUser, contact, messages, onSendMessage, isTyping, onBack }) {
  const [text, setText] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const EMOJIS = ['😊', '😂', '❤️', '👍', '🔥', '✅', '🎉', '😎', '🤔', '💡', '🙏', '👏'];
  const emojiIdx = useRef(0);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [contact]);

  function send() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setText('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  function autoResize(e) {
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
  }

  function insertEmoji() {
    setText(t => t + EMOJIS[emojiIdx.current++ % EMOJIS.length]);
    inputRef.current?.focus();
  }

  // Group messages by date
  const groups = [];
  let lastDate = '';
  messages.forEach(m => {
    const d = m.time.toDateString();
    if (d !== lastDate) { groups.push({ type: 'date', label: d === new Date().toDateString() ? 'Today' : m.time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }) }); lastDate = d; }
    groups.push({ type: 'msg', msg: m });
  });

  const online = isOnline(contact.id);
  const cc = colorFor(contact.name);


  return (
  <div className="flex flex-1 flex-col min-h-0 overflow-hidden bg-bg">

    {/* Header */}
    <div className="flex items-center gap-3 px-5 py-[14px] border-b border-border bg-bg2 shrink-0">

       {/* Mobile Back Button */}
        <button
          onClick={onBack}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-bg3 transition"
        >
          ←
        </button>

      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0"
        style={{ background: cc.bg, color: cc.text }}
      >
        {initials(contact.name)}
      </div>

      <div className="flex-1">
        <strong className="block text-sm font-semibold text-text">
          {contact.name}
        </strong>

        <span className={`text-xs ${online ? "text-green" : "text-text2"}`}>
          {online ? "Online · Active now" : "Offline"}
        </span>
      </div>

      <div className="flex gap-2">

        <button
          title="Search"
          className="w-[34px] h-[34px] rounded-lg bg-bg3 border border-border flex items-center justify-center text-sm hover:border-accent transition"
        >
          🔍
        </button>

        <button
          title="Options"
          className="w-[34px] h-[34px] rounded-lg bg-bg3 border border-border flex items-center justify-center text-sm hover:border-accent transition"
        >
          ⋯
        </button>

      </div>
    </div>

    {/* Messages */}
    <div className="flex-1 min-h-0 overflow-y-auto px-5 py-5 flex flex-col gap-[2px]">

      {groups.map((g, i) => {

        if (g.type === "date") {
          return (
            <div
              key={`d${i}`}
              className="flex items-center gap-3 my-3"
            >
              <div className="flex-1 h-px bg-border"></div>

              <span className="text-[11px] text-text3 whitespace-nowrap">
                {g.label}
              </span>

              <div className="flex-1 h-px bg-border"></div>
            </div>
          );
        }

        const m = g.msg;
        const mine = m.from === currentUser.id;
        const sender = mine ? currentUser : contact;
        const sc = colorFor(sender.name);

        const nextMsg = groups[i + 1];
        const nextSame =
          nextMsg &&
          nextMsg.type === "msg" &&
          nextMsg.msg.from === m.from;

        return (
          <div
            key={m.id}
            className={`flex gap-2 max-w-[72%] ${
              mine ? "ml-auto flex-row-reverse" : ""
            }`}
          >

            {!mine && (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold self-end mb-[2px] shrink-0"
                style={{
                  background: sc.bg,
                  color: sc.text,
                }}
              >
                {!nextSame ? initials(sender.name) : ""}
              </div>
            )}

            <div>

              <div
                className={
                  mine
                    ? "px-[14px] py-[10px] rounded-[14px_4px_14px_14px] text-[13.5px] leading-[1.5] break-words bg-gradient-to-br from-accent to-accent3 text-text"
                    : "px-[14px] py-[10px] rounded-[4px_14px_14px_14px] text-[13.5px] leading-[1.5] break-words bg-bg3 border border-border text-text"
                }
                dangerouslySetInnerHTML={{
                  __html: escHtml(m.text),
                }}
              />

              {!nextSame && (
                <div
                  className={`text-[10px] text-text3 mt-[3px] px-[2px] ${
                    mine ? "text-right" : ""
                  }`}
                >
                  {m.time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}

                  {mine && (
                    <span className="text-accent2">
                      {" "}✓✓
                    </span>
                  )}

                </div>
              )}

            </div>

          </div>
        );
      })}
            {isTyping && (
        <div className="flex gap-2 max-w-[72%]">

          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold self-end shrink-0"
            style={{
              background: cc.bg,
              color: cc.text,
            }}
          >
            {initials(contact.name)}
          </div>

          <div className="flex items-center gap-1 px-[14px] py-[10px] rounded-[4px_14px_14px_14px] bg-bg3 border border-border">

            <span
              className="w-1.5 h-1.5 rounded-full bg-text2"
              style={{ animation: "typing 1.2s ease infinite" }}
            ></span>

            <span
              className="w-1.5 h-1.5 rounded-full bg-text2"
              style={{
                animation: "typing 1.2s ease infinite",
                animationDelay: "0.2s",
              }}
            ></span>

            <span
              className="w-1.5 h-1.5 rounded-full bg-text2"
              style={{
                animation: "typing 1.2s ease infinite",
                animationDelay: "0.4s",
              }}
            ></span>

          </div>
        </div>
      )}

      <div ref={bottomRef} />

    </div>

    {/* Input */}
    <div className="px-4 py-[14px] border-t border-border bg-bg2 flex items-end gap-[10px] shrink-0">

      <div className="flex-1 flex items-center gap-2 rounded-xl border border-border bg-bg3 px-[14px] py-2 transition focus-within:border-accent">

        <button
          onClick={insertEmoji}
          className="shrink-0 text-lg text-text3 hover:text-accent transition"
        >
          😊
        </button>

        <textarea
          ref={inputRef}
          placeholder="Type a message…"
          rows={1}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            autoResize(e);
          }}
          onKeyDown={handleKey}
          className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-text placeholder:text-text3 leading-6 max-h-[100px] min-h-[20px]"
        />

      </div>

      <button
        onClick={send}
        className="w-10 h-10 shrink-0 rounded-[10px] bg-gradient-to-br from-accent to-accent3 flex items-center justify-center transition hover:opacity-90 hover:scale-105 active:scale-95"
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="white"
        >
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>

    </div>

  </div>
);
}

function escHtml(t) {
  return t
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
}
