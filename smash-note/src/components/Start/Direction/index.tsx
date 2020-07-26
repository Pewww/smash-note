import React, {memo} from 'react';
import styled from 'styled-components';
import leftArrow from '../../../assets/icons/icon-left.png';
import rightArrow from '../../../assets/icons/icon-right.png';

const StyledDirection = styled.div`
  text-align: center;

  img {
    width: 90px; 
    padding: 50px;

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }

  @media all and (max-height: 720px) {
    img {
      width: 70px;
      padding: 35px;
    }
  }

  @media all and (max-height: 640px) {
    img {
      width: 60px;
      padding: 25px;
    }
  }
`;

interface Props {
  onLeftClick: (key: 0) => void;
  onRightClick: (key: 1) => void;
}

const Direction: React.FC<Props> = ({
  onLeftClick,
  onRightClick
}) => (
  <StyledDirection>
    <img
      src={leftArrow}
      alt="왼쪽 클릭"
      onClick={() => onLeftClick(0)}
    />
    <img
      src={rightArrow}
      alt="오른쪽 클릭"
      onClick={() => onRightClick(1)}
    />
  </StyledDirection>
);

export default memo(Direction);
