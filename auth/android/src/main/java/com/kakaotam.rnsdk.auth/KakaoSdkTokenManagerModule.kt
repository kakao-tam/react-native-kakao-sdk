package com.kakaotam.rnsdk.auth

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.kakao.sdk.auth.TokenManager
import com.kakaotam.rnkakaosdkcommon.PromiseTransformer
import com.kakaotam.rnkakaosdkcommon.SdkInitializer

class KakaoSdkTokenManagerModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "KakaoSdkTokenManagerModule"
    }

    @ReactMethod
    private fun getToken(promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        TokenManager.instance.getToken()?.let {
            promise.resolve(PromiseTransformer.toJsonString(it))
        } ?: run {
            promise.resolve("null")
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun clear(promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        TokenManager.instance.clear()
        promise.resolve(true)
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }
}
