//
//  KakaoSdkTokenManagerModule.m
//  react-native-kakao-sdk-auth
//
//  Created by kakao on 2022/07/21.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(KakaoSdkTokenManagerModule, NSObject)

RCT_EXTERN_METHOD(getToken:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock)reject *)
RCT_EXTERN_METHOD(clear:(RCTPromiseResolveBlock *)resolve
                  withReject:(RCTPromiseRejectBlock)reject *)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
