const store = require('store')

export default function () {
    const loggedIn = !!store.get('loggedIn')

    if (!loggedIn) {
        store.set("useremail", null)
        store.set("fullname", null)
        store.set("useremail", null)
        store.set("sex", null)
        store.set("phone", null)
        store.set("access_token", null)
    }

    return loggedIn
}
