export interface INoteInfo {
  pressable: boolean;
  status: 'normal' | 'fever' | 'time';
}

export type TGameStatus = null | 'start' | 'over';
