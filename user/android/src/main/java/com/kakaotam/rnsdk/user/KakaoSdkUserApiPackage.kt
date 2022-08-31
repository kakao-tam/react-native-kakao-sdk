package com.kakaotam.rnsdk.user

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.kakaotam.rnkakaosdkcommon.gson.GsonUtils
import com.kakaotam.rnsdk.user.gson.ShippingAddressesParamDeserializerGson
import com.kakaotam.rnsdk.user.model.ShippingAddressesParam

class KakaoSdkUserApiPackage : ReactPackage {

    init {
        GsonUtils.registerTypeAdapter(ShippingAddressesParam::class.java, ShippingAddressesParamDeserializerGson())
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(KakaoSdkUserApiModule(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
