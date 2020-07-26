import React, {useState, useEffect} from 'react';
import styled, {keyframes} from 'styled-components';
import {saveScoreToRank} from '../../../../lib/game';
import {IRank} from '../../../../@types/game';
import {horizontalCenterMixin} from '../../../../styles/mixins.styles';
import {$DARK_TEXT, $WHITE, $PURPLE} from '../../../../styles/variables.styles';
import restartIcon from '../../../../assets/icons/icon-restart.png';
import {useHistory} from 'react-router-dom';
import RankItem from './Item';

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(50, 50, 50, .5);
`;

const showingAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

const StyledRankPopup = styled.div`
  opacity: 0;
  top: 50%;
  ${horizontalCenterMixin()};
  width: 340px;
  height: 520px;
  background-color: ${$WHITE};
  border-radius: 20px;
  animation ${showingAnimation} .4s forwards;
  position: relative;

  h2 {
    color: ${$DARK_TEXT};
    font-size: 40px;
    letter-spacing: 2px;
    text-align: center;
    padding-top: 30px;
    margin: 0;
  }

  ul {
    position: relative;
    padding: 0;
    z-index: 2;
  }

  .purple-space {
    width: 100%;
    height: 50%;
    background-color: ${$PURPLE};
    position: absolute;
    bottom: 0;
    border-radius: 0 0 20px 20px;
  }
`;

const RestartBtn = styled.button`
  ${horizontalCenterMixin()};
  bottom: 40px;

  img {
    width: 64px;
  }
`;

interface Props {
  score: number;
}

const RankPopup: React.FC<Props> = ({score}) => {
  const history = useHistory();

  const [ranks, setRanks] = useState<IRank[]>([]);

  const restartGame = () => history.replace('/start');

  useEffect(() => {
    const ranks = saveScoreToRank(score);
    setRanks(ranks);
  }, []);

  return (
    <Wrapper>
      <StyledRankPopup>
        <h2>RANK</h2>
        <ul>
          {ranks.map(({score, date}, index) => (
            <RankItem
              key={date}
              score={score}
              date={date}
              rank={index + 1}
            />
          ))}
        </ul>
        <div className="purple-space"/>
        <RestartBtn onClick={restartGame}>
          <img
            src={restartIcon}
            alt="Restart"
          />
        </RestartBtn>
      </StyledRankPopup>
    </Wrapper>
  );
};

export default RankPopup;
