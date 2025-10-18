import { useState } from 'react';
import { GameMode, MapType } from './types';
import GameModeSelector from './components/GameModeSelector';
import MapTypeSelector from './components/MapTypeSelector';
import FilterSidebar from './components/FilterSidebar';
import InteractiveMap from './components/InteractiveMap';
import CustomCursor from './components/CustomCursor';
import { resourceTypes, spawnTypes, mockResourceMarkers, mockSpawnMarkers } from './data/mockData';
import { Menu } from 'lucide-react';

function App() {
  const [gameMode, setGameMode] = useState<GameMode>('ascended');
  const [mapType, setMapType] = useState<MapType>('resource');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleFilterToggle = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]
    );
  };

  const markers = mapType === 'resource' ? mockResourceMarkers : mockSpawnMarkers;

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

        <div className="relative z-10 min-h-screen flex flex-col">
          <header className="glass-effect border-b-0">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent mb-2 drop-shadow-2xl">
                    ARK Interactive Map
                  </h1>
                  <p className="text-slate-300 text-sm font-medium">
                    Explore resources and creature spawns across the ARK universe
                  </p>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="lg:hidden p-3 rounded-2xl glass-effect-light hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <GameModeSelector selectedMode={gameMode} onModeChange={setGameMode} />
              <MapTypeSelector selectedType={mapType} onTypeChange={setMapType} />
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="h-full max-w-screen-2xl mx-auto">
              <InteractiveMap
                markers={markers}
                mapType={mapType}
                resourceTypes={resourceTypes}
                spawnTypes={spawnTypes}
                selectedFilters={selectedFilters}
              />
            </div>
          </div>

          <FilterSidebar
            mapType={mapType}
            resourceTypes={resourceTypes}
            spawnTypes={spawnTypes}
            selectedFilters={selectedFilters}
            onFilterToggle={handleFilterToggle}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
