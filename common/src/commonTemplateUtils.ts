import type { CommerceTemplate, FeedTemplate, ListTemplate, LocationTemplate, TextTemplate } from './types';

// 메시지용 템플릿 유틸리티
class CommonTemplateUtils {
  // Feed 템플릿 생성
  public feedTemplate = (param: FeedTemplate): FeedTemplate => {
    (param as any)['objectType'] = 'feed';
    return param;
  };

  // List 템플릿 생성
  public listTemplate = (param: ListTemplate): ListTemplate => {
    (param as any)['objectType'] = 'list';
    return param;
  };

  // Location 템플릿 생성
  public locationTemplate = (param: LocationTemplate): LocationTemplate => {
    (param as any)['objectType'] = 'location';
    return param;
  };

  // Commerce 템플릿 생성
  public commerceTemplate = (param: CommerceTemplate): CommerceTemplate => {
    (param as any)['objectType'] = 'commerce';
    return param;
  };

  // Text 템플릿 생성
  public textTemplate = (param: TextTemplate): TextTemplate => {
    (param as any)['objectType'] = 'text';
    return param;
  };
}

export default CommonTemplateUtils;
