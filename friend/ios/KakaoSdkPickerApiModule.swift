//
//  KakaoSdkPickerApiModule.swift
//  react-native-kakao-sdk-friend
//
//  Created by kakao-tam on 2022/05/06.
//

import Foundation

import RnKakaoSdkCommon
import KakaoSDKFriend

@objc(KakaoSdkPickerApiModule)
class KakaoSdkPickerApiModule: NSObject {

    @objc(selectFriend:withResolve:withReject:)
    func selectFriend(_ param:NSDictionary,
                      resolve:@escaping RCTPromiseResolveBlock,
                      reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            RnKakaoSdkInitializer.shared.ensure()
            let p = param.toParam(SelectFriendParam.self)!
            PickerApi.shared.selectFriend(params:p.params) {
                (selectedUsers: SelectedUsers?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(selectedUsers?.toJsonString());
                }
            }

        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }

    @objc(selectFriendPopup:withResolve:withReject:)
    func selectFriendPopup(_ param:NSDictionary,
                           resolve:@escaping RCTPromiseResolveBlock,
                           reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            RnKakaoSdkInitializer.shared.ensure()
            let p = param.toParam(SelectFriendParam.self)!
            PickerApi.shared.selectFriendPopup(params:p.params) {
                (selectedUsers: SelectedUsers?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(selectedUsers?.toJsonString());
                }
            }

        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }

    @objc(selectFriends:withResolve:withReject:)
    func selectFriends(_ param:NSDictionary,
                       resolve:@escaping RCTPromiseResolveBlock,
                       reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            RnKakaoSdkInitializer.shared.ensure()
            let p = param.toParam(SelectFriendParam.self)!
            PickerApi.shared.selectFriends(params:p.params) {
                (selectedUsers: SelectedUsers?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(selectedUsers?.toJsonString());
                }
            }

        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }

    @objc(selectFriendsPopup:withResolve:withReject:)
    func selectFriendsPopup(_ param:NSDictionary,
                            resolve:@escaping RCTPromiseResolveBlock,
                            reject:@escaping RCTPromiseRejectBlock) -> Void {
        let cErr = RnKakaoSdkObjC.tryCatch {
            RnKakaoSdkInitializer.shared.ensure()
            let p = param.toParam(SelectFriendParam.self)!
            PickerApi.shared.selectFriendsPopup(params:p.params) {
                (selectedUsers: SelectedUsers?, error: Error?) in
                if let error = error {
                    reject(error.rnCode(), error.rnMessage(), error)
                } else {
                    resolve(selectedUsers?.toJsonString());
                }
            }

        }
        if let cErr = cErr {
            reject(cErr.rnCode(), cErr.rnMessage(), cErr)
        }
    }
}
