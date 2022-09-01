import type { Map, Templatable } from 'react-native-kakao-sdk-common';

/**
 * 채널 관계
 * - ADDED: 추가된 상태
 * - NONE: 관계없음
 * - BLOCKED: 차단 상태
 * */
export type Relation = 'ADDED' | 'NONE' | 'BLOCKED'

/**
 * 정렬
 * - asc: 오름차순
 * - desc: 내림차순
 * */
export type Order = 'asc' | 'desc'

/**
 * 친구 정렬
 * - nickname: 닉네임 정렬
 * - age: 나이 정렬
 * - favorite: 즐겨찾기 순 정렬
 * */
export type FriendOrder = 'nickname' | 'age' | 'favorite'

/** 채널추가 URL 파라메터 */
export interface AddChannelParam {
  /** 채널ID */
  channelPublicId: string;
}

/** 채널채팅 URL 파라메터 */
export interface ChannelChatParam {
  /** 채널ID */
  channelPublicId: string;
}

/** 채널 관계 조회 파라메터 */
export interface ChannelParam {
  publicIds?: string[] | null;
}

/** 채널정보 */
export interface Channels {
  /** 회원번호 */
  userId?: number | null;
  /** 채널목록 */
  channels?: Channel[];
}

/** 채널 */
export interface Channel {
  /** 채널UUID */
  channelUuid: string;
  /** 채널ID */
  channelPublicId: string;
  /** 채널관계 */
  relation: Relation;
  /** 마지막 상태 변경 시각 */
  updatedAt?: Date | null;
}

/** 친구 목록 조회 파라메터 */
export interface FriendsParam {
  offset?: number | null;
  limit?: number | null;
  order?: Order | null;
  friendOrder?: FriendOrder | null;
}

/** 친구목록 */
export interface Friends {
  /** 친구목록 */
  elements?: Friend[] | null;
  /** 전체 수 */
  totalCount: number;
  /** 즐겨찾기 수 */
  favoriteCount?: number | null;
  /** 친구 목록 이전 페이지 URL */
  beforeUrl?: string | null;
  /** 친구 목록 다음 페이지 URL */
  afterUrl?: string | null;
}

/** 친구 */
export interface Friend {
  /** 회원번호 */
  id?: number | null;
  /** UUID */
  uuid: string;
  /** 프로필 닉네임 */
  profileNickname?: string | null;
  /** 프로필 썸네일 이미지 */
  profileThumbnailImage?: string | null;
  /** 즐겨찾기 여부 */
  favorite?: boolean | null;
  /** 메시지 수신 가능 여부 */
  allowedMsg?: boolean | null;
}

/** 카카오톡 프로필 */
export interface TalkProfile {
  /** 닉네임 */
  nickname?: string | null;
  /** 프로필 이미지 URL */
  profileImageUrl?: string | null;
  /** 썸네일 이미지 URL */
  thumbnailUrl?: string | null;
  /** 카카오톡 국가 코드 */
  countryISO?: string | null;
}

/** 나에게 커스텀 메시지 보내기 파라메터 */
export interface SendCustomMemoParam {
  /** 템플릿ID */
  templateId: number;
  /** 템플릿 사용자 파라메터 */
  templateArgs?: Map | null;
}

/** 나에게 기본 메시지 보내기 파라메터 */
export interface SendDefaultMemoParam {
  /** 템플릿 */
  templatable: Templatable;
}

/** 나에게 스크랩 메시지 보내기 파라메터 */
export interface SendScrapMemoParam {
  /** 스크랩 대상 주소 */
  requestUrl: string;
  /** 템플릿 ID */
  templateId?: number | null;
  /** 템플릿 사용자 파라메터 */
  templateArgs?: Map | null;
}

export interface SendCustomMessageParam {
  /** 템플릿 ID */
  templateId?: number | null;
  /** 템플릿 사용자 파라메터 */
  templateArgs?: Map | null;
  /** 수신자 UUID 목록 */
  receiverUuids: string[];
}

/** 메시지 전송 결과 */
export interface MessageSendResult {
  /** 성공한 UUID 목록 */
  successfulReceiverUuids?: string[] | null;
  /** 실패 내역 정보 */
  failureInfos?: MessageFailureInfo[] | null;
}

/** 실패 내역 정보 */
export interface MessageFailureInfo {
  /** 오류코드 */
  code: number;
  /** 매시지 */
  msg: string;
  /** 같은 오류코드의 UUID 목록 */
  receiverUuids: string[];
}

/** 기본 메시지 파라메터 */
export interface SendDefaultMessageParam {
  /** 템플릿 */
  templatable: Templatable;
  /** 수신자 UUID 목록 */
  receiverUuids: string[];
}

/** 스크랩 메시지 파라메터 */
export interface SendScrapMessageParam {
  /** 스크랩 대상 주소 */
  requestUrl: string;
  /** 템플릿 ID */
  templateId?: number | null;
  /** 템플릿 사용자 파라메터 */
  templateArgs?: Map | null;
  /** 수신자 UUID 목록 */
  receiverUuids: string[];
}
