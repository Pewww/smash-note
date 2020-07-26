import React from 'react';
import styled from 'styled-components';
import {$MAIN_BACKGROUND} from '../../styles/variables.styles';
import Stage from './Game/Stage';

const Wrapper = styled.div`
  height: 100%;
  background-color: ${$MAIN_BACKGROUND};
`;

const Start = () => (
  <Wrapper>
    <Stage/>
  </Wrapper>
);

export default Start;
