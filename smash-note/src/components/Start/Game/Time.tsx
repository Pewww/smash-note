import React from 'react';
import styled from 'styled-components';
import {$WHITE} from '../../../styles/variables.styles';

const StyledTime = styled.div`
  position: absolute;
  top: 40px;
  right: 20px;

  span {
    color: ${$WHITE};
    font-size: 20px;
  }
`;

interface Props {
  time: number;
}

const Time: React.FC<Props> = ({time}) => {
  return (
    <StyledTime>
      <span>Time: {time}</span>
    </StyledTime>
  );
};

export default Time;
