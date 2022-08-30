package com.kakaotam.rnsdk.common

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.kakaotam.rnkakaosdkcommon.gson.DateSerializerGson
import com.kakaotam.rnkakaosdkcommon.gson.GsonUtils
import java.util.*

class KakaoSdkCommonPackage : ReactPackage {
    init {
        GsonUtils.registerTypeAdapter(Date::class.java, DateSerializerGson())
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(
            KakaoSdkCommonModule(reactContext)
        )
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
