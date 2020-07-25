import React, {useEffect, useState, useMemo} from 'react';
import styled from 'styled-components';
import {INoteInfo} from '../../@types/game';
import {createStage} from '../../lib/game';
import ScoreNote from './Note/Score';
import TrapNote from './Note/Trap';
import Score from './Score';
import isEmpty from 'lodash.isempty';
import Direction from './Direction';
import {
  MAX_NOTE_SHOW_COUNT,
  DECREASE_TIME_DEGREE,
  DEFAULT_TIME_LIMIT,
  SCORE_DEGREE
} from '../../constants/game';

const StyledStage = styled.div`
  padding-top: 100px;

  .notes-wrapper {
    text-align: center;

    &:nth-child(9) button {
      margin: -25px 0 0 0;

      &:first-child {
        margin-right: 10px;
      }

      &:last-child {
        margin-left: 10px;
      }

      img {
        width: 58px;
      }
    }

    button {
      &:first-child {
        margin-right: 50px;
      }

      &:last-child {
        margin-left: 50px;
      }
    }
  }
`;

const Stage = () => {
  const [stage, setStage] = useState<INoteInfo[][]>(null);
  const [score, setScore] = useState(0);
  const [leftTime, setLeftTime] = useState(DEFAULT_TIME_LIMIT);

  const stageLeng = useMemo(() => stage?.length, [stage]);

  const onClickDirectionKey = (direction: 0 | 1) => {
    const lastIndex = stageLeng - 1;
    const lastNode = stage[lastIndex];
    const {
      pressable,
      isFeverTime
    } = lastNode[direction];

    if (isFeverTime) {
      // do something
    }

    if (pressable) {
      setStage(curr => curr.slice(0, lastIndex));
      setScore(curr => curr += SCORE_DEGREE.normal);
    } else {
      setLeftTime(curr => curr - DECREASE_TIME_DEGREE);
    }
  };

  useEffect(() => {
    setStage(createStage() as INoteInfo[][]);
  }, []);

  useEffect(() => {
    if (leftTime <= 0) {
      // do something
    }
  }, [leftTime]);

  return (
    <StyledStage>
      {!isEmpty(stage) && (
        <>
          <Score score={score}/>
          <div style={{color: 'white'}}>피버게이지: {}</div>
          <div style={{color: 'white'}}>남은 시간: {leftTime}</div>
          {stage.slice(stageLeng - MAX_NOTE_SHOW_COUNT, stageLeng).map((_stage, index) => (
            <div
              className="notes-wrapper"
              key={index}
            >
              {_stage.map(({
                isFeverTime,
                pressable,
                // 추가 정보들
              }) => {
                const key = `${index}-${pressable}`;

                return (
                  pressable ? (
                    <ScoreNote key={key}/>
                  ) : (
                    // 추후 이런저런 기능 추가할 때 다시 살펴보기
                    <TrapNote key={`${index}-${pressable}`}/>
                  )
                );
              })}
            </div>
          ))}
          <Direction
            onLeftClick={onClickDirectionKey}
            onRightClick={onClickDirectionKey}
          />
        </>
      )}
    </StyledStage>
  );
};

export default Stage;
