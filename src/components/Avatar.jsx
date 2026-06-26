import React from 'react';
import { colorFor, initials } from '../data';

export default function Avatar({ name, size = 38, showStatus = false, online = false }) {
  const c = colorFor(name);
  const fontSize = Math.floor(size * 0.35);
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: c.bg, color: c.text,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize, fontWeight: 600, flexShrink: 0, position: 'relative',
    }}>
      {initials(name)}
      {showStatus && (
        <span style={{
          position: 'absolute', bottom: 1, right: 1,
          width: 10, height: 10, borderRadius: '50%',
          border: '2px solid var(--bg2)',
          background: online ? 'var(--green)' : 'var(--text3)',
        }} />
      )}
    </div>
  );
}
