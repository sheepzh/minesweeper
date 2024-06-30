import { getOption, saveOption } from "@api/option"
import { IS_DEV, IS_EXTENSION } from "@util/env"
import { useMount } from "ahooks"
import { createContext, useContext, useEffect, useState } from "react"

const DEFAULT: Required<ms.Option> = {
    level: 'beginner',
    resolution: 1,
    locale: "en",
    forceNf: false,
}

export type OptionContextInfo = {
    option: ms.Option
    setLocale: (locale: ms.Locale) => void
    setResolution: (resolution: number) => void
    setLevel: (level: ms.Level) => void
    visible: boolean
    setVisible: (visible: boolean) => void
    toggleVisible: () => void
}

export const OptionContext = createContext<OptionContextInfo>({
    option: {},
    setLocale: () => { },
    setResolution: () => { },
    setLevel: () => { },
    visible: false,
    setVisible: () => { },
    toggleVisible: () => { },
})

export const useOptionProvider = (): OptionContextInfo => {
    const [option, setOption] = useState<ms.Option>()
    const [visible, setVisible] = useState<boolean>(false)

    useMount(async () => {
        if (!IS_EXTENSION && !IS_DEV) return
        const option = await getOption()
        setOption(option || DEFAULT)
    })

    useEffect(() => {
        saveOption(option)
    }, [option])

    const setLocale = (locale: ms.Locale) => setOption(val => ({ ...val, locale }))
    const setResolution = (resolution: number) => setOption(val => ({ ...val, resolution }))
    const setLevel = (level: ms.Level) => setOption(val => ({ ...val, level }))
    const toggleVisible = () => setVisible(val => !val)

    return {
        option,
        setLocale, setResolution, setLevel,
        visible, setVisible, toggleVisible,
    }
}

export const useOption = () => useContext(OptionContext)

