import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {INoteInfo} from '../../@types/game';
import {createStage} from '../../lib/game';
import Note from './Note';
import Trap from './Trap';
import Score from './Score';
import isEmpty from 'lodash.isempty';

const StyledStage = styled.div`
  padding-top: 100px;

  div {
    text-align: center;

    button {
      &:first-child {
        margin-right: 5px;
      }

      &:last-child {
        margin-left: 5px;
      }
    }
  }
`;

const MAX_SHOW_LENGTH = 10;

const Stage = () => {
  const [stage, setStage] = useState<INoteInfo[][] | null>(null);

  useEffect(() => {
    setStage(createStage() as INoteInfo[][]);
  }, []);

  console.dir(stage);

  return (
    <StyledStage>
      {!isEmpty(stage) ? (
        <>
          <Score score={10000}/>
          {(stage as any).slice(0, 8).map((s: INoteInfo[], index: number) => (
            <div key={`${index}`}>
              {s.map(({
                isFeverTime,
                pressable,
                direction
              }, index) => (
                pressable ? (
                  <Note
                    key={`${index}-${pressable}`}
                  />
                ) : (
                  // 추후 이런저런 기능 추가할 때 다시 살펴보기
                  <Trap/>
                )
              ))}
            </div>
          ))}
        </>
      ) : (
        <span style={{color: 'white'}}>LOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADINGLOADING</span>
      )}
    </StyledStage>
  );
};

export default Stage;
