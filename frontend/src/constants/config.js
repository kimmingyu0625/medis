export const API_BASE_URL = __DEV__
  ? 'http://10.0.2.2:8080/api'  // Android 에뮬레이터
  : 'https://your-production-url.com/api';

export const CARE_TYPES = {
  DAILY: '일상 돌봄',
  MEDICAL: '의료 보조',
  COMPANION: '말벗/동행',
};

export const REQUEST_STATUS = {
  PENDING: '대기중',
  ACCEPTED: '수락됨',
  REJECTED: '거절됨',
  COMPLETED: '완료',
  CANCELLED: '취소됨',
};

export const DAYS_OF_WEEK = {
  DAILY: '매일',
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일',
};
