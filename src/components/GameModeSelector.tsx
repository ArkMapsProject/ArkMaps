import { GameMode } from '../types';

interface GameModeSelectorProps {
  selectedMode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

export default function GameModeSelector({ selectedMode, onModeChange }: GameModeSelectorProps) {
  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={() => onModeChange('ascended')}
        className={`relative px-10 py-5 rounded-3xl font-bold text-lg transition-all duration-300 transform hover:scale-105 border-[3px] ${
          selectedMode === 'ascended'
            ? 'glass-effect text-white shadow-2xl shadow-cyan-500/60 border-cyan-400 animate-glow'
            : 'glass-effect-light text-slate-300 hover:border-cyan-400/50 border-slate-700/50'
        }`}
        style={{
          color: selectedMode === 'ascended' ? 'rgb(56, 189, 248)' : undefined,
        }}
      >
        <span className="relative z-10 drop-shadow-lg">ARK Ascended</span>
        {selectedMode === 'ascended' && (
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-2xl opacity-70"></div>
        )}
      </button>
      <button
        onClick={() => onModeChange('evolved')}
        className={`relative px-10 py-5 rounded-3xl font-bold text-lg transition-all duration-300 transform hover:scale-105 border-[3px] ${
          selectedMode === 'evolved'
            ? 'glass-effect text-white shadow-2xl shadow-emerald-500/60 border-emerald-400 animate-glow'
            : 'glass-effect-light text-slate-300 hover:border-emerald-400/50 border-slate-700/50'
        }`}
        style={{
          color: selectedMode === 'evolved' ? 'rgb(16, 185, 129)' : undefined,
        }}
      >
        <span className="relative z-10 drop-shadow-lg">ARK Evolved</span>
        {selectedMode === 'evolved' && (
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/30 to-teal-500/30 blur-2xl opacity-70"></div>
        )}
      </button>
    </div>
  );
}
