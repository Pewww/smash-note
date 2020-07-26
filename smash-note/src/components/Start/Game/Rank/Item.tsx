import React from 'react';
import styled from 'styled-components';
import {$WHITE, $DARK_TEXT, $LIGHT_GRAY} from '../../../../styles/variables.styles';
import {IRank} from '../../../../@types/game';
import firstTrophyIcon from '../../../../assets/icons/icon-first-trophy.png';
import secondTrophyIcon from '../../../../assets/icons/icon-second-trophy.png';
import thirdTrophyIcon from '../../../../assets/icons/icon-third-trophy.png';
import numberWithCommas from '../../../../lib/numberWithCommas';
import {formatDate} from '../../../../lib/date';

const StyledRankItem = styled.li`
  position: relative;
  width: 100%;
  height: 45px;
  list-style: none;
  margin: 0 auto 10px auto;

  img, span {
    vertical-align: middle;
  }

  img {
    width: 42px;
    padding-left: 36px;
  }

  .rank {
    font-size: 30px;
    color: ${$WHITE};
  }

  .score {
    top: -6px;
    font-size: 36px;
    color: ${$DARK_TEXT};
    position: absolute;
    left: 126px;

    .point {
      font-size: 14px;
      color: ${$LIGHT_GRAY};
      position: relative;
      top: 2px;
      left: 3px;
    }
  }

  .date {
    position: absolute;
    top: 9px;
    right: 34px;
    color: ${$LIGHT_GRAY};
    font-size: 16px;
  }

  &:nth-child(n+4) {
    .rank {
      padding-left: 48px;
    }

    .point, .date, .score {
      color: ${$WHITE};
    }

    .score {
      top: -5px;
    }
  }
`;

const SPECIAL_ICON_BY_RANK = {
  1: firstTrophyIcon,
  2: secondTrophyIcon,
  3: thirdTrophyIcon
};

interface Props extends IRank {
  rank: number;
}

const RankItem: React.FC<Props> = ({
  rank,
  score,
  date
}) => (
  <StyledRankItem>
    {!!SPECIAL_ICON_BY_RANK[rank] ? (
      <img
        src={SPECIAL_ICON_BY_RANK[rank]}
        alt={`${rank}등`}
      />
    ) : (
      <span className="rank">{rank}</span>
    )}
    <span className="score">
      {numberWithCommas(score)}
      <span className="point">point</span>
    </span>
    <span className="date">{formatDate(date, 'MM.DD')}</span>
  </StyledRankItem>
);

export default RankItem;
