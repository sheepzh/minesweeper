import resource from './locale-resource.json'

export type LocaleMessage = {
    name: string
    rtl?: boolean
}

const _default: ms.Messages<LocaleMessage> = resource

export default _default