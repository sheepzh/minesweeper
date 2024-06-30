import resource from "./game-resource.json"

export type GameMessage = {
    level: { [l in ms.Level]: string }
}

const _default: ms.Messages<GameMessage> = resource

export default _default