import React, { Fragment, useState, useEffect } from "react"
import { useLocation, useHistory } from "react-router-dom"

//import { getLoginUserSiteMetadata } from '../datasource/userdata'

const store = require("store")

const saveLoginInfo = async (data) => {
    store.set("useremail", data.useremail)
    store.set("fullname", data.fullname)
    store.set("useremail", data.useremail)
    store.set("sex", data.sex)
    store.set("phone", data.phone)
    store.set("access_token", data.token)
    store.set("usericon", data.usericon)
    store.set("loggedIn", true)
}

const OidcCallback = async (data) => {

    //saveLoginInfo()
    if (data && data.type && data.type === 'success') {

        try {
            //const result = await getLoginUserSiteMetadata(data)
            //await saveLoginInfo(result);
            return true
        }
        catch (error) {
            throw error
        }
    }
    return false;

}

export default OidcCallback 