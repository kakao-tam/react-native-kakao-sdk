package com.kakaotam.rnsdk.share

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.kakao.sdk.share.model.SharingResult
import com.kakaotam.rnkakaosdkcommon.gson.GsonUtils
import com.kakaotam.rnsdk.share.gson.MakeDefaultUrlParamDeserializerGson
import com.kakaotam.rnsdk.share.gson.ShareDefaultParamDeserializerGson
import com.kakaotam.rnsdk.share.gson.SharingResultSerializerGson
import com.kakaotam.rnsdk.share.gson.UploadImageParamDeserializerGson
import com.kakaotam.rnsdk.share.model.MakeDefaultUrlParam
import com.kakaotam.rnsdk.share.model.ShareDefaultParam
import com.kakaotam.rnsdk.share.model.UploadImageParam


class KakaoSdkShareApiPackage : ReactPackage {

    init {
        GsonUtils.registerTypeAdapter(ShareDefaultParam::class.java, ShareDefaultParamDeserializerGson())
        GsonUtils.registerTypeAdapter(UploadImageParam::class.java, UploadImageParamDeserializerGson())
        GsonUtils.registerTypeAdapter(MakeDefaultUrlParam::class.java, MakeDefaultUrlParamDeserializerGson())
        GsonUtils.registerTypeAdapter(SharingResult::class.java, SharingResultSerializerGson())
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(KakaoSdkShareApiModule(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
