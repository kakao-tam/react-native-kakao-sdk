package com.kakaotam.rnsdk.share.gson

import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.kakaotam.rnkakaosdkcommon.gson.GsonUtils
import com.kakaotam.rnsdk.share.model.ShareDefaultParam
import java.lang.reflect.Type

class ShareDefaultParamDeserializerGson : JsonDeserializer<ShareDefaultParam> {
    override fun deserialize(
        json: JsonElement?, typeOfT: Type?, context: JsonDeserializationContext?
    ): ShareDefaultParam {
        val jsonObject = json!!.asJsonObject
        val param = ShareDefaultParam()
        param.templatable = GsonUtils.asTemplate(jsonObject, "templatable")
        param.serverCallbackArgs = GsonUtils.asMap(jsonObject, "serverCallbackArgs")
        return param
    }
}
