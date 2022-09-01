package com.kakaotam.rnsdk.share

import com.facebook.react.bridge.*
import com.kakao.sdk.share.ShareClient
import com.kakao.sdk.share.WebSharerClient
import com.kakao.sdk.share.model.ImageUploadResult
import com.kakao.sdk.share.model.SharingResult
import com.kakaotam.rnkakaosdkcommon.PromiseTransformer
import com.kakaotam.rnkakaosdkcommon.ReactToParam
import com.kakaotam.rnkakaosdkcommon.SdkInitializer
import com.kakaotam.rnsdk.share.model.*

class KakaoSdkShareApiModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "KakaoSdkShareApiModule"
    }

    @ReactMethod
    private fun isKakaoTalkSharingAvailable(promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        promise.resolve(ShareClient.instance.isKakaoTalkSharingAvailable(reactContext.currentActivity!!))
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun shareCustom(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, ShareCustomParam::class.java)!!
        ShareClient.instance.shareCustom(
            reactContext.currentActivity!!,
            p.templateId,
            p.templateArgs,
            p.serverCallbackArgs
        ) f@{ sharingResult: SharingResult?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(sharingResult))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun shareDefault(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, ShareDefaultParam::class.java)!!
        ShareClient.instance.shareDefault(
            reactContext.currentActivity!!,
            p.templatable!!,
            p.serverCallbackArgs
        ) f@{ sharingResult: SharingResult?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(sharingResult))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun scrapImage(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, ScrapImageParam::class.java)!!
        ShareClient.instance.scrapImage(
            p.imageUrl,
            p.secureResource
        ) f@{ imageUploadResult: ImageUploadResult?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(imageUploadResult))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun shareScrap(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, ShareScrapParam::class.java)!!
        ShareClient.instance.shareScrap(
            reactContext.currentActivity!!,
            p.requestUrl,
            p.templateId,
            p.templateArgs,
            p.serverCallbackArgs
        ) f@{ sharingResult: SharingResult?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(sharingResult))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun uploadImage(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, UploadImageParam::class.java)!!
        ShareClient.instance.uploadImage(
            p.image,
            p.secureResource
        ) f@{ imageUploadResult: ImageUploadResult?, error: Throwable? ->
            error?.let {
                promise.reject(PromiseTransformer.rnCode(it), PromiseTransformer.rnMessage(it), it)
                return@f
            }
            promise.resolve(PromiseTransformer.toJsonString(imageUploadResult))
        }
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun makeCustomUrl(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, MakeCustomUrlParam::class.java)!!
        promise.resolve(
            WebSharerClient.instance.makeCustomUrl(
                p.templateId, p.templateArgs, p.serverCallbackArgs
            ).toString()
        )
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun makeDefaultUrl(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, MakeDefaultUrlParam::class.java)!!
        promise.resolve(
            WebSharerClient.instance.makeDefaultUrl(
                p.templatable!!, p.serverCallbackArgs
            ).toString()
        )
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }

    @ReactMethod
    private fun makeScrapUrl(param: ReadableMap, promise: Promise) = try {
        SdkInitializer.ensure(reactContext)
        val p = ReactToParam.toParam(param, MakeScrapUrlParam::class.java)!!
        promise.resolve(
            WebSharerClient.instance.makeScrapUrl(
                p.requestUrl, p.templateId, p.templateArgs, p.serverCallbackArgs
            ).toString()
        )
    } catch (e: Exception) {
        promise.reject(PromiseTransformer.rnCode(e), PromiseTransformer.rnMessage(e), e)
    }
}
