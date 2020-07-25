import React, {useEffect, useState, useMemo, useRef} from 'react';
import styled from 'styled-components';
import {INoteInfo, TGameStatus} from '../../@types/game';
import {createStage} from '../../lib/game';
import ScoreNote from './Note/Score';
import TrapNote from './Note/Trap';
import Score from './Game/Score';
import isEmpty from 'lodash.isempty';
import Direction from './Direction';
import {
  MAX_NOTE_SHOW_COUNT,
  DECREASE_TIME_DEGREE,
  DEFAULT_TIME_LIMIT,
  SCORE_DEGREE,
  PLUS_TIME_SCORE
} from '../../constants/game';
import Time from './Game/Time';
import {SECOND} from '../../constants/times';

const StyledStage = styled.div`
  padding-top: 120px;

  .notes-wrapper {
    text-align: center;

    &:nth-child(8) button {
      margin: -45px 0 0 0;

      &:first-child {
        margin-right: 30px;
      }

      &:last-child {
        margin-left: 30px;
      }

      img {
        width: 58px;
      }
    }

    button {
      &:first-child {
        margin-right: 80px;
      }

      &:last-child {
        margin-left: 80px;
      }
    }
  }
`;

const Stage = () => {
  const [stage, setStage] = useState<INoteInfo[][]>(null);
  const [gameStatus, setGameStatus] = useState<TGameStatus>(null);
  const [score, setScore] = useState(0);
  const [leftTime, setLeftTime] = useState(DEFAULT_TIME_LIMIT);

  const intervalRef: React.MutableRefObject<number> = useRef(null);

  const stageLeng = useMemo(() => stage?.length, [stage]);

  const onClickDirectionKey = (direction: 0 | 1) => {
    const lastIndex = stageLeng - 1;
    const lastNode = stage[lastIndex];
    const {
      pressable,
      isFeverTime // status로 비교해보자 normal, fever, time?
    } = lastNode[direction];

    if (gameStatus === 'over') {
      return null;
    }

    if (pressable) {
      if (isFeverTime) {
        // Do something
      }

      gameStatus === null && setGameStatus('start');
      setStage(curr => curr.slice(0, lastIndex));
      setScore(curr => curr += SCORE_DEGREE.normal);
    } else {
      gameStatus === 'start' && setLeftTime(curr =>
        curr - DECREASE_TIME_DEGREE
      );
    }
  };

  useEffect(() => {
    setStage(createStage());

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (gameStatus === 'start') {
      intervalRef.current = setInterval(() => {
        setLeftTime(curr => curr - 1);
      }, 1 * SECOND);
    }
  }, [gameStatus]);

  useEffect(() => {
    if (leftTime <= 0) {
      clearInterval(intervalRef.current);
      setGameStatus('over');
    }
  }, [leftTime]);

  useEffect(() => {
    if (score !== 0 && score % PLUS_TIME_SCORE === 0) {
      setStage(curr => ([
        ...createStage(),
        ...curr
      ]));
    }
  }, [score]);

  return (
    <StyledStage>
      {!isEmpty(stage) && (
        <>
          <Score score={score}/>
          {/* <div style={{color: 'white'}}>피버게이지: {}</div> */}
          <Time time={leftTime <= 0 ? 0 : leftTime}/>
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
