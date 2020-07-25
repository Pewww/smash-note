import {DEFAULT_NOTE_COUNT, DEFAULT_NOTE_INFO} from '../constants/game';
import {getRandomNumber} from './random';

export const createStage = () =>
  Array.from(new Array(DEFAULT_NOTE_COUNT), () => {
    const note = [DEFAULT_NOTE_INFO, DEFAULT_NOTE_INFO];
    const pressableIndex = getRandomNumber(2);
    const isTimeNote = getRandomNumber(25, 1) === 10; // 4% 확률

    note[pressableIndex] = {
      ...note[pressableIndex],
      pressable: true
    };

    if (isTimeNote) {
      note[pressableIndex] = {
        ...note[pressableIndex],
        status: 'time'
      };
    }

    return note;
  });
