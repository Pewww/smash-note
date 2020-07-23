import React from 'react';
import styled from 'styled-components';
import {$MAIN_BACKGROUND} from '../../styles/variables.styles';
import Stage from './Stage';
import { KEYCODE_TO_STRING } from '../../constants/keyCode';

const Wrapper = styled.div`
  height: 100%;
  background-color: ${$MAIN_BACKGROUND};
`;

const Start = () => {
  const onHandleKeyDown = ({keyCode}: React.KeyboardEvent) => {
    if (!KEYCODE_TO_STRING[keyCode]) {
      return null;
    }

    alert(1);
  };

  return (
    <Wrapper
      tabIndex={0}
      onKeyDown={onHandleKeyDown}
    >
      <Stage/>
    </Wrapper>
  );
}

export default Start;
