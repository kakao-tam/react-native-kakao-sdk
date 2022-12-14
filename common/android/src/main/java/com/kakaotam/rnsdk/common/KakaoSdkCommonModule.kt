package com.kakaotam.rnsdk.common

import android.net.Uri
import com.facebook.react.bridge.*
import com.kakao.sdk.common.KakaoSdk
import com.kakao.sdk.common.util.KakaoCustomTabsClient
import com.kakaotam.rnkakaosdkcommon.PromiseTransformer
import com.kakaotam.rnkakaosdkcommon.ReactToParam
import com.kakaotam.rnkakaosdkcommon.SdkInitializer
import com.kakaotam.rnsdk.common.model.InitParam
import com.kakaotam.rnsdk.common.model.OpenWithDefaultParam

class KakaoSdkCommonModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "KakaoSdkCommonModule"
    }

    @ReactMethod
    private fun init(param: ReadableMap, promise: Promise) = try {
        var p = ReactToParam.toParam(param, InitParam::class.java)!!
        if (p.appKey.isNullOrEmpty()) {
            p.appKey = reactContext.resources.getString(
                reactContext.resources.getIdentifier(
                    "KAKAO_NATIVE_APP_KEY",
                    "string",
                    reactContext.packageName
                )
            )
        }
        KakaoSdk.init(
            reactContext.currentActivity!!,
            p.appKey,
            p.customScheme,
            p.loggingEnable,
            p.hosts,
            p.approvalType
        )
        SdkInitializer.initialized = true
        promise.resolve(true)
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun isInitialized(promise: Promise) = try {
        promise.resolve(SdkInitializer.initialized)
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun appKey(promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        promise.resolve(KakaoSdk.appKey)
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun openWithDefault(param: ReadableMap, promise: Promise) = try {
        var p = ReactToParam.toParam(param, OpenWithDefaultParam::class.java)!!
        KakaoCustomTabsClient.openWithDefault(reactContext.currentActivity!!, Uri.parse(p.uri))
        promise.resolve(true)
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }
}
