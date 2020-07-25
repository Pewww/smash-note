import React, {memo} from 'react';
import styled from 'styled-components';
import okIcon from '../../../assets/icons/icon-ok.png';
import {$MAIN_BACKGROUND, $WHITE, $SCORE_NOTE_BACKGROUND} from '../../../styles/variables.styles';

const StyledScoreNote = styled.button`
  padding: 8px 8px 5px 8px;
  background-color: ${$SCORE_NOTE_BACKGROUND};
  border-radius: 10px;

  img {
    width: 40px;
  }
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
