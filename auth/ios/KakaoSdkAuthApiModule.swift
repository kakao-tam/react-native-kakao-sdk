//
//  KakaoSdkAuthApiModule.swift
//  react-native-kakao-sdk-auth
//
//  Created by kakao-tam on 2022/05/06.
//
import Foundation

import RnKakaoSdkCommon
import KakaoSDKAuth

@objc(KakaoSdkAuthApiModule)
class KakaoSdkAuthApiModule : NSObject {

    @objc(hasToken:withReject:)
    func hasToken(_ resolve:@escaping RCTPromiseResolveBlock,
                  reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            RnKakaoSdkInitializer.shared.ensure()
            resolve(AuthApi.hasToken())
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }

    @objc(refreshToken:withReject:)
    func refreshToken(_ resolve:@escaping RCTPromiseResolveBlock,
                      reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            RnKakaoSdkInitializer.shared.ensure()
            AuthApi.shared.refreshToken() {
                (oauthToken: OAuthToken?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(oauthToken?.toJsonString())
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
}
