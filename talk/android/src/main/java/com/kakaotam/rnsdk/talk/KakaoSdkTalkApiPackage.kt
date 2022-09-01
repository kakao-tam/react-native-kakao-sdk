package com.kakaotam.rnsdk.talk

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.kakaotam.rnkakaosdkcommon.gson.GsonUtils
import com.kakaotam.rnsdk.talk.gson.SendDefaultMemoParamDeserializerGson
import com.kakaotam.rnsdk.talk.gson.SendDefaultMessageParamDeserializerGson
import com.kakaotam.rnsdk.talk.model.SendDefaultMemoParam
import com.kakaotam.rnsdk.talk.model.SendDefaultMessageParam


class KakaoSdkTalkApiPackage : ReactPackage {

    init {
        GsonUtils.registerTypeAdapter(SendDefaultMemoParam::class.java, SendDefaultMemoParamDeserializerGson());
        GsonUtils.registerTypeAdapter(SendDefaultMessageParam::class.java, SendDefaultMessageParamDeserializerGson());
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(KakaoSdkTalkApiModule(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
