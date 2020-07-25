import React from 'react';
import styled from 'styled-components';
import deathIcon from '../../../assets/icons/icon-death.png';
import {$WHITE} from '../../../styles/variables.styles';

const StyledTrapNote = styled.button`
  padding: 8px 8px 5px 8px;
  background-color: ${$WHITE};
  border-radius: 10px;

  img {
    width: 40px;
  }
`;

const TrapNote = () => (
  <StyledTrapNote>
    <img
      src={deathIcon}
      alt="점수가 깎이는 아이콘"
    />
  </StyledTrapNote>
);

export default TrapNote;
