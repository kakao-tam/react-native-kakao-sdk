/** Map<String, String> */
export interface Map {
  [key: string]: string;
}

/** Map<String, Object> */
export interface MapAny {
  [key: string]: string | number | boolean | MapAny;
}

/** 예외 규격 */
export interface ApiError {
  /** API 에러코드 */
  code: string;
  /** 에러 메시지 */
  message: string;
}

/** 특수한 경우에만 사용됩니다. */
export interface ServerHosts {
  kapi: string;
  dapi: string;
  kauth: string;
  auth: string;
  talkAuth: string;
  channel: string;
  talkLink: string;
  talkLinkVersion: string;
  sharerLink: string;
}

/**
 * 초기화 파라메터<br>
 * 특별한 경우에만 사용됩니다. KAKAO_NATIVE_APP_KEY 리소스를 설정하고 이 파라메터는 사용하지 않는 것을 권장 드립니다.
 * */
export interface InitParam {
  appKey?: string | null;
  customScheme?: string | null;
  loggingEnabled?: boolean | null;
  hosts?: ServerHosts | null;
}

/** 기본 템플릿 유형<br> */
export type Templatable = FeedTemplate | ListTemplate | LocationTemplate | CommerceTemplate | TextTemplate;

/** 피드 템플릿 */
export interface FeedTemplate {
  /** 메인 콘텐츠 */
  content: Content;
  /** 아이템 영역 콘텐츠 */
  itemContent?: ItemContent | null;
  /** 소셜 정보 */
  social?: Social | null;
  /** 기본 버튼 명 */
  buttonTitle?: string | null;
  /** 버튼 목록 (최대 2개) */
  buttons?: Button[] | null;
}

/** 콘텐츠 */
export interface Content {
  /** 타이틀 */
  title: string;
  /** 이미지 URL */
  imageUrl: string;
  /** 이미지 너비 (픽셀) */
  imageWidth?: number | null;
  /** 이미지 높이 (픽셀) */
  imageHeight?: number | null;
  /** 이미지 설명 */
  description?: string | null;
  /** 클릭시 이동할 링크 정보 */
  link: Link;
}

/** 링크 오브젝트 */
export interface Link {
  /** PC버전 웹링크 URL */
  webUrl?: string | null;
  /** 모바일 카카오톡에서 사용하는 웹 링크 URL */
  mobileWebUrl?: string | null;
  /** 안드로이드 카카오톡에서 사용하는 앱 링크 URL에 추가할 파라메터 */
  androidExecutionParams?: string | null;
  /** iOS 카카오톡에서 사용하는 앱 링크 URL에 추가할 파라메터 */
  iosExecutionParams?: string | null;
}

/** 아이템 목록 콘텐츠 */
export interface ItemContent {
  /** 프로필 영역 출력 텍스트 */
  profileText?: string | null;
  /** 프로필 이미지 영역 출력 이미지URL */
  profileImageUrl?: string | null;
  /** 이미지 아이템 제목 (최대2줄, 24자) */
  titleImageText?: string | null;
  /** 아이템 이미지 URL */
  titleImageUrl?: string | null;
  /** 이미지 아이템 카테고리 영역 출력 */
  titleImageCategory?: string | null;
  /** 각 텍스트 아이템 정보 */
  items?: ItemInfo[] | null;
  /** 주문금액, 결제금액등 아이템 영역의 요약 정보 */
  sum?: string | null;
  /** 아이템 영역의 가격 합산 정보 */
  sumOp?: string | null;
}

/** 아이템 */
export interface ItemInfo {
  /** 아이템 이름 */
  item: string;
  /** 아이템 가격 */
  itemOp: string;
}

/** 소셜정보 */
export interface Social {
  /** 좋아요 수 */
  likeCount?: number | null;
  /** 댓글 수 */
  commentCount?: number | null;
  /** 공유 수 */
  sharedCount?: number | null;
  /** 조회 수 */
  viewCount?: number | null;
  /** 구독 수 */
  subscriberCount?: number | null;
}

/** 버튼 오브젝트 */
export interface Button {
  /** 타이틀 */
  title: string;
  /** 링크 정보 */
  link: Link;
}

/** 리스트 템플릿 */
export interface ListTemplate {
  /** 헤더 타이틀 */
  headerTitle: string;
  /** 헤더 링크 */
  headerLink: Link;
  /** 컨텐츠 목록 (최대 2개) */
  contents: Content[];
  /** 버튼 타이틀 */
  buttonTitle?: string | null;
  /** 버튼 목록 (최대 2개) */
  buttons?: Button[] | null;
}

/** 위치공유 템플릿 */
export interface LocationTemplate {
  /** 주소 */
  address: string;
  /** 주소 타이틀 */
  addressTitle?: string | null;
  /** 콘텐츠 */
  content: Content;
  /** 소셜정보 */
  social?: Social | null;
  /** 기본 버튼 타이틀 */
  buttonTitle?: string | null;
  /** 버튼 목록 */
  buttons?: Button[] | null;
}

/** 커머스 템플릿 */
export interface CommerceTemplate {
  /** 콘텐츠 */
  content: Content;
  /** 콘텐츠의 커머스 가격정보 */
  commerce: CommerceDetail;
  /** 기본 버튼 타이틀 */
  buttonTitle?: string | null;
  /** 버튼 목록 */
  buttons?: Button[] | null;
}

/** 커머스 가격정보 */
export interface CommerceDetail {
  /** 정상가격 */
  regularPrice: number;
  /** 할인가격 */
  discountPrice?: number | null;
  /** 할인율 */
  discountRate?: number | null;
  /** 정액 할인 가격 */
  fixedDiscountPrice?: number | null;
  /** 상품명 */
  productName?: string | null;
  /** 가격 단위 */
  currencyUnit?: string | null;
  /** 가격 단위 위치 */
  /** - 0: 가격 뒤 */
  /** - 1: 가격 앞 */
  currencyUnitPosition?: 0 | 1 | null;
}

/** 텍스트 템플릿 */
export interface TextTemplate {
  /** 텍스트 (최대 200자) */
  text: string;
  /** 콘텐츠 클릭 시 이동할 링크 정보 */
  link: Link;
  /** 기본 버튼 타이틀 */
  buttonTitle?: string | null;
  /** 버튼 목록 */
  buttons?: Button[] | null;
}

/** 커스텀 탭 열기 파라미터 */
export interface OpenWithDefaultParam {
  /** URI */
  uri: string;
}
