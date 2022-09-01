//
//  KakaoSdkStoryApiRequestParams.swift
//  react-native-kakao-sdk-story
//
//  Created by kakao on 2022/08/29.
//

import Foundation
import KakaoSDKStory

struct DeleteStoryParam : Decodable {
    var id: String
}

struct LinkInfoParam : Decodable {
    var url: URL
    
    enum CodingKeys: String, CodingKey {
        case url
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        url = URL(string: ((try? values.decode(String.self, forKey: .url)) ?? ""))!
    }
}

struct PostLinkParam : Decodable {
    var content: String? = nil
    var linkInfo: LinkInfo
    var permission: Story.Permission = .Public
    var enableShare: Bool? = false
    var androidExecParam: [String:String]? = nil
    var iosExecParam: [String:String]? = nil
    var androidMarketParam: [String:String]? = nil
    var iosMarketParam: [String:String]? = nil
    
    enum CodingKeys: String, CodingKey {
        case content, linkInfo, permission, enableShare, androidExecParam, iosExecParam, androidMarketParam, iosMarketParam
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        content = try? values.decode(String.self, forKey: .content)
        linkInfo = try values.decode(LinkInfo.self, forKey: .linkInfo)
        if let permissionStr = try? values.decode(String.self, forKey: .permission) {
            if permissionStr == "F" {
                permission = Story.Permission.Friend
            } else if permissionStr == "A" {
                permission = Story.Permission.Public
            } else {
                permission = Story.Permission.OnlyMe
            }
        }
        enableShare = try? values.decode(Bool.self, forKey: .enableShare)
        androidExecParam = try? values.decode([String:String].self, forKey: .androidExecParam)
        iosExecParam = try? values.decode([String:String].self, forKey: .iosExecParam)
        androidMarketParam = try? values.decode([String:String].self, forKey: .androidMarketParam)
        iosMarketParam = try? values.decode([String:String].self, forKey: .iosMarketParam)
    }
}

struct PostNoteParam : Decodable {
    var content: String
    var permission: Story.Permission = .Public
    var enableShare: Bool? = false
    var androidExecParam: [String:String]? = nil
    var iosExecParam: [String:String]? = nil
    var androidMarketParam: [String:String]? = nil
    var iosMarketParam: [String:String]? = nil
    
    enum CodingKeys: String, CodingKey {
        case content, permission, enableShare, androidExecParam, iosExecParam, androidMarketParam, iosMarketParam
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        content = try values.decode(String.self, forKey: .content)
        if let permissionStr = try? values.decode(String.self, forKey: .permission) {
            if permissionStr == "F" {
                permission = Story.Permission.Friend
            } else if permissionStr == "A" {
                permission = Story.Permission.Public
            } else {
                permission = Story.Permission.OnlyMe
            }
        }
        enableShare = try? values.decode(Bool.self, forKey: .enableShare)
        androidExecParam = try? values.decode([String:String].self, forKey: .androidExecParam)
        iosExecParam = try? values.decode([String:String].self, forKey: .iosExecParam)
        androidMarketParam = try? values.decode([String:String].self, forKey: .androidMarketParam)
        iosMarketParam = try? values.decode([String:String].self, forKey: .iosMarketParam)
    }
}

struct PostPhotoParam : Decodable {
    var content: String? = nil
    var imagePaths: [String]
    var permission: Story.Permission = .Public
    var enableShare: Bool? = false
    var androidExecParam: [String:String]? = nil
    var iosExecParam: [String:String]? = nil
    var androidMarketParam: [String:String]? = nil
    var iosMarketParam: [String:String]? = nil
    
    enum CodingKeys: String, CodingKey {
        case content, imagePaths, permission, enableShare, androidExecParam, iosExecParam, androidMarketParam, iosMarketParam
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        content = try? values.decode(String.self, forKey: .content)
        imagePaths = try values.decode([String].self, forKey: .imagePaths)
        if let permissionStr = try? values.decode(String.self, forKey: .permission) {
            if permissionStr == "F" {
                permission = Story.Permission.Friend
            } else if permissionStr == "A" {
                permission = Story.Permission.Public
            } else {
                permission = Story.Permission.OnlyMe
            }
        }
        enableShare = try? values.decode(Bool.self, forKey: .enableShare)
        androidExecParam = try? values.decode([String:String].self, forKey: .androidExecParam)
        iosExecParam = try? values.decode([String:String].self, forKey: .iosExecParam)
        androidMarketParam = try? values.decode([String:String].self, forKey: .androidMarketParam)
        iosMarketParam = try? values.decode([String:String].self, forKey: .iosMarketParam)
    }
}

struct ProfileParam : Decodable {
    var secureResource: Bool
    
    enum CodingKeys: String, CodingKey {
        case secureResource
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        secureResource = (try? values.decode(Bool.self, forKey: .secureResource)) ?? true
    }
}

struct StoriesParam : Decodable {
    var lastId: String? = nil
}

struct StoryParam : Decodable {
    var id: String
}

struct StoryUploadParam : Decodable {
    var images: [UIImage?]
    
    enum CodingKeys: String, CodingKey {
        case images
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        if let imageStrs = try? values.decode([String].self, forKey: .images) {
            images = imageStrs.compactMap{( $0.toUIImage() )}
        } else {
            images = []
        }
    }
}

internal extension String {
    func toUIImage() -> UIImage? {
        if self.hasPrefix("file://") {
            if let url = URL(string: self) {
                if let imageData = try? Data(contentsOf: url) {
                    return UIImage(data:imageData)
                }
            }
        }
        if self.hasPrefix("data:image/") {
            if let url = URL(string: self) {
                if let imageData = try? Data(contentsOf: url) {
                    return UIImage(data: imageData)
                }
            }
        } else {
            if let imageData = Data(base64Encoded: self) {
                return UIImage(data: imageData)
            }
        }
        return nil
    }
}
