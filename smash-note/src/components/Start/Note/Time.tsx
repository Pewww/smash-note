import React, {memo} from 'react';
import styled from 'styled-components';
import timeIcon from '../../../assets/icons/icon-time.png';
import {$TIME_NOTE_BACKGROUND} from '../../../styles/variables.styles';
import {StyledNote} from './styles/note.styles';

const StyledTimeNote = styled(StyledNote)`
  background-color: ${$TIME_NOTE_BACKGROUND};
`;

const TimeNote = () => {
  return (
    <StyledTimeNote>
      <img
        src={timeIcon}
        alt="시간 증가 아이콘"
      />
    </StyledTimeNote>
  );
};

export default memo(TimeNote);
