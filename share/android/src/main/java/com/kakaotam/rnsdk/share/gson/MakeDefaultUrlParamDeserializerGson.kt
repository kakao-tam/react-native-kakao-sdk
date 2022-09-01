package com.kakaotam.rnsdk.share.gson

import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.kakaotam.rnkakaosdkcommon.gson.GsonUtils
import com.kakaotam.rnsdk.share.model.MakeDefaultUrlParam
import java.lang.reflect.Type

class MakeDefaultUrlParamDeserializerGson : JsonDeserializer<MakeDefaultUrlParam> {
    override fun deserialize(
        json: JsonElement?, typeOfT: Type?, context: JsonDeserializationContext?
    ): MakeDefaultUrlParam {
        val jsonObject = json!!.asJsonObject
        val param = MakeDefaultUrlParam()
        param.templatable = GsonUtils.asTemplate(jsonObject, "templatable")
        param.serverCallbackArgs = GsonUtils.asMap(jsonObject, "serverCallbackArgs")
        return param
    }
}
