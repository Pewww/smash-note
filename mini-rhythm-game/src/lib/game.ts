import {DEFAULT_NOTE_COUNT, DEFAULT_NOTE_INFO} from '../constants/game';

export const createStage = () =>
  Array.from(new Array(DEFAULT_NOTE_COUNT), () => {
    const note = [
      {
        ...DEFAULT_NOTE_INFO,
        direction: 'left'
      },
      {
        ...DEFAULT_NOTE_INFO,
        direction: 'right'
      }
    ];
    const pressableIndex = Math.floor(Math.random() * 2);

    note[pressableIndex] = {
      ...note[pressableIndex],
      pressable: true
    };

    return note;
  });
