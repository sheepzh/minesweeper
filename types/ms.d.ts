declare namespace ms {
    type Level = 'beginner' | 'intermediate' | 'expert'
    type Option = {
        level: Level
    }
    declare module game {
        type Setting = {
            width: number
            height: number
            count: number
        }
    }
}