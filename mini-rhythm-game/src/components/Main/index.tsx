import React, {useState, useEffect} from 'react';
import styled, {keyframes} from 'styled-components';
import {$MAIN_BACKGROUND} from '../../styles/variables.styles';
import {centerMixin} from '../../styles/mixins.styles';
import {SECOND} from '../../constants/times';
import {RouteComponentProps} from 'react-router-dom';

const StyledMain = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    font-size: 40px;
    color: ${$MAIN_BACKGROUND};
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
      }, 1 * SECOND);
    }
  }, [isStarted]);

  return (
    <StyledMain>
      <button onClick={onClickStartBtn}>
        START
      </button>
      {isStarted && (
        <ExpandingSpace/>
      )}
    </StyledMain>
  );
}

export default Main;
