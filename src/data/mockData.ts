import { ResourceType, SpawnType, MapMarker } from '../types';

export const resourceTypes: ResourceType[] = [
  { id: 'metal', name: 'Metal', color: '#94a3b8', icon: '⛏️' },
  { id: 'crystal', name: 'Crystal', color: '#06b6d4', icon: '💎' },
  { id: 'obsidian', name: 'Obsidian', color: '#8b5cf6', icon: '🪨' },
  { id: 'oil', name: 'Oil', color: '#a855f7', icon: '🛢️' },
  { id: 'polymer', name: 'Polymer', color: '#f59e0b', icon: '🧪' },
  { id: 'pearls', name: 'Silica Pearls', color: '#e0f2fe', icon: '🦪' },
];

export const spawnTypes: SpawnType[] = [
  { id: 'rex', name: 'T-Rex', color: '#ef4444', icon: '🦖' },
  { id: 'raptor', name: 'Raptor', color: '#f59e0b', icon: '🦎' },
  { id: 'argentavis', name: 'Argentavis', color: '#8b5cf6', icon: '🦅' },
  { id: 'ankylo', name: 'Ankylosaurus', color: '#10b981', icon: '🦕' },
  { id: 'spino', name: 'Spinosaurus', color: '#06b6d4', icon: '🐊' },
  { id: 'giga', name: 'Giganotosaurus', color: '#dc2626', icon: '🦖' },
];

export const mockResourceMarkers: MapMarker[] = [
  { id: '1', type: 'metal', x: 25, y: 30, label: 'Rich Metal Vein' },
  { id: '2', type: 'metal', x: 45, y: 55, label: 'Metal Node' },
  { id: '3', type: 'crystal', x: 60, y: 25, label: 'Crystal Formation' },
  { id: '4', type: 'crystal', x: 70, y: 70, label: 'Crystal Cave' },
  { id: '5', type: 'obsidian', x: 35, y: 65, label: 'Obsidian Deposit' },
  { id: '6', type: 'oil', x: 80, y: 40, label: 'Oil Vein' },
  { id: '7', type: 'polymer', x: 20, y: 75, label: 'Polymer Node' },
  { id: '8', type: 'pearls', x: 55, y: 45, label: 'Pearl Bed' },
];

export const mockSpawnMarkers: MapMarker[] = [
  { id: 's1', type: 'rex', x: 30, y: 40, label: 'T-Rex Territory' },
  { id: 's2', type: 'raptor', x: 50, y: 60, label: 'Raptor Pack' },
  { id: 's3', type: 'argentavis', x: 65, y: 30, label: 'Argentavis Nest' },
  { id: 's4', type: 'ankylo', x: 40, y: 70, label: 'Ankylo Spawn' },
  { id: 's5', type: 'spino', x: 75, y: 50, label: 'Spinosaurus Zone' },
  { id: 's6', type: 'giga', x: 85, y: 80, label: 'Giga Spawn Point' },
  { id: 's7', type: 'raptor', x: 20, y: 25, label: 'Raptor Area' },
];
