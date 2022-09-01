//
//  KakaoSdkNaviApiModule.m
//  react-native-kakao-sdk-navi
//
//  Created by kakao-tam on 2022/05/06.
//
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(KakaoSdkNaviApiModule, NSObject)

RCT_EXTERN_METHOD(shareUrl:(NSDictionary *)param
                  withResolve:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(navigateUrl:(NSDictionary *)param
                  withResolve:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
