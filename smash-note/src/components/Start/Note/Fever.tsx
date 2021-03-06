import React, {memo} from 'react';
import styled, {keyframes} from 'styled-components';
import feverIcon from '../../../assets/icons/icon-fever.png';
import {StyledNote} from './styles/note.styles';
import {$FEVER_NOTE_BACKGROUND} from '../../../styles/variables.styles';

const shakingAnimation = keyframes`
  20% {
    transform: rotate(-5deg);
  }

  40% {
    transform: rotate(5deg);
  }

  60% {
    transform: rotate(-5deg);
  }

  80% {
    transform: rotate(5deg);
  }

  100% {
    transform: rotate(0);
  }
`;

const StyledFeverNote = styled(StyledNote)`
  background-color: ${$FEVER_NOTE_BACKGROUND}; 
  animation: ${shakingAnimation} .35s linear forwards infinite;
`;

const FeverNote = () => {
  return (
    <StyledFeverNote>
      <img
        src={feverIcon}
        alt="피버 아이콘"
      />
    </StyledFeverNote>
  );
};

export default memo(FeverNote);
