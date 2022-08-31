//
//  KakaoSdkTokenManagerModule.swift
//  react-native-kakao-sdk-auth
//
//  Created by kakao on 2022/07/20.
//

import Foundation

import RnKakaoSdkCommon
import KakaoSDKAuth

@objc(KakaoSdkTokenManagerModule)
class KakaoSdkTokenManagerModule : NSObject {
    
    @objc(getToken:withReject:)
    func getToken(_ resolve:@escaping RCTPromiseResolveBlock,
                  reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            resolve(TokenManager.manager.getToken()?.toJsonString())
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(clear:withReject:)
    func clear(_ resolve:@escaping RCTPromiseResolveBlock,
               reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            TokenManager.manager.deleteToken()
            resolve(true)
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
}
