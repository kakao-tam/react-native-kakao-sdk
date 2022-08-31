//
//  KakaoSdkFriendRequestParam.swift
//  react-native-kakao-sdk-friend
//
//  Created by kakao on 2022/05/06.
//

import Foundation

import RnKakaoSdkCommon
import KakaoSDKFriend

struct SelectFriendParam : Decodable {
    var params: OpenPickerFriendRequestParams
    
    enum CodingKeys: String, CodingKey {
        case params
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        if let dic = try? values.decode([String: Any].self, forKey: .params) {
            let serviceTypeFilter: KakaoSDKFriend.PickerServiceTypeFilter?
            let viewAppearance: KakaoSDKFriend.ViewAppearance?
            let orientation: KakaoSDKFriend.PickerOrientation?
            if let serviceTypeFilterStr = dic["serviceTypeFilter"] as? String {
                serviceTypeFilter = KakaoSDKFriend.PickerServiceTypeFilter(rawValue: serviceTypeFilterStr)
            } else {
                serviceTypeFilter = nil
            }
            if let viewAppearanceStr = dic["viewAppearance"] as? String {
                viewAppearance = KakaoSDKFriend.ViewAppearance(rawValue: viewAppearanceStr)
            } else {
                viewAppearance = nil
            }
            if let orientationStr = dic["orientation"] as? String {
                switch (orientationStr) {
                case "portrait":
                    orientation = KakaoSDKFriend.PickerOrientation.portrait
                    break
                case "landscape":
                    orientation = KakaoSDKFriend.PickerOrientation.landscape
                    break
                default:
                    orientation = KakaoSDKFriend.PickerOrientation.auto
                }
            } else {
                orientation = nil
            }
            params = OpenPickerFriendRequestParams(
                title: dic["title"] as? String,
                serviceTypeFilter: serviceTypeFilter,
                viewAppearance: viewAppearance,
                orientation: orientation,
                enableSearch: dic["enableSearch"] as? Bool,
                enableIndex: dic["enableIndex"] as? Bool,
                showMyProfile: dic["showMyProfile"] as? Bool,
                showFavorite: dic["showFavorite"] as? Bool,
                showPickedFriend: dic["showPickedFriend"] as? Bool,
                maxPickableCount: dic["maxPickableCount"] as? Int,
                minPickableCount: dic["minPickableCount"] as? Int
            )
        } else {
            params = OpenPickerFriendRequestParams()
        }
    }
}

extension Array where Element == SelectedUser {
    func toDic() -> [[String:Any]] {
        return self.compactMap { $0.toDic() }
    }
}

extension SelectedUsers {
    func toJsonString() -> String {
        return Converter.shared.toJson(
            [
                "totalCount": self.totalCount,
                "users": self.users?.toDic() ?? NSNull(),
            ]
        )
    }
}

extension SelectedUser {
    func toDic() -> [String:Any] {
        return [
            "id": self.id ?? NSNull(),
            "uuid": self.uuid,
            "profileNickname": self.profileNickname ?? NSNull(),
            "profileThumbnailImage": self.profileThumbnailImage?.absoluteString ?? NSNull(),
            "favorite": self.favorite ?? NSNull()
        ]
    }
}
