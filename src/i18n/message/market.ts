import resource from './market-resource.json'

export type MarketMessage = {
    name: string
    marketName: string
    description: string
}

const _default: Required<ms.Messages<MarketMessage>> = resource

export default _default