import React, { useState } from 'react';
import { colorFor, initials, fmtTime, isOnline } from '../data';
import Avatar from './Avatar';

export default function Sidebar({ currentUser, users, messages, activeContact, onSelectContact, onLogout }) {
  const [search, setSearch] = useState('');

  function getLastMsg(uid) {
    const key = [currentUser.id, uid].sort().join('_');
    const msgs = messages[key] || [];
    return msgs[msgs.length - 1];
  }

  function getUnread(uid) {
    const key = [currentUser.id, uid].sort().join('_');
    return (messages[key] || []).filter(m => m.from === uid && !m.read).length;
  }

  const contacts = users
    .filter(u => u.id !== currentUser.id && u.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const la = getLastMsg(a.id), lb = getLastMsg(b.id);
      if (!la && !lb) return 0;
      if (!la) return 1;
      if (!lb) return -1;
      return lb.time - la.time;
    });

  const myColor = colorFor(currentUser.name);

  return (
  <aside className="w-[280px] min-w-[280px] h-screen flex flex-col bg-bg2 border-r border-border">

    {/* Header */}
    <div className="flex items-center gap-[10px] px-4 py-[14px] border-b border-border">

      <div className="flex-1 flex items-center gap-[10px]">

        <div
          className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0"
          style={{
            background: myColor.bg,
            color: myColor.text,
          }}
        >
          {initials(currentUser.name)}
        </div>

        <div>

          <strong className="block text-[13px] font-semibold text-text">
            {currentUser.name}
          </strong>

          <span className="flex items-center gap-1 text-[11px] text-green">

            <span className="w-[6px] h-[6px] rounded-full bg-green"></span>

            Online

          </span>

        </div>

      </div>

      <button
        onClick={onLogout}
        className="px-[10px] py-[6px] text-[12px] whitespace-nowrap rounded-md bg-bg3 border border-border text-text2 hover:text-red hover:border-red transition"
      >
        Sign out
      </button>

    </div>

    {/* Search */}

    <div className="px-[14px] py-[10px] border-b border-border">

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍  Search conversations..."
        className="w-full px-3 py-2 rounded-[8px] bg-bg3 border border-border text-[13px] text-text placeholder:text-text3 outline-none focus:border-accent"
      />

    </div>

    {/* Section */}

    <div className="px-4 pt-[10px] pb-1 uppercase tracking-[0.8px] text-[10px] font-semibold text-text3">
      Messages
    </div>

    {/* Contact List */}

    <div className="flex-1 overflow-y-auto px-2 py-1">
            {contacts.map((u) => {
        const last = getLastMsg(u.id);
        const unread = getUnread(u.id);
        const online = isOnline(u.id);
        const c = colorFor(u.name);

        const preview = last
          ? (last.from === currentUser.id ? "You: " : "") + last.text
          : "Start chatting";

        const isActive =
          activeContact && activeContact.id === u.id;

        return (
          <div
            key={u.id}
            onClick={() => onSelectContact(u)}
            className={`
              flex items-center gap-[10px]
              p-[10px]
              mb-[2px]
              rounded-[10px]
              border
              cursor-pointer
              transition-all duration-150
              ${
                isActive
                  ? "bg-[rgba(124,106,247,0.15)] border-[rgba(124,106,247,0.25)]"
                  : "border-transparent hover:bg-bg3"
              }
            `}
          >

            {/* Avatar */}

            <div
              className="relative w-[38px] h-[38px] rounded-full flex items-center justify-center text-[14px] font-semibold shrink-0"
              style={{
                background: c.bg,
                color: c.text,
              }}
            >
              {initials(u.name)}

              <span
                className={`
                  absolute
                  bottom-[1px]
                  right-[1px]
                  w-[10px]
                  h-[10px]
                  rounded-full
                  border-2
                  border-bg2
                  ${
                    online
                      ? "bg-green"
                      : "bg-text3"
                  }
                `}
              />
            </div>

            {/* Name + Preview */}

            <div className="flex-1 min-w-0">

              <strong className="block text-[13px] font-medium text-text truncate">
                {u.name}
              </strong>

              <span className="block text-[11px] text-text2 truncate">
                {preview}
              </span>

            </div>

            {/* Time + Badge */}

            <div className="flex flex-col items-end gap-[3px] shrink-0">

              <span className="text-[10px] text-text3">
                {last ? fmtTime(last.time) : ""}
              </span>

              {unread > 0 && (
                <span className="min-w-[18px] px-[6px] py-[2px] rounded-full bg-accent text-white text-[10px] font-semibold text-center">
                  {unread}
                </span>
              )}

            </div>

          </div>
        );
      })}
    </div>

  </aside>
);
}
