import { MapType, ResourceType, SpawnType } from '../types';
import { X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FilterSidebarProps {
  mapType: MapType;
  resourceTypes: ResourceType[];
  spawnTypes: SpawnType[];
  selectedFilters: string[];
  onFilterToggle: (filterId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({
  mapType,
  resourceTypes,
  spawnTypes,
  selectedFilters,
  onFilterToggle,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const items = mapType === 'resource' ? resourceTypes : spawnTypes;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      <div
        className={`fixed lg:relative top-0 right-0 h-full w-80 bg-slate-900/95 backdrop-blur-md border-l border-slate-700/50 z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
            <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Filters
            </h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full text-left text-sm font-semibold text-slate-300 mb-3 hover:text-white transition-colors"
              >
                <span>{mapType === 'resource' ? 'Resource Types' : 'Creature Spawns'}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`space-y-2 transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {items.map((item) => {
                  const isSelected = selectedFilters.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => onFilterToggle(item.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 transform hover:scale-102 ${
                        isSelected
                          ? 'bg-gradient-to-r from-slate-700/50 to-slate-800/50 border-2 shadow-lg'
                          : 'bg-slate-800/30 border-2 border-transparent hover:bg-slate-800/50'
                      }`}
                      style={{
                        borderColor: isSelected ? item.color : 'transparent',
                        boxShadow: isSelected ? `0 0 20px ${item.color}40` : 'none',
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-transform duration-300"
                        style={{
                          backgroundColor: `${item.color}20`,
                          transform: isSelected ? 'rotate(12deg) scale(1.1)' : 'rotate(0deg)',
                        }}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-white">{item.name}</div>
                        <div className="text-xs text-slate-400">
                          {isSelected ? 'Visible' : 'Hidden'}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                          isSelected ? 'scale-100' : 'scale-0'
                        }`}
                        style={{
                          backgroundColor: item.color,
                          borderColor: item.color,
                        }}
                      >
                        <div className="w-full h-full flex items-center justify-center text-white text-xs">
                          ✓
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <button
                onClick={() => {
                  items.forEach((item) => {
                    if (!selectedFilters.includes(item.id)) {
                      onFilterToggle(item.id);
                    }
                  });
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 font-semibold hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300"
              >
                Select All
              </button>
              <button
                onClick={() => {
                  items.forEach((item) => {
                    if (selectedFilters.includes(item.id)) {
                      onFilterToggle(item.id);
                    }
                  });
                }}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 font-semibold hover:bg-slate-800 transition-all duration-300"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
