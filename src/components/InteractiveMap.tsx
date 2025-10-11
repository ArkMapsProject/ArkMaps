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
    <div className="relative w-full h-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl">
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          onClick={() => setZoom(Math.min(zoom + 0.2, 3))}
          className="p-3 rounded-xl bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-300 shadow-lg hover:scale-110"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
          className="p-3 rounded-xl bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-300 shadow-lg hover:scale-110"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={resetView}
          className="p-3 rounded-xl bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-300 shadow-lg hover:scale-110"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute top-4 left-4 z-20 px-4 py-2 rounded-xl bg-slate-800/90 backdrop-blur-sm border border-slate-700/50">
        <div className="text-xs text-slate-400">Zoom: {(zoom * 100).toFixed(0)}%</div>
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
                    isHovered ? 'scale-125' : 'scale-100'
                  }`}
                >
                  <div
                    className="absolute inset-0 rounded-full blur-lg animate-pulse"
                    style={{
                      backgroundColor: color,
                      opacity: isHovered ? 0.6 : 0.3,
                    }}
                  ></div>

                  <div
                    className="relative w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg border-2 cursor-pointer"
                    style={{
                      backgroundColor: `${color}30`,
                      borderColor: color,
                      boxShadow: `0 0 20px ${color}60`,
                    }}
                  >
                    {icon}
                  </div>

                  {isHovered && (
                    <div className="absolute left-1/2 top-full mt-2 transform -translate-x-1/2 whitespace-nowrap pointer-events-none">
                      <div
                        className="px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-xl border animate-fade-in"
                        style={{
                          backgroundColor: `${color}20`,
                          borderColor: color,
                          backdropFilter: 'blur(10px)',
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
