import React, {memo} from 'react';
import styled from 'styled-components';
import deathIcon from '../../../assets/icons/icon-death.png';
import {$WHITE} from '../../../styles/variables.styles';
import {StyledNote} from './styles/note.styles';

const StyledTrapNote = styled(StyledNote)`
  background-color: ${$WHITE};
`;

const TrapNote = () => (
  <StyledTrapNote>
    <img
      src={deathIcon}
      alt="점수가 깎이는 아이콘"
    />
  </StyledTrapNote>
);

export default memo(TrapNote);
