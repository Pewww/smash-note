import React, {memo} from 'react';
import styled from 'styled-components';
import okIcon from '../../assets/icons/icon-ok.png';
import {$MAIN_BACKGROUND, $WHITE} from '../../styles/variables.styles';

const StyledNote = styled.button`
  padding: 8px 51px;
  margin-top: 2px;
  background-color: ${$MAIN_BACKGROUND};
  vertical-align: middle;
  border: 1px solid ${$WHITE};

  img {
    width: 30px;
  }
`;

const Note = () => {
  return (
    <StyledNote>
      <img
        src={okIcon}
        alt="점수 증가 아이콘"
      />
    </StyledNote>
  );
};

export default memo(Note);
