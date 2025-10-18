import { useState, useRef, useEffect } from 'react';
import { MapMarker, ResourceType, SpawnType, MapType } from '../types';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface InteractiveMapProps {
  markers: MapMarker[];
  mapType: MapType;
  resourceTypes: ResourceType[];
  spawnTypes: SpawnType[];
  selectedFilters: string[];
}

export default function InteractiveMap({
  markers,
  mapType,
  resourceTypes,
  spawnTypes,
  selectedFilters,
}: InteractiveMapProps) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const items = mapType === 'resource' ? resourceTypes : spawnTypes;
  const filteredMarkers = markers.filter((marker) => selectedFilters.includes(marker.type));

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newZoom = Math.min(Math.max(zoom + delta, 0.5), 3);
    setZoom(newZoom);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const getMarkerColor = (type: string) => {
    const item = items.find((i) => i.id === type);
    return item?.color || '#fff';
  };

  const getMarkerIcon = (type: string) => {
    const item = items.find((i) => i.id === type);
    return item?.icon || '📍';
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden animated-border animate-border shadow-2xl">
      <div className="absolute inset-0 glass-effect rounded-3xl"></div>
      <div className="absolute top-4 right-4 z-20 flex gap-3">
        <button
          onClick={() => setZoom(Math.min(zoom + 0.2, 3))}
          className="p-4 rounded-2xl glass-effect-light text-cyan-300 hover:text-cyan-400 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 border-2 border-cyan-500/30"
        >
          <ZoomIn className="w-6 h-6" />
        </button>
        <button
          onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
          className="p-4 rounded-2xl glass-effect-light text-cyan-300 hover:text-cyan-400 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 border-2 border-cyan-500/30"
        >
          <ZoomOut className="w-6 h-6" />
        </button>
        <button
          onClick={resetView}
          className="p-4 rounded-2xl glass-effect-light text-cyan-300 hover:text-cyan-400 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 border-2 border-cyan-500/30"
        >
          <Maximize2 className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute top-4 left-4 z-20 px-5 py-3 rounded-2xl glass-effect-light border-2 border-violet-500/30 shadow-lg">
        <div className="text-sm font-bold text-violet-300">Zoom: {(zoom * 100).toFixed(0)}%</div>
      </div>

      <div
        ref={mapRef}
        className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="relative w-full h-full transition-transform duration-100"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
            <div className="absolute inset-0 opacity-20">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px',
                }}
              ></div>
            </div>
          </div>

          {filteredMarkers.map((marker) => {
            const color = getMarkerColor(marker.type);
            const icon = getMarkerIcon(marker.type);
            const isHovered = hoveredMarker === marker.id;

            return (
              <div
                key={marker.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                style={{
                  left: `${marker.x}%`,
                  top: `${marker.y}%`,
                  zIndex: isHovered ? 100 : 10,
                }}
                onMouseEnter={() => setHoveredMarker(marker.id)}
                onMouseLeave={() => setHoveredMarker(null)}
              >
                <div
                  className={`relative transition-all duration-300 ${
                    isHovered ? 'scale-150' : 'scale-100'
                  }`}
                >
                  <div
                    className="absolute inset-0 rounded-full blur-xl"
                    style={{
                      backgroundColor: color,
                      opacity: isHovered ? 0.8 : 0.4,
                      animation: 'glow-pulse 2s ease-in-out infinite',
                    }}
                  ></div>

                  <div
                    className="relative w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-2xl border-[3px] transition-all duration-300"
                    style={{
                      backgroundColor: `${color}40`,
                      borderColor: color,
                      boxShadow: `0 0 30px ${color}80, 0 0 60px ${color}40, inset 0 0 20px ${color}30`,
                    }}
                  >
                    {icon}
                  </div>

                  {isHovered && (
                    <div className="absolute left-1/2 top-full mt-3 transform -translate-x-1/2 whitespace-nowrap pointer-events-none">
                      <div
                        className="px-6 py-3 rounded-2xl text-sm font-bold text-white shadow-2xl border-[3px] animate-fade-in glass-effect-light"
                        style={{
                          borderColor: color,
                          boxShadow: `0 0 30px ${color}60, inset 0 0 20px ${color}20`,
                        }}
                      >
                        {marker.label}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredMarkers.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-6xl mb-4 opacity-50">🗺️</div>
            <div className="text-xl font-semibold text-slate-400">No markers to display</div>
            <div className="text-sm text-slate-500 mt-2">
              Select filters to see {mapType === 'resource' ? 'resources' : 'spawns'} on the map
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
