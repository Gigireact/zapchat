import React, { useState, useCallback } from 'react';
import { USERS, buildInitialMessages, msgKey, REPLY_BANKS, isOnline } from './data';
import AuthScreen from './components/AuthScreen';
import Sidebar from './components/Sidebar';
import ChatPanel from './components/ChatPanel';

export default function App() {
  const [users, setUsers] = useState(USERS);
  const [messages, setMessages] = useState(buildInitialMessages);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeContact, setActiveContact] = useState(null);
  const [typing, setTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);  

  function handleLogin(user) {
    setCurrentUser(user);
    setActiveContact(null);
    setShowChat(false);
  }

  function handleRegister(newUser) {
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setActiveContact(null);
    setShowChat(false);
  }
  function handleLogout() {
    setCurrentUser(null);
    setActiveContact(null);
    setShowChat(false);
  }

  function handleSelectContact(contact) {
    setActiveContact(contact);
    setShowChat(true);

    const k = msgKey(currentUser.id, contact.id);

    setMessages(prev => {
      const updated = { ...prev };

      updated[k] = (updated[k] || []).map(m =>
        m.from === contact.id
          ? { ...m, read: true }
          : m
      );

      return updated;
    });
  }

  function handleSendMessage(text) {
    if (!activeContact) return;
    const k = msgKey(currentUser.id, activeContact.id);
    const newMsg = { id: Date.now(), from: currentUser.id, text, time: new Date(), read: true };

    setMessages(prev => ({
      ...prev,
      [k]: [...(prev[k] || []), newMsg],
    }));

    // Simulate reply (some contacts don't always reply)
    if (activeContact.id % 3 !== 0 || Math.random() > 0.3) {
      const delay = 2000 + Math.random() * 3000;
      setTimeout(() => setTyping(true), 800);
      setTimeout(() => {
        setTyping(false);
        const bank = REPLY_BANKS[activeContact.id % REPLY_BANKS.length];
        const reply = bank[Math.floor(Math.random() * bank.length)];
        const replyMsg = { id: Date.now(), from: activeContact.id, text: reply, time: new Date(), read: true };
        setMessages(prev => ({
          ...prev,
          [k]: [...(prev[k] || []), replyMsg],
        }));
      }, delay);
    }
  }

  if (!currentUser) {
    return (
      <AuthScreen
        userList={users}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    );
  }

  const chatMessages = activeContact
    ? messages[msgKey(currentUser.id, activeContact.id)] || []
    : [];

 return (
  <div className="flex h-screen overflow-hidden">

    {/* Sidebar */}

    <div
      className={`
        ${showChat ? "hidden" : "flex"}
        md:flex
      `}
    >
      <Sidebar
        currentUser={currentUser}
        users={users}
        messages={messages}
        activeContact={activeContact}
        onSelectContact={handleSelectContact}
        onLogout={handleLogout}
      />
    </div>

    {/* Chat */}

    <div
      className={`
        flex-1
        flex
        flex-col
        overflow-hidden
        bg-bg
        ${showChat ? "flex" : "hidden"}
        md:flex
      `}
    >
      {!activeContact ? (
        <div className="flex-1 flex flex-col items-center justify-center text-text3 gap-3">
          <div className="text-5xl opacity-40">
            💬
          </div>

          <p className="text-sm">
            Select a conversation to start chatting
          </p>
        </div>
      ) : (
        <ChatPanel
          currentUser={currentUser}
          contact={activeContact}
          messages={chatMessages}
          onSendMessage={handleSendMessage}
          isTyping={typing}
          onBack={() => setShowChat(false)}
        />
      )}
    </div>

  </div>
);
}
