//
//  KakaoSdkNaviApiRequestParams.swift
//  react-native-kakao-sdk-navi
//
//  Created by kakao-tam on 2022/05/06.
//

import KakaoSDKNavi

struct NaviUrlParam : Decodable {
    var destination: NaviLocation
    var option: NaviOption?
    var viaList: [NaviLocation]?
    
    enum CodingKeys: String, CodingKey {
        case destination, option, viaList
    }
    
    enum NaviOptionCodingKeys: String, CodingKey {
        case coordType, vehicleType, rpOption, routeInfo, startAngle, returnUri
    }
    
    
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        destination = (try? values.decode(NaviLocation.self, forKey: .destination))!
        viaList = try? values.decode([NaviLocation].self, forKey: .viaList)
        
        if values.contains(.option) {
            if let optionValues = try? values.nestedContainer(keyedBy: NaviOptionCodingKeys.self, forKey: .option) {
                var coordType: CoordType? = nil
                var vehicleType: VehicleType? = nil
                var rpOption: RpOption? = nil
                var routeInfo: Bool? = nil
                var startAngle: Int? = nil
                var returnUri: URL? = nil
                
                if let coordTypeStr = try? optionValues.decode(String.self, forKey: .coordType) {
                    coordType = CoordType(rawValue: coordTypeStr)
                }
                if let vehicleTypeInt = try? optionValues.decode(Int.self, forKey: .vehicleType) {
                    vehicleType = VehicleType(rawValue: vehicleTypeInt)
                }
                if let rpOptionInt = try? optionValues.decode(Int.self, forKey: .rpOption) {
                    rpOption = RpOption(rawValue: rpOptionInt)
                }
                routeInfo = try? optionValues.decode(Bool.self, forKey: .routeInfo)
                startAngle = try? optionValues.decode(Int.self, forKey: .startAngle)
                if let returnUriStr = try? optionValues.decode(String.self, forKey: .returnUri) {
                    returnUri = URL(string: returnUriStr)
                }
                option = NaviOption(coordType: coordType, vehicleType: vehicleType, rpOption: rpOption, routeInfo: routeInfo, startX: nil, startY: nil, startAngle: startAngle, returnUri: returnUri)
            }
        }
    }
}

