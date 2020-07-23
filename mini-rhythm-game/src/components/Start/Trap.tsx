import React from 'react';
import styled from 'styled-components';
import deathIcon from '../../assets/icons/icon-death.png';
import {$MAIN_BACKGROUND} from '../../styles/variables.styles';

const StyledTrap = styled.button`
  padding: 8px 51px;
  margin-top: 2px;
  background-color: ${$MAIN_BACKGROUND};
  vertical-align: middle;

  img {
    position: relative;
    padding-top: 1px;
    top: 1px;
    width: 30px;
  }
`;

const Trap = () => (
  <StyledTrap>
    <img
      src={deathIcon}
      alt="점수가 깎이는 아이콘"
    />
  </StyledTrap>
);

export default Trap;
