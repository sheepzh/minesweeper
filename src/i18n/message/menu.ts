import resource from "./menu-resource.json"

export type MenuMessage = {
    game: {
        label: string
        new: string
        restart: string
    }
    option: {
        label: string
        pref: string
    }
}

const _default: ms.Messages<MenuMessage> = resource

export default _default