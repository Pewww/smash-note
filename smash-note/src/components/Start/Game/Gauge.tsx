import React, {memo} from 'react';
import styled from 'styled-components';
import {GAUGE_FOR_FEVER_TIME} from '../../../constants/game';
import {$FEVER_NOTE_BACKGROUND, $FEVER_GAUGE_BOX_SHADOW, $WHITE} from '../../../styles/variables.styles';

const Wrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 20px;

  span {
    font-size: 20px;
    color: ${$WHITE};
  }
`;

const MAX_GAUGE_WIDTH = 110;

const StyledGauge = styled.div<Props>`
  width: ${({gauge}) => Math.floor(MAX_GAUGE_WIDTH * gauge)}px;
  height: 5px;
  margin-top: 4px;
  background-color: ${$FEVER_NOTE_BACKGROUND};
  border-radius: 10px;
  ${({gauge}) => gauge === 1 && `
    box-shadow: 0 0 10px 2px ${$FEVER_GAUGE_BOX_SHADOW};
  `};
  transition: .3s;
`;

interface Props {
  gauge: number;
}

const Gauge: React.FC<Props> = ({gauge}) => {
  const _gauge = gauge
    ? (gauge / GAUGE_FOR_FEVER_TIME)
    : 0;

  return (
    <Wrapper>
      <span>FEVER</span>
      <StyledGauge gauge={_gauge}/>
    </Wrapper>
  );
};

export default memo(Gauge);
