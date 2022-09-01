//
//  KakaoSdkShareApiRequestParams.swift
//  react-native-kakao-sdk-share
//
//  Created by kakao on 2022/05/06.
//

import Foundation

import RnKakaoSdkCommon
import KakaoSDKTemplate
import KakaoSDKShare

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

struct ShareCustomParam : Decodable {
    var templateId: Int64
    var templateArgs: [String:String]?
    var serverCallbackArgs: [String:String]?
    
    enum CodingKeys: String, CodingKey {
        case templateId, templateArgs, serverCallbackArgs
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        templateId = (try? values.decode(Int64.self, forKey: .templateId)) ?? 0
        templateArgs = try? values.decode([String:String].self, forKey: .templateArgs)
        serverCallbackArgs = try? values.decode([String:String].self, forKey: .serverCallbackArgs)
    }
}

struct ShareDefaultParam : Decodable {
    var templatable: Templatable
    var serverCallbackArgs: [String:String]?
    
    enum CodingKeys: String, CodingKey {
        case templatable, serverCallbackArgs
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        serverCallbackArgs = try? values.decode([String:String].self, forKey: .serverCallbackArgs)
        templatable = TemplateUtils.toTemplatable(decoder: decoder)!
    }
}

struct SharingResultWrapper : Encodable {
    var url: URL
    var warningMsg : [String:String]?
    var argumentMsg : [String:String]?
    
    enum CodingKeys: String, CodingKey {
        case url, warningMsg, argumentMsg
    }
    
    public init(_ sharingResult: SharingResult) {
        self.url = sharingResult.url
        self.warningMsg = sharingResult.warningMsg
        self.argumentMsg = sharingResult.argumentMsg
    }
}

struct ScrapImageParam : Decodable {
    var imageUrl: URL
    var secureResource: Bool
    
    enum CodingKeys: String, CodingKey {
        case imageUrl, secureResource
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        imageUrl = URL(string: (try? values.decode(String.self, forKey: .imageUrl)) ?? "")!
        secureResource = (try? values.decode(Bool.self, forKey: .secureResource)) ?? true
    }
}

struct ShareScrapParam : Decodable {
    var requestUrl: String
    var templateId: Int64?
    var templateArgs: [String:String]?
    var serverCallbackArgs: [String:String]?
    
    enum CodingKeys: String, CodingKey {
        case requestUrl, templateId, templateArgs, serverCallbackArgs
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        requestUrl = (try? values.decode(String.self, forKey: .requestUrl)) ?? ""
        templateId = try? values.decode(Int64.self, forKey: .templateId)
        templateArgs = try? values.decode([String:String].self, forKey: .templateArgs)
        serverCallbackArgs = try? values.decode([String:String].self, forKey: .serverCallbackArgs)
    }
}

struct UploadImageParam : Decodable {
    var image: UIImage
    var secureResource : Bool
    
    enum CodingKeys: String, CodingKey {
        case image, secureResource
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        image = ((try? values.decode(String.self, forKey: .image))?.toUIImage())!
        secureResource = (try? values.decode(Bool.self, forKey: .secureResource)) ?? true
    }
}

struct MakeCustomUrlParam: Decodable {
    var templateId: Int64
    var templateArgs: [String:String]?
    var serverCallbackArgs: [String:String]?
    
    enum CodingKeys: String, CodingKey {
        case templateId, templateArgs, serverCallbackArgs
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        templateId = (try? values.decode(Int64.self, forKey: .templateId)) ?? 0
        templateArgs = try? values.decode([String:String].self, forKey: .templateArgs)
        serverCallbackArgs = try? values.decode([String:String].self, forKey: .serverCallbackArgs)
    }
}

struct MakeDefaultUrlParam: Decodable {
    var templatable: Templatable
    var serverCallbackArgs: [String:String]?
    
    enum CodingKeys: String, CodingKey {
        case templatable, serverCallbackArgs
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        serverCallbackArgs = try? values.decode([String:String].self, forKey: .serverCallbackArgs)
        templatable = TemplateUtils.toTemplatable(decoder: decoder)!
    }
}

struct MakeScrapUrlParam: Decodable {
    var requestUrl: String
    var templateId: Int64?
    var templateArgs: [String:String]?
    var serverCallbackArgs: [String:String]?
    
    enum CodingKeys: String, CodingKey {
        case requestUrl, templateId, templateArgs, serverCallbackArgs
    }
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        requestUrl = (try? values.decode(String.self, forKey: .requestUrl)) ?? ""
        templateId = try? values.decode(Int64.self, forKey: .templateId)
        templateArgs = try? values.decode([String:String].self, forKey: .templateArgs)
        serverCallbackArgs = try? values.decode([String:String].self, forKey: .serverCallbackArgs)
    }
}
