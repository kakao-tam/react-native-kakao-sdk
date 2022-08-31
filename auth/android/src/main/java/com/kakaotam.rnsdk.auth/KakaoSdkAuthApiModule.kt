package com.kakaotam.rnsdk.auth

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.kakao.sdk.auth.AuthApiClient
import com.kakao.sdk.auth.model.OAuthToken
import com.kakaotam.rnkakaosdkcommon.PromiseTransformer
import com.kakaotam.rnkakaosdkcommon.SdkInitializer

class KakaoSdkAuthApiModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "KakaoSdkAuthApiModule"
    }

    @ReactMethod
    private fun hasToken(promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        promise.resolve(AuthApiClient.instance.hasToken())
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun refreshToken(promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        AuthApiClient.instance.refreshToken() f@{ token: OAuthToken?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(token))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

}
