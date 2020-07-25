import React, {memo} from 'react';
import styled from 'styled-components';
import {$WHITE} from '../../styles/variables.styles';
import numberWithCommas from '../../lib/numberWithCommas';
import {horizontalCenterMixin} from '../../styles/mixins.styles';

const StyledScore = styled.div`
  top: 30px;
  ${horizontalCenterMixin()};
  text-align: center;

  span {
    color: ${$WHITE};

    span {
      line-height: 1.6;
    }
  }
`;

interface Props {
  score: number;
}

const Score: React.FC<Props> = ({score}) => (
  <StyledScore>
    <span>
      SCORE<br/>
      <span>{numberWithCommas(score)}</span>
    </span>
  </StyledScore>
);

export default memo(Score);
