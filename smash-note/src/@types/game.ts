export interface INoteInfo {
  id: string;
  pressable: boolean;
  status: 'normal' | 'fever' | 'time';
}

export type TGameStatus = null | 'start' | 'over';
