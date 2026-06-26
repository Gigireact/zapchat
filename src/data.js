// ── Color palette for avatars ──
const COLORS = [
  { bg: 'rgba(124,106,247,0.25)', text: '#a89cf8' },
  { bg: 'rgba(74,222,128,0.2)',   text: '#4ade80' },
  { bg: 'rgba(251,191,36,0.2)',   text: '#fbbf24' },
  { bg: 'rgba(248,113,113,0.2)',  text: '#f87171' },
  { bg: 'rgba(34,211,238,0.2)',   text: '#22d3ee' },
  { bg: 'rgba(249,115,22,0.2)',   text: '#fb923c' },
];

export function colorFor(name) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) % COLORS.length;
  return COLORS[h];
}

export function initials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

// ── Users ──
export const USERS = [
  { id: 1, name: 'Alex Rivera',   username: 'alex',   password: 'alex'   },
  { id: 2, name: 'Jordan Kim',    username: 'jordan', password: 'jordan' },
  { id: 3, name: 'Sam Torres',    username: 'sam',    password: 'sam'    },
  { id: 4, name: 'Casey Morgan',  username: 'casey',  password: 'casey'  },
  { id: 5, name: 'Riley Patel',   username: 'riley',  password: 'riley'  },
];

export function msgKey(a, b) { return [a, b].sort().join('_'); }

// ── Seed messages ──
function seed(store, fromId, toId, text, minutesAgo) {
  const k = msgKey(fromId, toId);
  if (!store[k]) store[k] = [];
  store[k].push({
    id: `${fromId}_${toId}_${minutesAgo}`,
    from: fromId,
    text,
    time: new Date(Date.now() - minutesAgo * 60000),
    read: minutesAgo > 5,
  });
}

export function buildInitialMessages() {
  const s = {};
  seed(s, 1, 2, "Hey Jordan! Saw your latest design mockup 🔥", 120);
  seed(s, 2, 1, "Thanks! Still tweaking the colors though", 118);
  seed(s, 1, 2, "It looked great. When's the review?", 115);
  seed(s, 2, 1, "Tomorrow 3pm. You coming?", 113);
  seed(s, 1, 2, "Definitely! See you there 👍", 110);
  seed(s, 2, 1, "Awesome, see you!", 108);
  seed(s, 1, 3, "Sam, did you push the latest changes?", 90);
  seed(s, 3, 1, "Yep, just merged the PR", 88);
  seed(s, 1, 3, "Perfect. Tests passing?", 87);
  seed(s, 3, 1, "All green ✅", 85);
  seed(s, 2, 3, "Quick question about the API design", 200);
  seed(s, 3, 2, "Sure, what's up?", 198);
  seed(s, 2, 3, "Should we use REST or GraphQL for the new endpoints?", 196);
  seed(s, 3, 2, "GraphQL makes sense given the complexity", 194);
  seed(s, 4, 1, "Hey! Free for a call later?", 60);
  seed(s, 1, 4, "Sure, maybe around 5pm?", 58);
  seed(s, 4, 5, "Riley, have you seen the new dashboard?", 300);
  seed(s, 5, 4, "Just checked it out, looks amazing!", 298);
  return s;
}

export const REPLY_BANKS = [
  ["Got it, thanks!", "Makes sense 👍", "Absolutely!", "I was thinking the same thing",
   "Let me check on that", "Sounds good to me", "Interesting point!", "That's a great idea", "Will do!", "On it 🚀"],
  ["Haha yeah exactly 😄", "True, true", "That's what I was thinking too", "Right?? Same here",
   "Let me know when you're ready", "Sure thing!", "Noted, thanks", "Love that idea", "Definitely agree", "Perfect!"],
];

export function fmtTime(d) {
  const diff = Date.now() - d;
  if (diff < 60000) return 'just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
  if (diff < 86400000) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export function isOnline(userId) { return userId % 2 === 0; }
