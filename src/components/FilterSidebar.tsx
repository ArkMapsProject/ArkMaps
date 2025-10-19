import { MapType, ResourceType, SpawnType } from '../types';
import { X, ChevronDown, Search } from 'lucide-react';
import { useState, useMemo } from 'react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const items = mapType === 'resource' ? resourceTypes : spawnTypes;

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    return items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      <div
        className={`fixed lg:relative top-0 right-0 h-full w-96 glass-effect border-l-[3px] border-cyan-500/30 z-50 transition-transform duration-300 overflow-hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b-[3px] border-cyan-500/20 flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
              Filters
            </h2>
            <button
              onClick={onClose}
              className="lg:hidden p-3 glass-effect-light rounded-2xl hover:scale-110 transition-all duration-300 border-2 border-cyan-500/30"
            >
              <X className="w-6 h-6 text-cyan-300" />
            </button>
          </div>

          <div className="p-6 border-b-[3px] border-cyan-500/20">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <input
                type="text"
                placeholder="Search filters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl glass-effect-light border-[3px] border-cyan-500/30 text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-cyan-500/30"
              />
            </div>
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
                className={`space-y-3 transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {filteredItems.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    No filters found
                  </div>
                ) : (
                  filteredItems.map((item) => {
                  const isSelected = selectedFilters.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => onFilterToggle(item.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] border-[3px] ${
                        isSelected
                          ? 'glass-effect shadow-2xl'
                          : 'glass-effect-light border-transparent hover:border-slate-600/50'
                      }`}
                      style={{
                        borderColor: isSelected ? item.color : undefined,
                        boxShadow: isSelected ? `0 0 30px ${item.color}60, inset 0 0 20px ${item.color}20` : undefined,
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 border-2 flex-shrink-0"
                        style={{
                          backgroundColor: `${item.color}30`,
                          borderColor: `${item.color}60`,
                          transform: isSelected ? 'rotate(12deg) scale(1.1)' : 'rotate(0deg)',
                          boxShadow: isSelected ? `0 0 20px ${item.color}50` : 'none',
                        }}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="font-bold text-white text-lg">{item.name}</div>
                        <div className="text-sm font-medium" style={{ color: isSelected ? item.color : 'rgb(148, 163, 184)' }}>
                          {isSelected ? 'Visible' : 'Hidden'}
                        </div>
                      </div>
                      <div
                        className={`w-7 h-7 rounded-full border-[3px] transition-all duration-300 flex-shrink-0 ${
                          isSelected ? 'scale-100' : 'scale-0'
                        }`}
                        style={{
                          backgroundColor: item.color,
                          borderColor: item.color,
                          boxShadow: `0 0 15px ${item.color}80`,
                        }}
                      >
                        <div className="w-full h-full flex items-center justify-center text-white text-sm font-bold">
                          ✓
                        </div>
                      </div>
                    </button>
                  );
                  })
                )}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t-[3px] border-cyan-500/20">
              <button
                onClick={() => {
                  items.forEach((item) => {
                    if (!selectedFilters.includes(item.id)) {
                      onFilterToggle(item.id);
                    }
                  });
                }}
                className="w-full py-4 px-6 rounded-2xl glass-effect-light border-[3px] border-cyan-500/40 text-cyan-300 font-bold hover:scale-105 hover:shadow-cyan-500/50 transition-all duration-300 shadow-lg"
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
                className="w-full mt-3 py-4 px-6 rounded-2xl glass-effect-light border-[3px] border-slate-600/40 text-slate-300 font-bold hover:scale-105 hover:border-red-500/50 hover:text-red-400 transition-all duration-300 shadow-lg"
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
