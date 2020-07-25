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
  INCREASE_TIME_DEGREE,
  COMBO_FOR_FEVER_TIME
} from '../../constants/game';
import Time from './Game/Time';
import Combo from './Game/Combo';
import {SECOND} from '../../constants/times';
import {Dig} from '../../@types/helper';

const StyledStage = styled.div<{hasCombo: boolean;}>`
  padding-top: 120px;

  .notes-wrapper {
    text-align: center;

    /* @TODO: last-child로 수정하기 */
    &:nth-child(${({hasCombo}) => hasCombo
      ? 9
      : 8
    }) button {
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
  const [isFeverTime, setIsFeverTime] = useState(false);
  const [combo, setCombo] = useState(0);

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
      setCombo(curr => curr + 1);
    } else {
      if (gameStatus === 'start') {
        setLeftTime(curr => curr - DECREASE_TIME_DEGREE);
        combo !== 0 && setCombo(0);
      }
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
    if (score !== 0) {
      if (isFeverTime) {
        setStage(curr => ([
          ...curr,
          ...createStage(true)
        ]) as INoteInfo[][]);

        setIsFeverTime(false);
      } else {
        score % PLUS_TIME_SCORE === 0 && setStage(curr => ([
          ...createStage(),
          ...curr
        ]) as INoteInfo[][]);
      }
    }
  }, [score, isFeverTime]);

  useEffect(() => {
    // 임시 조건 설정
    if (combo > 0 && combo % COMBO_FOR_FEVER_TIME === 0) {
      setIsFeverTime(true);
    }
  }, [combo]);

  return (
    <StyledStage hasCombo={combo > 0}>
      {!isEmpty(stage) && (
        <>
          <Score score={score}/>
          <Combo combo={combo}/>
          <Time time={leftTime <= 0 ? 0 : leftTime}/>
          {stage.slice(stageLeng - MAX_NOTE_SHOW_COUNT, stageLeng).map((_stage, index) => (
            <div
              className="notes-wrapper"
              key={index}
            >
              {_stage.map(({
                id,
                status,
                pressable
              }) => (
                pressable ? (
                  compByStatus(status, id)
                ) : (
                  <TrapNote key={id}/>
                )
              ))}
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
