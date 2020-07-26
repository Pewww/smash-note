// @TODO: 정리하기

export const DEFAULT_TIME_LIMIT = 30; // 시간 제한
export const DEFAULT_NOTE_COUNT = 50; // 노트 기본 수

export const MAX_NOTE_SHOW_COUNT = 6; // 한 번에 보여지는 노트 수
export const INCREASE_TIME_DEGREE = 10; // 시간 노트를 클릭할 시 증가하는 정도
export const DECREASE_TIME_DEGREE = 5; // 시간 감소 정도
export const INCREASE_GAUGE_DEGREE = 10; // 게이지가 한 번에 증가하는 정도
export const COMBO_TO_INCREASE_GAUGE = 10; // 게이지를 증가시킬 콤보의 정도
export const STAGE_LENGTH_TO_FETCH_MORE_STAGE = 10; // 새로운 노트가 추가 될 스테이지 길이
export const GAUGE_FOR_FEVER_TIME = 60; // 피버 타임에 도달하기 위한 게이지 양
export const SCORE_DEGREE = { // 점수
  normal: 100,
  fever: 300
};

export const DEFAULT_NOTE_INFO = {
  pressable: false,
  status: 'normal'
};

export const SAVE_RANK_MAX_LENGTH = 5; // 최대로 보여주는 순위
