package com.kakaotam.rnsdk.share.model

class MakeScrapUrlParam {
    var requestUrl: String = ""
    var templateId: Long? = null
    var templateArgs: Map<String, String>? = null
    var serverCallbackArgs: Map<String, String>? = null
}
