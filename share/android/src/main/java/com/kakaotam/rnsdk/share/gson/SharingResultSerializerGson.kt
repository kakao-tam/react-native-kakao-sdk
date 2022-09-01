package com.kakaotam.rnsdk.share.gson

import android.content.Intent
import com.google.gson.*
import com.kakao.sdk.share.model.SharingResult
import com.kakaotam.rnkakaosdkcommon.gson.GsonUtils
import java.lang.reflect.Type

class SharingResultSerializerGson : JsonSerializer<SharingResult?> {
    override fun serialize(src: SharingResult?, typeOfSrc: Type?, context: JsonSerializationContext?): JsonElement {
        src?.let {
            var jsonObject = JsonObject()
            jsonObject.add("argumentMsg", GsonUtils.gson.toJsonTree(it.argumentMsg))
            jsonObject.add("warningMsg", GsonUtils.gson.toJsonTree(it.warningMsg))
            jsonObject.addProperty("url", it.intent.toUri(Intent.URI_INTENT_SCHEME).toString())
            return jsonObject
        }
        return JsonNull.INSTANCE
    }
}
