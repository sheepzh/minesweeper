import resource from "./setting-resource.json"

export type SettingMessage = {
    title: string
    label: {
        language: string
        resolution: string
    }
    resolution: {
        low: string
        high: string
    }
}

const _default: ms.Messages<SettingMessage> = resource

export default _default