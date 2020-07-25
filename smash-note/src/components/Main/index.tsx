import React, {useState, useEffect} from 'react';
import styled, {keyframes} from 'styled-components';
import {$MAIN_BACKGROUND, $WHITE} from '../../styles/variables.styles';
import {centerMixin, horizontalCenterMixin} from '../../styles/mixins.styles';
import {SECOND} from '../../constants/times';
import {RouteComponentProps} from 'react-router-dom';

const testAnimation = keyframes`
  0% {
    opacity: 0;
    letter-spacing: 0;
  }

  70% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    letter-spacing: 3px;
  }
`;

const StyledMain = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    font-size: 60px;
    color: ${$MAIN_BACKGROUND};
    opacity: 0;
    animation: ${testAnimation} .8s 1.75s forwards;
  }
`;

const loadingAnimation = keyframes`
  from {
    width: 0;
  }

  to {
    width: 200px;
  }
`;

const LoadingBar = styled.div`
  ${horizontalCenterMixin()};
  margin-top: 100px;
  height: 14px;
  background-color: ${$MAIN_BACKGROUND};
  animation: ${loadingAnimation} .5s 1s forwards;

  &:before, &:after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: ${$WHITE};
    transform: rotate(-70deg);
  }

  &:before {
    top: -5px;
    left: -13px;
  }

  &:after {
    top: -1px;
    right: -5px;
  }
`;

const expandingAnimation = keyframes`
  from {
    width: 0;
    height: 0;
  }

  to {
    width: 300vw;
    height: 300vw;
  }
`;

const ExpandingSpace = styled.div`
  border-radius: 50%;
  background-color: ${$MAIN_BACKGROUND};
  ${centerMixin()};
  animation: ${expandingAnimation} .5s linear forwards;
`;

interface Props extends RouteComponentProps {
}

const Main: React.FC<Props> = ({history}) => {
  const [isStarted, setIsStarted] = useState(false);

  const onClickStartBtn = () => {
    setIsStarted(true);
  };

  useEffect(() => {
    if (isStarted) {
      setTimeout(() => {
        history.replace('/start');
      }, 0.6 * SECOND);
    }
  }, [isStarted]);

  return (
    <StyledMain>
      <button onClick={onClickStartBtn}>
        START
      </button>
      <LoadingBar/>
      {isStarted && (
        <ExpandingSpace/>
      )}
    </StyledMain>
  );
}

export default Main;
