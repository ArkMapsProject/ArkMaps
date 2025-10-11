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
        className={`relative flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
          selectedType === 'resource'
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-slate-700'
        }`}
      >
        <Package className={`w-6 h-6 transition-transform duration-300 ${selectedType === 'resource' ? 'rotate-12' : ''}`} />
        <span className="relative z-10">Resources</span>
        {selectedType === 'resource' && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-50 animate-pulse"></div>
        )}
      </button>
      <button
        onClick={() => onTypeChange('spawn')}
        className={`relative flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
          selectedType === 'spawn'
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50'
            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-slate-700'
        }`}
      >
        <Map className={`w-6 h-6 transition-transform duration-300 ${selectedType === 'spawn' ? 'rotate-12' : ''}`} />
        <span className="relative z-10">Spawns</span>
        {selectedType === 'spawn' && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 blur-xl opacity-50 animate-pulse"></div>
        )}
      </button>
    </div>
  );
}
