//
//  KakaoSdkAuthApiModule.m
//  react-native-kakao-sdk-auth
//
//  Created by kakao-tam on 2022/05/06.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(KakaoSdkAuthApiModule, NSObject)

RCT_EXTERN_METHOD(hasToken:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock)reject *)
RCT_EXTERN_METHOD(refreshToken:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock)reject *)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
