import React, {useEffect, useState, useMemo, useRef} from 'react';
import styled from 'styled-components';
import {INoteInfo, TGameStatus, TNoteStatus} from '../../@types/game';
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
  STAGE_LENGTH_TO_FETCH_MORE_STAGE,
  INCREASE_TIME_DEGREE,
  GAUGE_FOR_FEVER_TIME,
  COMBO_TO_INCREASE_GAUGE,
  INCREASE_GAUGE_DEGREE
} from '../../constants/game';
import Time from './Game/Time';
import Combo from './Game/Combo';
import {SECOND} from '../../constants/times';
import Gauge from './Game/Gauge';
import usePrevious from '../../hooks/usePrevious';

const StyledStage = styled.div<{hasCombo: boolean;}>`
  padding-top: 140px;

  .notes-wrapper {
    text-align: center;

    /* @TODO: last-child로 수정하기 */
    &:nth-child(${({hasCombo}) => hasCombo
      ? 10
      : 9
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

      @media all and (max-height: 710px) {
        img {
          width: 52px;
        }
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

const compByStatus = (status: TNoteStatus, key: string) => {
  const COMP_BY_STATUS = {
    normal: <ScoreNote key={key}/>,
    fever: <FeverNote key={key}/>,
    time: <TimeNote key={key}/>
  };

  return COMP_BY_STATUS[status];
};

const Stage = () => {
  // State
  const [stage, setStage] = useState<INoteInfo[][]>([]);
  const [gameStatus, setGameStatus] = useState<TGameStatus>(null);
  const [noteStatus, setNoteStatus] = useState<TNoteStatus>(null);
  const [score, setScore] = useState(0);
  const [leftTime, setLeftTime] = useState(DEFAULT_TIME_LIMIT);
  const [isFeverTime, setIsFeverTime] = useState(false);
  const [combo, setCombo] = useState(0);
  const [gauge, setGauge] = useState(0);

  const previousStage = usePrevious(stage) || [];

  const intervalRef: React.MutableRefObject<number> = useRef(null);

  const stageLeng = useMemo(() => stage.length, [stage]);

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
          setLeftTime(curr => curr + INCREASE_TIME_DEGREE);
          break;
        }
        case 'fever': {
          setScore(curr => curr += SCORE_DEGREE.fever);
          break;
        }
        case 'normal': {
          setScore(curr => curr += SCORE_DEGREE.normal);
          break;
        }
      }

      setNoteStatus(status);
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
    if (gameStatus === null && (noteStatus === 'normal' || noteStatus === 'time')) {
      setGameStatus('start');
    }
  }, [noteStatus, gameStatus]);

  useEffect(() => {
    if (
      noteStatus === 'normal'
      &&
      combo > 0 && combo % COMBO_TO_INCREASE_GAUGE === 0
    ) {
      setGauge(curr => curr + INCREASE_GAUGE_DEGREE);
    }
  }, [noteStatus, combo]);

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
    if (isFeverTime) {
      setStage(curr => ([
        ...curr,
        ...createStage(true)
      ]) as INoteInfo[][]);
    }
  }, [isFeverTime]);

  useEffect(() => {
    if (stageLeng > 0 && stageLeng < STAGE_LENGTH_TO_FETCH_MORE_STAGE) {
      setStage(curr => ([
        ...createStage(),
        ...curr
      ]) as INoteInfo[][]);
    }
  }, [stage]);

  useEffect(() => {
    // previousStage[lastIndex][0 | 1]의 status가 'fever'이고,
    // previousStage[lastIndex - 1][0 | 1]의 status가 'fever'가 아니면 게이지 초기화

    if (!isEmpty(previousStage)) {
      const lastIndex = previousStage.length - 1;

      if (
        previousStage[lastIndex][0].status === 'fever'
        &&
        previousStage[lastIndex - 1][0].status !== 'fever'
      ) {
        setIsFeverTime(false);
        setGauge(0);
      }
    }
  }, [previousStage]);

  useEffect(() => {
    if (gauge > 0 && gauge % GAUGE_FOR_FEVER_TIME === 0) {
      setIsFeverTime(true);
    }
  }, [gauge]);

  return (
    <StyledStage hasCombo={combo > 0}>
      {!isEmpty(stage) && (
        <>
          <Score score={score}/>
          <Combo combo={combo}/>
          <Gauge gauge={gauge}/>
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
