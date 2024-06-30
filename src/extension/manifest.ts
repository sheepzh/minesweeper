import { version, name, author } from "../../package.json"

const manifest: chrome.runtime.ManifestV3 = {
    version,
    name: '__MSG_marketName__',
    description: "__MSG_description__",
    manifest_version: 3,
    default_locale: 'en',
    author: { email: author?.email },
    icons: {
        16: 'asset/icon.png',
        48: 'asset/icon.png',
        128: 'asset/icon.png',
    },
    action: {
        default_icon: 'asset/icon.png'
    },
    permissions: [
        "tabs",
        "storage",
    ],
    background: {
        service_worker: 'service-worker.js'
    },
}

export default manifest