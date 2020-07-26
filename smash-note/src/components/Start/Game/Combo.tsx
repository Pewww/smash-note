import React, {memo} from 'react';
import styled from 'styled-components';
import {$WHITE} from '../../../styles/variables.styles';
import numberWithCommas from '../../../lib/numberWithCommas';

const StyledCombo = styled.div`
  position: absolute;
  top: 85px;
  left: 20px;

  span {
    color: ${$WHITE};
    font-size: 20px;
  }
`;

interface Props {
  combo: number;
}

const Combo: React.FC<Props> = ({combo}) => {
  return combo > 0 && (
    <StyledCombo>
      <span>
        COMBO! &nbsp;
        + {numberWithCommas(combo)}
      </span>
    </StyledCombo>
  );
};

export default memo(Combo);
