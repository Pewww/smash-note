import React, {useEffect, useState, useMemo, useRef} from 'react';
import styled from 'styled-components';
import {INoteInfo, TGameStatus} from '../../@types/game';
import {createStage} from '../../lib/game';
import ScoreNote from './Note/Score';
import TrapNote from './Note/Trap';
import TimeNote from './Note/Time';
import FeverNote from './Note/Fever';
import Score from './Game/Score';
import isEmpty from 'lodash.isempty';
import Direction from './Direction';
import {
  MAX_NOTE_SHOW_COUNT,
  DECREASE_TIME_DEGREE,
  DEFAULT_TIME_LIMIT,
  SCORE_DEGREE,
  PLUS_TIME_SCORE,
  INCREASE_TIME_DEGREE
} from '../../constants/game';
import Time from './Game/Time';
import {SECOND} from '../../constants/times';
import {Dig} from '../../@types/helper';

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

const compByStatus = (status: Dig<INoteInfo, 'status'>, key: string) => {
  const COMP_BY_STATUS = {
    normal: <ScoreNote key={key}/>,
    fever: <FeverNote key={key}/>,
    time: <TimeNote key={key}/>
  };

  return COMP_BY_STATUS[status];
};

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
      status
    } = lastNode[direction];

    if (gameStatus === 'over') {
      return null;
    }

    if (pressable) {
      switch(status) {
        case 'time': {
          gameStatus === null && setGameStatus('start');
          setLeftTime(curr => curr + INCREASE_TIME_DEGREE);
          break;
        }
        case 'fever': {
          // + 일정 시간 동안 시간이 감소되지 않음
          setScore(curr => curr += SCORE_DEGREE.fever);
          break;
        }
        case 'normal': {
          gameStatus === null && setGameStatus('start');
          setScore(curr => curr += SCORE_DEGREE.normal);
          break;
        }
      }

      setStage(curr => curr.slice(0, lastIndex));
    } else {
      gameStatus === 'start' && setLeftTime(curr =>
        curr - DECREASE_TIME_DEGREE
      );
    }
  };

  useEffect(() => {
    setStage(createStage() as INoteInfo[][]);

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
      ]) as INoteInfo[][]);
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
                status,
                pressable
              }) => {
                const key = `${index}-${pressable}`;

                return (
                  pressable ? (
                    compByStatus(status, key)
                  ) : (
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
