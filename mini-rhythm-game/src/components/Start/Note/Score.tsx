import React, {memo} from 'react';
import styled from 'styled-components';
import okIcon from '../../../assets/icons/icon-ok.png';
import {$SCORE_NOTE_BACKGROUND} from '../../../styles/variables.styles';
import {StyledNote} from './styles/note.styles';

const StyledScoreNote = styled(StyledNote)`
  background-color: ${$SCORE_NOTE_BACKGROUND};
`;

const ScoreNote = () => {
  return (
    <StyledScoreNote>
      <img
        src={okIcon}
        alt="점수 증가 아이콘"
      />
    </StyledScoreNote>
  );
};

export default memo(ScoreNote);
