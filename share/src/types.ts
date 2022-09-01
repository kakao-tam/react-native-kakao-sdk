import type { Map, Templatable } from 'react-native-kakao-sdk-common';

/** 원격이미지 스크랩 파라미터 */
export interface ScrapImageParam {
  /** 원격 이미지 경로 URL */
  imageUrl: string;
  /**
   * https 사용여부<br/>
   * 응답 URL을 https로 받을지 여부 (기본값 true)
   * */
  secureResource?: boolean | null;
}

/** 커스텀 템플릿 공유하기 파라미터 */
export interface ShareCustomParam {
  /** 템플릿ID */
  templateId: number;
  /** 템플릿 사용자 파라메터 */
  templateArgs?: Map | null;
  /** 서버 콜백 파라미터 */
  serverCallbackArgs?: Map | null;
}

/** 기본 템플릿 공유하기 파라미터 */
export interface ShareDefaultParam {
  /** 템플릿 */
  templatable: Templatable;
  /** 서버 콜백 파라미터 */
  serverCallbackArgs?: Map | null;
}

/** 스크랩 공유하기 파라미터 */
export interface ShareScrapParam {
  /** 스크랩 대상 주소 */
  requestUrl: string;
  /** 템플릿 ID */
  templateId?: number | null;
  /** 템플릿 사용자 파라메터 */
  templateArgs?: Map | null;
  /** 서버 콜백 파라미터 */
  serverCallbackArgs?: Map | null;
}

/** 로컬 이미지 업로드 파라미터 */
export interface UploadImageParam {
  /** 로컬 이미지 경로 */
  image: string;
  /**
   * https 사용여부<br/>
   * 응답 URL을 https로 받을지 여부 (기본값 true)
   * */
  secureResource?: boolean | null;
}

/** 커스텀 템플릿 공유하기(웹) 파라미터 */
export interface MakeCustomUrlParam extends ShareCustomParam {
}

/** 기본 템플릿 공유하기(웹) 파라미터 */
export interface MakeDefaultUrlParam extends ShareDefaultParam {
}

/** 스크랩 공유하기(웹) 파라미터 */
export interface MakeScrapUrlParam extends ShareScrapParam {
}

/** 공유하기 결과 */
export interface SharingResult {
  /** 카카오톡 공유를 실행할 수 있는 URL */
  url: string;
  /** 템플릿 검증 결과 */
  warningMsg?: Map | null;
  /** 템플릿 사용자 파라메터 검증 결과 */
  argumentMsg?: Map | null;
}

/** 이미지 업로드, 스크랩 요청 결과 */
export interface ImageUploadResult {
  /** 업로드된 이미지 정보 */
  infos: ImageInfos;
}

/** 업로드된 이미지 정보 */
export interface ImageInfos {
  /** 원본 이미지 */
  original: ImageInfo;
}

/** 이미지 정보 */
export interface ImageInfo {
  /** 업로드 된 이미지의 URL */
  url: string;
  /** 업로드 된 이미지의 Content-Type */
  contentType: string;
  /** 업로드 된 이미지의 용량 (단위: 바이트) */
  length: number;
  /** 업로드 된 이미지의 너비 (단위: 픽셀) */
  width: number;
  /** 업로드 된 이미지의 높이 (단위: 픽셀) */
  height: number;
}
