package com.kakaotam.rnsdk.story

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.kakaotam.rnkakaosdkcommon.gson.GsonUtils
import com.kakaotam.rnsdk.story.gson.StoryUploadParamDeserializerGson
import com.kakaotam.rnsdk.story.model.StoryUploadParam

class KakaoSdkStoryApiPackage : ReactPackage {

    init {
        GsonUtils.registerTypeAdapter(StoryUploadParam::class.java, StoryUploadParamDeserializerGson())
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(KakaoSdkStoryApiModule(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
