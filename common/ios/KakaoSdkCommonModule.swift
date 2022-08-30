//
//  KakaoSdkCommonModule.swift
//  react-native-kakao-sdk-common
//
//  Created by kakao-tam on 2022/05/06.
//

import Foundation
import SafariServices

import RnKakaoSdkCommon
import KakaoSDKCommon

@objc(KakaoSdkCommonModule)
class KakaoSdkCommonModule: NSObject {
    
    @objc(`init`:withResolve:withReject:)
    func initSdk(_ param: NSDictionary,
                 resolve:@escaping RCTPromiseResolveBlock,
                 reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            let p = param.toParam(InitSdkParam.self)!
            KakaoSDK.initSDK(appKey: p.appKey,
                             customScheme: p.customScheme,
                             loggingEnable: p.loggingEnable,
                             hosts: p.hosts,
                             approvalType: p.approvalType)
            RnKakaoSdkInitializer.shared.initialized = true
            resolve(true);
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(isInitialized:withReject:)
    func isInitialized(_ resolve:@escaping RCTPromiseResolveBlock,
                       reject:@escaping RCTPromiseRejectBlock) -> Void {
        resolve(RnKakaoSdkInitializer.shared.initialized)
    }
    
    @objc(appKey:withReject:)
    func appKey(_ resolve:@escaping RCTPromiseResolveBlock,
                reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            do {
                resolve(try KakaoSDK.shared.appKey())
            } catch {
                reject(error.rnCode(), error.rnMessage(), error)
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
    
    @objc(openWithDefault:withResolve:withReject:)
    func openWithDefault(_ param:NSDictionary,
                         resolve:@escaping RCTPromiseResolveBlock,
                         reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            let p = param.toParam(OpenWithDefaultParam.self)!
            if let url = p.url {
                let viewCtrl = SFSafariViewController(url: url)
                viewCtrl.modalTransitionStyle = .crossDissolve
                viewCtrl.modalPresentationStyle = .overCurrentContext
                if let ctrl = RCTPresentedViewController() {
                    DispatchQueue.main.async {
                        ctrl.present(viewCtrl, animated: true, completion: nil)
                        resolve(true)
                    }
                    return
                }
            }
            resolve(false);
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
}
