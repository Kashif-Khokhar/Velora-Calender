import { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Download, Share2, Type,
  MapPin, Check, Cake, Heart, Sun, Laptop, Image as ImageIcon, Upload, Camera,
  GraduationCap, Baby, Sparkles, Leaf, Zap, ChevronLeft, ChevronRight
} from 'lucide-react';
import domtoimage from 'dom-to-image-more';

// ─── Date / Time Helpers ─────────────────────────────────────────────────────
const formatDateDisplay = (iso) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`;
};

const formatTimeDisplay = (t) => {
  if (!t || !t.includes(':')) return t;
  const [hStr, minStr] = t.split(':');
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${minStr} ${ampm}`;
};

// ─── Mini Calendar ───────────────────────────────────────────────────────────
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const MiniCalendar = ({ theme, dateIso }) => {
  const parsed = dateIso ? new Date(dateIso + 'T00:00:00') : new Date();
  const year        = parsed.getFullYear();
  const month       = parsed.getMonth();
  const selectedDay = parsed.getDate();

  const daysInMonth  = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const cells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/80"
      style={{ maxWidth: '260px', background: 'white', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.08)' }}>

      {/* Header */}
      <div className="px-4 py-3 flex justify-between items-center"
        style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary || theme.primary}cc)` }}>
        <div>
          <p className="text-white/70 text-[9px] font-bold uppercase tracking-widest leading-none">Month</p>
          <p className="text-white text-lg font-black leading-tight">{MONTH_NAMES[month]}</p>
        </div>
        <div className="text-right">
          <p className="text-white/70 text-[9px] font-bold uppercase tracking-widest leading-none">Year</p>
          <p className="text-white text-lg font-black leading-tight">{year}</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-3 py-2.5">
        {/* Weekday labels */}
        <div className="grid grid-cols-7 mb-1">
          {days.map((d, i) => (
            <span key={i} className="text-center text-[10px] font-black py-1"
              style={{ color: i === 0 || i === 6 ? theme.primary : '#94a3b8' }}>
              {d}
            </span>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-y-0.5">
          {cells.map((d, i) => {
            const isSelected = d === selectedDay;
            const isWeekend  = (i % 7 === 0 || i % 7 === 6) && d !== null;
            return (
              <div key={i} className="flex items-center justify-center py-0.5">
                <div
                  className={`w-7 h-7 flex items-center justify-center rounded-full text-[11px] font-bold transition-all
                    ${isSelected ? 'scale-110' : ''}
                  `}
                  style={isSelected ? {
                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary || theme.primary})`,
                    color: 'white',
                    boxShadow: `0 4px 12px ${theme.primary}55`,
                  } : {
                    color: !d ? 'transparent' : isWeekend ? theme.primary : '#475569',
                  }}
                >
                  {d ?? ''}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer accent */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary || theme.primary}44)` }} />
    </div>
  );
};

// ─── Themes ───────────────────────────────────────────────────────────────────
const themes = {
  summer: {
    name: 'Summer Bash',
    primary: '#ea580c',
    secondary: '#e11d48',
    accent: '#fbbf24',
    bgGradient: 'linear-gradient(135deg, #fb923c 0%, #fb7185 50%, #fbbf24 100%)',
    cardBg: 'linear-gradient(135deg, #fff7ed 0%, #fff1f2 100%)',
    blobColor1: '#ffedd5',
    blobColor2: '#ffe4e6',
    textColor: '#0f172a',
    subtextColor: '#ea580c',
    iconColor: '#ea580c',
    iconBg: '#ffedd5',
    accentBar: '#ea580c',
    icon: Sun,
    emoji: '☀️'
  },
  birthday: {
    name: 'Neon Birthday',
    primary: '#7c3aed',
    secondary: '#e11d48',
    accent: '#fb7185',
    bgGradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #e11d48 100%)',
    cardBg: 'linear-gradient(135deg, #f5f3ff 0%, #fff1f2 100%)',
    blobColor1: '#f5f3ff',
    blobColor2: '#fff1f2',
    textColor: '#0f172a',
    subtextColor: '#7c3aed',
    iconColor: '#7c3aed',
    iconBg: '#f5f3ff',
    accentBar: '#7c3aed',
    icon: Cake,
    emoji: '🎂'
  },
  wedding: {
    name: 'Wedding Bliss',
    primary: '#9f7260',
    secondary: '#e11d48',
    accent: '#f9a8d4',
    bgGradient: 'linear-gradient(135deg, #fdf2f8 0%, #f8e8e0 100%)',
    cardBg: 'linear-gradient(135deg, #fdf2f8 0%, #f1f5f9 100%)',
    blobColor1: '#fdf2f8',
    blobColor2: '#fff1f2',
    textColor: '#0f172a',
    subtextColor: '#9f7260',
    iconColor: '#9f7260',
    iconBg: '#fdf2f8',
    accentBar: '#9f7260',
    icon: Heart,
    emoji: '💍'
  },
  tech: {
    name: 'Tech Night',
    primary: '#38bdf8',
    secondary: '#818cf8',
    accent: '#64748b',
    bgGradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c4a6e 100%)',
    cardBg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    blobColor1: '#1e293b',
    blobColor2: '#1e1b4b',
    textColor: '#f8fafc',
    subtextColor: '#38bdf8',
    iconColor: '#38bdf8',
    iconBg: '#0c4a6e',
    accentBar: '#38bdf8',
    icon: Laptop,
    emoji: '💻',
    dark: true
  },
  scrapbook: {
    name: 'Scrapbook Birthday',
    primary: '#f59e0b',
    secondary: '#ef4444',
    accent: '#3f3f46',
    bgGradient: 'linear-gradient(to bottom right, #fafaf9, #f5f5f4)',
    cardBg: '#fafaf9',
    blobColor1: '#fef3c7',
    blobColor2: '#fee2e2',
    textColor: '#18181b',
    subtextColor: '#71717a',
    iconColor: '#f59e0b',
    iconBg: '#fef3c7',
    accentBar: '#f59e0b',
    icon: Camera,
    emoji: '📷',
    layout: 'scrapbook'
  },
  gala: {
    name: 'Black Tie Gala',
    primary: '#d4af37',
    secondary: '#b8860b',
    accent: '#fff8dc',
    bgGradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
    cardBg: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
    blobColor1: '#1a1a2e',
    blobColor2: '#16213e',
    textColor: '#faf8f0',
    subtextColor: '#d4af37',
    iconColor: '#d4af37',
    iconBg: '#1a1a2e',
    accentBar: '#d4af37',
    icon: Sparkles,
    emoji: '✨',
    dark: true,
    layout: 'gala'
  },
  garden: {
    name: 'Garden Party',
    primary: '#16a34a',
    secondary: '#86efac',
    accent: '#bbf7d0',
    bgGradient: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
    cardBg: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
    blobColor1: '#dcfce7',
    blobColor2: '#fef9c3',
    textColor: '#14532d',
    subtextColor: '#16a34a',
    iconColor: '#16a34a',
    iconBg: '#dcfce7',
    accentBar: '#16a34a',
    icon: Leaf,
    emoji: '🌿',
    layout: 'garden'
  },
  retro: {
    name: 'Retro Neon',
    primary: '#f0abfc',
    secondary: '#818cf8',
    accent: '#fde68a',
    bgGradient: 'linear-gradient(135deg, #1e0533 0%, #0d0d1a 50%, #1a0028 100%)',
    cardBg: 'linear-gradient(135deg, #1e0533 0%, #0d0d1a 100%)',
    blobColor1: '#2e0057',
    blobColor2: '#1e003a',
    textColor: '#fdf4ff',
    subtextColor: '#f0abfc',
    iconColor: '#f0abfc',
    iconBg: '#2e0057',
    accentBar: '#f0abfc',
    icon: Zap,
    emoji: '⚡',
    dark: true,
    layout: 'retro'
  },
};

const themeKeys = Object.keys(themes);

// ─── Preview Layouts ──────────────────────────────────────────────────────────

// Scrapbook Layout
const ScrapbookPreview = ({ theme, formData, imagePreview, imagePreview2 }) => (
  <div className="w-full h-full flex flex-col relative overflow-hidden bg-[#fafaf9]">
    <div className="pt-4 flex flex-col items-center">
      <h2 className="text-3xl font-black tracking-tighter text-slate-800 drop-shadow-sm mb-0 flex gap-0.5">
        {['H','a','P','p','Y'].map((l, i) => (
          <span key={i} className="bg-white px-1 border border-slate-300 shadow-sm" style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (2 + i)}deg)` }}>{l}</span>
        ))}
      </h2>
      <h1 className="text-4xl font-black tracking-tighter text-slate-900 drop-shadow-md flex gap-0.5 -mt-1">
        {['B','I','R','T','H','D','A','Y'].map((l, i) => (
          <span key={i} className="bg-white px-1 border-2 border-slate-400 shadow-sm" style={{ transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (1 + (i % 3))}deg)` }}>{l}</span>
        ))}
      </h1>
    </div>
    <div className="flex flex-1 w-full gap-3 p-3 items-center">
      <div className="flex-1 space-y-3 flex flex-col items-center">
        <div className="relative w-full aspect-[4/5] bg-slate-100 border-4 border-white shadow-lg rotate-[-4deg] overflow-hidden">
          {imagePreview ? (
            <img src={imagePreview} alt="Photo 1" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <ImageIcon className="w-10 h-10" />
            </div>
          )}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-5 bg-amber-100/60 backdrop-blur-sm -rotate-2 shadow-sm" />
        </div>
        <div className="relative w-3/4 aspect-[4/3] bg-slate-100 border-4 border-white shadow-lg rotate-[3deg] overflow-hidden">
          {imagePreview2 ? (
            <img src={imagePreview2} alt="Photo 2" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <ImageIcon className="w-8 h-8" />
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center gap-4">
        <div className="italic text-3xl font-serif text-slate-800 -rotate-6">
          {formatDateDisplay(formData.date).split(',')[0]}
        </div>
        <div className="relative">
          <MiniCalendar theme={theme} dateIso={formData.date} />
          <div className="absolute -top-3 -right-3 w-8 h-8 rotate-12 opacity-80">
            <Cake className="w-full h-full text-amber-500" />
          </div>
        </div>
        {/* Decorative dots below calendar */}
        <div className="flex gap-2 mt-1 justify-end w-full pr-1">
          <div className="w-3.5 h-3.5 rounded-full bg-red-400" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }} />
          <div className="w-3.5 h-3.5 rounded-full bg-amber-400" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }} />
          <div className="w-3.5 h-3.5 rounded-full bg-green-400" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }} />
        </div>

      </div>
    </div>
  </div>
);

// Gala Layout (dark, elegant, gold)
const GalaPreview = ({ theme, formData, imagePreview }) => (
  <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
    style={{ background: theme.cardBg }}>
    {/* Gold corner ornaments */}
    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 opacity-40" style={{ borderColor: theme.primary }} />
    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 opacity-40" style={{ borderColor: theme.primary }} />
    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 opacity-40" style={{ borderColor: theme.primary }} />
    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 opacity-40" style={{ borderColor: theme.primary }} />

    {/* Subtle shimmer line top */}
    <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }} />
    <div className="absolute bottom-0 left-0 w-full h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }} />

    <div className="relative z-10 text-center px-8 space-y-5 w-full">
      {/* Divider ornament */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}60)` }} />
        <Sparkles className="w-4 h-4" style={{ color: theme.primary }} />
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${theme.primary}60, transparent)` }} />
      </div>

      <p className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color: theme.subtextColor }}>
        You Are Cordially Invited To
      </p>

      {imagePreview && (
        <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-2" style={{ borderColor: theme.primary + '80' }}>
          <img src={imagePreview} alt="Guest" className="w-full h-full object-cover" />
        </div>
      )}

      <div>
        <h1 className="text-3xl font-black tracking-wide mb-1" style={{ color: theme.textColor, fontFamily: 'Georgia, serif' }}>
          {formData.title || 'The Grand Gala'}
        </h1>
        <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: theme.subtextColor + 'cc' }}>
          A Black Tie Evening
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}60)` }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: theme.primary }} />
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${theme.primary}60, transparent)` }} />
      </div>

      <div className="space-y-2 text-sm">
        <p className="font-bold" style={{ color: theme.textColor }}>
          <span style={{ color: theme.subtextColor }}>📅</span> {formatDateDisplay(formData.date)} · {formatTimeDisplay(formData.time)}
        </p>
        <p className="font-bold" style={{ color: theme.textColor + 'cc' }}>
          <span style={{ color: theme.subtextColor }}>📍</span> {formData.location}
        </p>
      </div>

      {/* RSVP button area */}
      <div className="inline-block px-6 py-2 text-[10px] font-black tracking-[0.3em] uppercase border"
        style={{ borderColor: theme.primary + '60', color: theme.primary }}>
        RSVP Required
      </div>
    </div>
  </div>
);

// Garden Layout (bright, floral, organic)
const GardenPreview = ({ theme, formData, imagePreview }) => (
  <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
    style={{ background: theme.cardBg }}>
    {/* Decorative blob circles */}
    <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-50" style={{ background: theme.blobColor1 }} />
    <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-40" style={{ background: theme.blobColor2 }} />

    {/* Top stripe */}
    <div className="absolute top-0 left-0 w-full h-1.5" style={{ background: theme.bgGradient }} />

    <div className="relative z-10 text-center px-8 space-y-4 w-full">
      <div className="flex justify-center gap-2 text-2xl">
        🌸 🌿 🌷
      </div>

      <div>
        <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-1" style={{ color: theme.subtextColor }}>
          You're Invited To
        </p>
        <h1 className="text-3xl font-black leading-tight" style={{ color: theme.textColor }}>
          {formData.title || 'Garden Celebration'}
        </h1>
      </div>

      {imagePreview && (
        <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-4 border-white shadow-xl">
          <img src={imagePreview} alt="Guest" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white shadow-sm w-full space-y-3">
        <div className="flex items-center gap-3 text-left">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: theme.iconBg }}>
            📅
          </div>
          <div>
            <p className="text-[9px] uppercase font-black tracking-wider" style={{ color: theme.subtextColor }}>When</p>
            <p className="text-sm font-bold" style={{ color: theme.textColor }}>{formatDateDisplay(formData.date)} · {formatTimeDisplay(formData.time)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-left">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: theme.iconBg }}>
            📍
          </div>
          <div>
            <p className="text-[9px] uppercase font-black tracking-wider" style={{ color: theme.subtextColor }}>Where</p>
            <p className="text-sm font-bold" style={{ color: theme.textColor }}>{formData.location}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 text-xl">
        🌼 🦋 🌻
      </div>
    </div>
  </div>
);

// Retro Neon Layout
const RetroPreview = ({ theme, formData, imagePreview }) => (
  <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
    style={{ background: theme.cardBg }}>
    {/* Neon grid background */}
    <div className="absolute inset-0 opacity-5"
      style={{ backgroundImage: 'linear-gradient(rgba(240,171,252,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(240,171,252,0.4) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

    {/* Neon glow blobs */}
    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl opacity-20" style={{ background: theme.primary }} />
    <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl opacity-15" style={{ background: theme.secondary }} />
    <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-15" style={{ background: theme.accent }} />

    <div className="relative z-10 text-center px-6 space-y-4 w-full">
      <div className="flex items-center gap-2 justify-center">
        <div className="h-px flex-1 opacity-50" style={{ background: theme.primary }} />
        <Zap className="w-5 h-5" style={{ color: theme.primary, filter: `drop-shadow(0 0 6px ${theme.primary})` }} />
        <div className="h-px flex-1 opacity-50" style={{ background: theme.primary }} />
      </div>

      <div>
        <p className="text-[9px] font-black tracking-[0.4em] uppercase mb-2" 
          style={{ color: theme.subtextColor, textShadow: `0 0 10px ${theme.primary}` }}>
          ⚡ You Are Invited ⚡
        </p>
        <h1 className="text-4xl font-black tracking-tight leading-none"
          style={{ color: theme.textColor, textShadow: `0 0 20px ${theme.primary}60, 0 0 40px ${theme.primary}30` }}>
          {formData.title || 'Epic Night'}
        </h1>
      </div>

      {imagePreview && (
        <div className="w-16 h-16 rounded-full mx-auto overflow-hidden border-2" 
          style={{ borderColor: theme.primary, boxShadow: `0 0 12px ${theme.primary}60` }}>
          <img src={imagePreview} alt="Guest" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="space-y-2 w-full">
        {[
          { icon: '📅', label: 'WHEN', val: `${formatDateDisplay(formData.date)} · ${formatTimeDisplay(formData.time)}` },
          { icon: '📍', label: 'WHERE', val: formData.location },
        ].map(({ icon, label, val }) => (
          <div key={label} className="flex items-center gap-3 text-left px-3 py-2.5 rounded-lg border"
            style={{ background: `${theme.primary}10`, borderColor: `${theme.primary}30` }}>
            <span className="text-base">{icon}</span>
            <div>
              <p className="text-[8px] font-black tracking-widest uppercase" style={{ color: theme.subtextColor }}>{label}</p>
              <p className="text-xs font-bold" style={{ color: theme.textColor }}>{val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 justify-center">
        <div className="h-px flex-1 opacity-50" style={{ background: theme.accent }} />
        <span className="text-[8px] font-black tracking-widest uppercase px-2" style={{ color: theme.accent }}>
          Be There
        </span>
        <div className="h-px flex-1 opacity-50" style={{ background: theme.accent }} />
      </div>
    </div>
  </div>
);

// Standard (default) Card Layout
const StandardPreview = ({ theme, formData, imagePreview }) => (
  <>
    {/* Top accent bar */}
    <div className="absolute top-0 left-0 w-full h-1.5" style={{ background: theme.bgGradient }} />

    {/* Blobs */}
    <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-60" style={{ backgroundColor: theme.blobColor1 }} />
    <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-60" style={{ backgroundColor: theme.blobColor2 }} />

    <div className="relative z-10 space-y-5 flex flex-col items-center w-full">
      {imagePreview && (
        <div className="w-20 h-20 rounded-full border-4 border-white shadow-2xl overflow-hidden -mt-2 mb-1">
          <img src={imagePreview} alt="Guest" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] font-black mb-1" style={{ color: theme.subtextColor }}>
          {theme.emoji} You Are Invited
        </p>
        <h1 className="text-4xl font-black leading-tight tracking-tight" style={{ color: theme.textColor }}>
          {formData.title || 'Event Title'}
        </h1>
      </div>

      {/* Info card */}
      <div className="w-full rounded-2xl p-5 space-y-3.5 border shadow-sm"
        style={{ background: theme.dark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.85)', borderColor: theme.dark ? 'rgba(255,255,255,0.1)' : '#f1f5f9' }}>
        {[
          { icon: <theme.icon className="w-5 h-5" style={{ color: theme.iconColor }} />, label: 'When', val: `${formatDateDisplay(formData.date)} · ${formatTimeDisplay(formData.time)}` },
          { icon: <MapPin className="w-5 h-5" style={{ color: theme.iconColor }} />, label: 'Where', val: formData.location },
        ].map(({ icon, label, val }) => (
          <div key={label} className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme.iconBg }}>
              {icon}
            </div>
            <div>
              <p className="text-[9px] uppercase font-black tracking-widest" style={{ color: theme.dark ? 'rgba(255,255,255,0.4)' : '#94a3b8' }}>{label}</p>
              <p className="font-bold text-sm" style={{ color: theme.dark ? 'rgba(255,255,255,0.9)' : '#334155' }}>{val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* RSVP row */}
      <div className="w-full flex items-center gap-3">
        <div className="flex-1 h-px opacity-30" style={{ background: theme.accentBar }} />
        <span className="text-[9px] font-black tracking-[0.25em] uppercase" style={{ color: theme.subtextColor }}>RSVP</span>
        <div className="flex-1 h-px opacity-30" style={{ background: theme.accentBar }} />
      </div>
    </div>
  </>
);

// ─── Main Editor Component ────────────────────────────────────────────────────
export default function Editor() {
  const [searchParams] = useSearchParams();
  const previewRef = useRef(null);
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const [isSharing, setIsSharing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [formData, setFormData] = useState({
    title: searchParams.get('title') || 'Amy\'s 25th Birthday',
    date: '2026-10-24',
    time: '20:00',
    location: 'Rooftop Bar, NYC'
  });

  const [activeTheme, setActiveTheme] = useState(() => {
    const themeParam = searchParams.get('theme');
    return themes[themeParam] ? themeParam : 'summer';
  });
  const theme = themes[activeTheme];

  // Default titles per theme — update card title when theme changes
  const themeDefaultTitles = {
    summer:    "Summer Pool Party 🌊",
    birthday:  "Alex's 25th Birthday 🎂",
    wedding:   "Sarah & James's Wedding 💍",
    tech:      "Annual Dev Summit 2026",
    gala:      "New Year's Eve Gala 2026 ✨",
    garden:    "Garden Summer Party 🌸",
    retro:     "Retro Neon Birthday 🎮",
    scrapbook: "Emma's Birthday Bash 🎉",
  };

  // Switch theme AND update card title together
  const switchTheme = (key) => {
    setActiveTheme(key);
    setFormData(prev => ({ ...prev, title: themeDefaultTitles[key] || prev.title }));
    // Clear photos when leaving scrapbook theme
    if (key !== 'scrapbook') {
      setImagePreview(null);
      setImagePreview2(null);
    }
  };

  // Cycle themes with arrow buttons
  const cycleTheme = (dir) => {
    const idx = themeKeys.indexOf(activeTheme);
    const next = (idx + dir + themeKeys.length) % themeKeys.length;
    switchTheme(themeKeys[next]);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview2(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!previewRef.current) return;
    try {
      const scale = 2;
      const node = previewRef.current;
      const blob = await domtoimage.toBlob(node, {
        width:  node.offsetWidth  * scale,
        height: node.offsetHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width:  node.offsetWidth  + 'px',
          height: node.offsetHeight + 'px',
        },
      });
      const url  = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href     = url;
      link.download = `${formData.title.replace(/\s+/g, '_')}_invite.png`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (_err) {
      alert(`Failed to save: ${_err.message}`);
    }
  };

  const handleShare = async () => {
    const shareData = { title: formData.title, text: `Check out my invitation for ${formData.title}!`, url: window.location.href };
    if (navigator.share && navigator.canShare(shareData)) {
      try { await navigator.share(shareData); } catch (err) { if (err.name !== 'AbortError') console.error(err); }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setIsSharing(true);
        setTimeout(() => setIsSharing(false), 2000);
      } catch { alert('Failed to copy link.'); }
    }
  };

  const renderPreview = () => {
    const props = { theme, formData, imagePreview };
    switch (theme.layout) {
      case 'scrapbook': return <ScrapbookPreview {...props} imagePreview2={imagePreview2} />;
      case 'gala': return <GalaPreview {...props} />;
      case 'garden': return <GardenPreview {...props} />;
      case 'retro': return <RetroPreview {...props} />;
      default: return <StandardPreview {...props} />;
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 lg:py-20 h-auto lg:min-h-[calc(100vh-80px)]">
      <div className="flex flex-col lg:flex-row gap-8 h-full">

        {/* ── Sidebar Controls ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-80 bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-lg flex flex-col gap-5"
          style={{ height: 'auto', minHeight: '500px' }}
        >
          <h2 className="text-lg font-black flex items-center gap-2 text-slate-800">
            <Type className="w-5 h-5 text-orange-600" /> Customize Invite
          </h2>

          {/* Inputs */}
          <div className="space-y-4 flex-1">
            {/* Event Title */}
            <div>
              <label className="block text-xs text-slate-500 mb-1 font-bold uppercase tracking-wider">Event Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium text-sm"
              />
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-xs text-slate-500 mb-1 font-bold uppercase tracking-wider">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium text-sm cursor-pointer"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-xs text-slate-500 mb-1 font-bold uppercase tracking-wider">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium text-sm cursor-pointer"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs text-slate-500 mb-1 font-bold uppercase tracking-wider">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium text-sm"
              />
            </div>

            {/* Image Upload — only shown for Scrapbook (birthday) theme */}
            {activeTheme === 'scrapbook' && (
              <div className="space-y-3">
                <label className="block text-xs text-slate-500 mb-1 font-bold uppercase tracking-wider">Photos</label>

                {/* Photo 1 */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Photo 1 (tall polaroid)</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="flex-1 py-2.5 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-2 text-sm text-slate-500 hover:border-orange-500 hover:text-orange-600 transition-all bg-white/50 font-medium"
                    >
                      {imagePreview ? <Check className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
                      {imagePreview ? 'Selected ✓' : 'Upload'}
                    </button>
                    {imagePreview && (
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                        <img src={imagePreview} alt="P1" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                </div>

                {/* Photo 2 */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Photo 2 (wide polaroid)</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => fileInputRef2.current.click()}
                      className="flex-1 py-2.5 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-2 text-sm text-slate-500 hover:border-orange-500 hover:text-orange-600 transition-all bg-white/50 font-medium"
                    >
                      {imagePreview2 ? <Check className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
                      {imagePreview2 ? 'Selected ✓' : 'Upload'}
                    </button>
                    {imagePreview2 && (
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                        <img src={imagePreview2} alt="P2" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef2} onChange={handleImageUpload2} accept="image/*" className="hidden" />
                </div>
              </div>
            )}

            {/* Theme Switcher */}
            <div>
              <label className="block text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">Theme</label>
              <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200">
                <button onClick={() => cycleTheme(-1)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: theme.bgGradient }} />
                    <span className="text-sm font-bold text-slate-800">{theme.name}</span>
                  </div>
                </div>
                <button onClick={() => cycleTheme(1)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Theme dots */}
              <div className="flex justify-center gap-1.5 mt-2.5">
                {themeKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => switchTheme(key)}
                    title={themes[key].name}
                    className="relative group"
                  >
                    <div
                      className="w-5 h-5 rounded-full border-2 transition-all"
                      style={{
                        background: themes[key].bgGradient,
                        borderColor: activeTheme === key ? '#ea580c' : 'transparent',
                        transform: activeTheme === key ? 'scale(1.25)' : 'scale(1)',
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-200/50">
            <button
              onClick={handleShare}
              className="flex-1 py-3 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 text-sm"
            >
              {isSharing ? <><Check className="w-4 h-4" /> Linked!</> : <><Share2 className="w-4 h-4" /> Share</>}
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 bg-white/60 border border-slate-200 hover:bg-white text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md text-sm"
            >
              <Download className="w-4 h-4" /> Save
            </button>
          </div>
        </motion.div>

        {/* ── Live Preview ── */}
        <div className="flex-1 flex items-center justify-center rounded-2xl overflow-hidden relative p-4 md:p-8">
          {/* Background pattern behind the card */}
          <div className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <motion.div
            key={activeTheme}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full relative z-10"
            style={{ maxWidth: '420px' }}
          >
            <div
              ref={previewRef}
              className="w-full rounded-3xl shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center p-8 border"
              style={{
                minHeight: '520px',
                background: theme.layout === 'scrapbook' ? '#fafaf9' : theme.cardBg || 'white',
                borderColor: theme.dark ? 'rgba(255,255,255,0.08)' : '#f1f5f9',
              }}
            >
              {renderPreview()}
            </div>

            {/* Theme label badge below preview */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-2 h-2 rounded-full" style={{ background: theme.bgGradient }} />
              <span className="text-xs font-bold text-slate-500">{theme.name}</span>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
