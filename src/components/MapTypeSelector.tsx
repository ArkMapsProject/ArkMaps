import { MapType } from '../types';
import { Map, Package } from 'lucide-react';

interface MapTypeSelectorProps {
  selectedType: MapType;
  onTypeChange: (type: MapType) => void;
}

export default function MapTypeSelector({ selectedType, onTypeChange }: MapTypeSelectorProps) {
  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={() => onTypeChange('resource')}
        className={`relative flex items-center gap-4 px-10 py-5 rounded-3xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 border-[3px] ${
          selectedType === 'resource'
            ? 'glass-effect text-white shadow-2xl shadow-fuchsia-500/60 border-fuchsia-400 animate-glow'
            : 'glass-effect-light text-slate-300 hover:border-fuchsia-400/50 border-slate-700/50'
        }`}
        style={{
          color: selectedType === 'resource' ? 'rgb(232, 121, 249)' : undefined,
        }}
      >
        <Package className={`w-7 h-7 transition-transform duration-300 ${selectedType === 'resource' ? 'rotate-12 scale-110' : ''}`} />
        <span className="relative z-10 drop-shadow-lg">Resources</span>
        {selectedType === 'resource' && (
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-fuchsia-500/30 to-pink-500/30 blur-2xl opacity-70"></div>
        )}
      </button>
      <button
        onClick={() => onTypeChange('spawn')}
        className={`relative flex items-center gap-4 px-10 py-5 rounded-3xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 border-[3px] ${
          selectedType === 'spawn'
            ? 'glass-effect text-white shadow-2xl shadow-orange-500/60 border-orange-400 animate-glow'
            : 'glass-effect-light text-slate-300 hover:border-orange-400/50 border-slate-700/50'
        }`}
        style={{
          color: selectedType === 'spawn' ? 'rgb(251, 146, 60)' : undefined,
        }}
      >
        <Map className={`w-7 h-7 transition-transform duration-300 ${selectedType === 'spawn' ? 'rotate-12 scale-110' : ''}`} />
        <span className="relative z-10 drop-shadow-lg">Spawns</span>
        {selectedType === 'spawn' && (
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/30 to-red-500/30 blur-2xl opacity-70"></div>
        )}
      </button>
    </div>
  );
}
