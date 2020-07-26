export type TNoteStatus = 'normal' | 'fever' | 'time';

export interface INoteInfo {
  id: string;
  pressable: boolean;
  status: TNoteStatus;
}

export type TGameStatus = null | 'start' | 'over';
