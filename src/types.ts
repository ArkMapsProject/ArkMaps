export type GameMode = 'ascended' | 'evolved';
export type MapType = 'spawn' | 'resource';

export interface MapMarker {
  id: string;
  type: string;
  x: number;
  y: number;
  label: string;
}

export interface ResourceType {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface SpawnType {
  id: string;
  name: string;
  color: string;
  icon: string;
}
