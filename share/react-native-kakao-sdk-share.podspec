require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
kakao_sdk_version = '2.11.1'
rn_kakao_sdk_version = '1.0.1'
if defined?($KakaoSDKVersion)
  kakao_sdk_version = $KakaoSDKVersion
end
if defined?($RnKakaoSdkVersion)
  rn_kakao_sdk_version = $RnKakaoSdkVersion
end

Pod::Spec.new do |s|
  s.name         = "react-native-kakao-sdk-share"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "11.0" }
  s.source       = { :git => "https://github.com/kakao-tam/react-native-kakao-sdk.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"

  s.dependency "React-Core"

  s.dependency 'RnKakaoSdkCommon', ">=#{rn_kakao_sdk_version}"
  s.dependency 'KakaoSDKShare', kakao_sdk_version
end
