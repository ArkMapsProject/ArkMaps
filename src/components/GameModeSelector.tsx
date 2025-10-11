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
        className={`relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
          selectedMode === 'ascended'
            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-slate-700'
        }`}
      >
        <span className="relative z-10">ARK Ascended</span>
        {selectedMode === 'ascended' && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 blur-xl opacity-50 animate-pulse"></div>
        )}
      </button>
      <button
        onClick={() => onModeChange('evolved')}
        className={`relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
          selectedMode === 'evolved'
            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/50'
            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-slate-700'
        }`}
      >
        <span className="relative z-10">ARK Evolved</span>
        {selectedMode === 'evolved' && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 blur-xl opacity-50 animate-pulse"></div>
        )}
      </button>
    </div>
  );
}
