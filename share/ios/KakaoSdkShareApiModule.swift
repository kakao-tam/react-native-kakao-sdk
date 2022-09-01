//
//  KakaoSdkShareApiModule.swift
//  react-native-kakao-sdk-share
//
//  Created by kakao-tam on 2022/05/06.
//

import Foundation

import RnKakaoSdkCommon
import KakaoSDKShare

@objc(KakaoSdkShareApiModule)
class KakaoSdkShareApiModule: NSObject {

    @objc(isKakaoTalkSharingAvailable:withReject:)
    func isKakaoTalkSharingAvailable(_ resolve:@escaping RCTPromiseResolveBlock,
                                     reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            RnKakaoSdkInitializer.shared.ensure()
            resolve(ShareApi.isKakaoTalkSharingAvailable())
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }

    @objc(shareCustom:withResolve:withReject:)
    func shareCustom(_ param:NSDictionary,
                     resolve:@escaping RCTPromiseResolveBlock,
                     reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            RnKakaoSdkInitializer.shared.ensure()
            let p = param.toParam(ShareCustomParam.self)!
            ShareApi.shared.shareCustom(templateId: p.templateId,
                                        templateArgs: p.templateArgs,
                                        serverCallbackArgs: p.serverCallbackArgs) {
                (sharingResult: SharingResult?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    if let sharingResult = sharingResult {
                        resolve(SharingResultWrapper(sharingResult).toJsonString());
                    } else {
                        resolve(nil)
                    }
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }

    @objc(shareDefault:withResolve:withReject:)
    func shareDefault(_ param:NSDictionary,
                      resolve:@escaping RCTPromiseResolveBlock,
                      reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            RnKakaoSdkInitializer.shared.ensure()
            let p = param.toParam(ShareDefaultParam.self)!
            ShareApi.shared.shareDefault(templatable: p.templatable,
                                         serverCallbackArgs: p.serverCallbackArgs) {
                (sharingResult: SharingResult?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    if let sharingResult = sharingResult {
                        resolve(SharingResultWrapper(sharingResult).toJsonString());
                    } else {
                        resolve(nil)
                    }
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }

    @objc(scrapImage:withResolve:withReject:)
    func scrapImage(_ param:NSDictionary,
                    resolve:@escaping RCTPromiseResolveBlock,
                    reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            RnKakaoSdkInitializer.shared.ensure()
            let p = param.toParam(ScrapImageParam.self)!
            ShareApi.shared.imageScrap(imageUrl: p.imageUrl,
                                       secureResource: p.secureResource) {
                (imageUploadResult: ImageUploadResult?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(imageUploadResult?.toJsonString());
                }
            }

        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }

    @objc(shareScrap:withResolve:withReject:)
    func shareScrap(_ param:NSDictionary,
                    resolve:@escaping RCTPromiseResolveBlock,
                    reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            RnKakaoSdkInitializer.shared.ensure()
            let p = param.toParam(ShareScrapParam.self)!
            ShareApi.shared.shareScrap(requestUrl: p.requestUrl,
                                       templateId: p.templateId,
                                       templateArgs: p.templateArgs,
                                       serverCallbackArgs: p.serverCallbackArgs) {
                (sharingResult: SharingResult?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    if let sharingResult = sharingResult {
                        resolve(SharingResultWrapper(sharingResult).toJsonString());
                    } else {
                        resolve(nil)
                    }
                }
            }

        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }

    @objc(uploadImage:withResolve:withReject:)
    func uploadImage(_ param:NSDictionary,
                     resolve:@escaping RCTPromiseResolveBlock,
                     reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            RnKakaoSdkInitializer.shared.ensure()
            let p = param.toParam(UploadImageParam.self)!
            ShareApi.shared.imageUpload(image: p.image,
                                        secureResource: p.secureResource) {
                (imageUploadResult: ImageUploadResult?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(imageUploadResult?.toJsonString());
                }
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }

    @objc(makeCustomUrl:withResolve:withReject:)
    func makeCustomUrl(_ param:NSDictionary,
                       resolve:@escaping RCTPromiseResolveBlock,
                       reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            RnKakaoSdkInitializer.shared.ensure()
            let p = param.toParam(MakeCustomUrlParam.self)!
            if let url = ShareApi.shared.makeCustomUrl(templateId: p.templateId,
                                                       templateArgs: p.templateArgs,
                                                       serverCallbackArgs: p.serverCallbackArgs) {
                resolve(url.absoluteString)
            } else {
                resolve(nil)
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }

    @objc(makeDefaultUrl:withResolve:withReject:)
    func makeDefaultUrl(_ param:NSDictionary,
                        resolve:@escaping RCTPromiseResolveBlock,
                        reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            RnKakaoSdkInitializer.shared.ensure()
            let p = param.toParam(MakeDefaultUrlParam.self)!
            if let url = ShareApi.shared.makeDefaultUrl(
                templatable: p.templatable,
                serverCallbackArgs: p.serverCallbackArgs) {
                resolve(url.absoluteString)
            } else {
                resolve(nil)
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }

    @objc(makeScrapUrl:withResolve:withReject:)
    func makeScrapUrl(_ param:NSDictionary,
                      resolve:@escaping RCTPromiseResolveBlock,
                      reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            RnKakaoSdkInitializer.shared.ensure()
            let p = param.toParam(MakeScrapUrlParam.self)!
            if let url = ShareApi.shared.makeScrapUrl(requestUrl: p.requestUrl, templateId: p.templateId, templateArgs: p.templateArgs,
                                                      serverCallbackArgs: p.serverCallbackArgs) {
                resolve(url.absoluteString)
            } else {
                resolve(nil)
            }
        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
}
