import {DEFAULT_NOTE_COUNT, DEFAULT_NOTE_INFO} from '../constants/game';
import {getRandomNumber, getRandomId} from './random';

export const createStage = (isFeverTime?: boolean) =>
  Array.from(new Array(DEFAULT_NOTE_COUNT), () => {
    if (isFeverTime) {
      const note = [
        {
          id: getRandomId(),
          pressable: true,
          status: 'fever'
        },
        {
          id: getRandomId(),
          pressable: true,
          status: 'fever'
        }
      ];

      return note;
    } else {
      const note = [
        {
          id: getRandomId(),
          ...DEFAULT_NOTE_INFO
        },
        {
          id: getRandomId(),
          ...DEFAULT_NOTE_INFO
        }
      ];
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
    }
  });
