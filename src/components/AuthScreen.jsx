import React, { useState } from 'react';
import { USERS, colorFor, initials } from '../data';
import Avatar from './Avatar';

export default function AuthScreen({ onLogin, userList, onRegister }) {
  const [tab, setTab] = useState('login');
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [regName, setRegName] = useState('');
  const [regUser, setRegUser] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regErr, setRegErr] = useState('');

  function doLogin() {
    const user = userList.find(u => u.username === loginUser.trim().toLowerCase() && u.password === loginPass);
    if (!user) { setLoginErr('Invalid username or password'); return; }
    setLoginErr('');
    onLogin(user);
  }

  function doRegister() {
    if (!regName.trim() || !regUser.trim() || !regPass) { setRegErr('All fields are required'); return; }
    if (userList.find(u => u.username === regUser.trim().toLowerCase())) { setRegErr('Username already taken'); return; }
    const newUser = { id: Date.now(), name: regName.trim(), username: regUser.trim().toLowerCase(), password: regPass };
    onRegister(newUser);
    setRegErr('');
  }

  const demoUsers = USERS.slice(0, 5);

  return (
  <div className="flex justify-center items-start min-h-screen p-10 bg-slate-950 overflow-y-auto animate-fadeIn">
    <div className="w-[360px] rounded-[20px] border border-slate-700 bg-slate-900 p-10 shadow-[0_0_60px_rgba(124,106,247,0.08)]">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-7">
        <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-lg">
          💬
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-white">
          Zap Chat
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-800 rounded-lg p-1 mb-6">
        <button
          onClick={() => setTab("login")}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
            tab === "login"
              ? "bg-violet-500 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Sign in
        </button>

        <button
          onClick={() => setTab("register")}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
            tab === "register"
              ? "bg-violet-500 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Sign up
        </button>
      </div>

      {/* Login */}
      {tab === "login" && (
        <div>
          <div className="mb-4">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="your username"
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doLogin()}
              autoComplete="off"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doLogin()}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20"
            />
          </div>

          <button
            onClick={doLogin}
            className="w-full mt-1 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 py-3 font-semibold text-white transition hover:opacity-90 hover:-translate-y-[1px] active:translate-y-0"
          >
            Sign in →
          </button>

          <p className="text-red-500 text-xs text-center mt-2 min-h-[16px]">
            {loginErr}
          </p>
        </div>
      )}

      {/* Register */}
      {tab === "register" && (
        <div>
          <div className="mb-4">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-2">
              Full name
            </label>

            <input
              type="text"
              placeholder="Jane Smith"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              autoComplete="off"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="janesmith"
              value={regUser}
              onChange={(e) => setRegUser(e.target.value)}
              autoComplete="off"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={regPass}
              onChange={(e) => setRegPass(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doRegister()}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20"
            />
          </div>

          <button
            onClick={doRegister}
            className="w-full mt-1 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 py-3 font-semibold text-white transition hover:opacity-90 hover:-translate-y-[1px] active:translate-y-0"
          >
            Create account →
          </button>

          <p className="text-red-500 text-xs text-center mt-2 min-h-[16px]">
            {regErr}
          </p>
        </div>
      )}

      {/* Divider */}
      <div className="flex items-center gap-3 my-5 text-xs text-slate-500">
        <div className="flex-1 h-px bg-slate-700"></div>
        <span>or try a demo account</span>
        <div className="flex-1 h-px bg-slate-700"></div>
      </div>

      {/* Demo Accounts */}
      <div className="flex flex-col gap-2">
        {demoUsers.map((u) => {
          const c = colorFor(u.name);

          return (
            <div
              key={u.id}
              onClick={() => onLogin(u)}
              className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 cursor-pointer transition hover:border-violet-500 hover:bg-slate-700"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0"
                style={{
                  background: c.bg,
                  color: c.text,
                }}
              >
                {initials(u.name)}
              </div>

              <div className="flex-1">
                <strong className="block text-sm text-white">
                  {u.name}
                </strong>

                <span className="text-[11px] text-slate-400 font-mono">
                  @{u.username} / {u.username}
                </span>
              </div>

              <span className="text-slate-500 text-lg">›</span>
            </div>
          );
        })}
      </div>

    </div>
  </div>
);
}
