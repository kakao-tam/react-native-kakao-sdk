//
//  KakaoSdkCommonModule.m
//  react-native-kakao-sdk-common
//
//  Created by kakao-tam on 2022/05/06.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTUtils.h>

@interface RCT_EXTERN_MODULE(KakaoSdkCommonModule, NSObject)

RCT_EXTERN_METHOD(init:(NSDictionary *)param
                  withResolve:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(isInitialized:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(appKey:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)
RCT_EXTERN_METHOD(openWithDefault:(NSDictionary *)param
                  withResolve:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock *)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
