import React from 'react';
import styled from 'styled-components';
import {$MAIN_BACKGROUND} from '../../styles/variables.styles';

const StyledFallback = styled.div`
  height: 100%;
  background-color: ${$MAIN_BACKGROUND};
`;

const Fallback = () => (
  <StyledFallback/>
);

export default Fallback;
