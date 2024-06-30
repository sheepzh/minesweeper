import storage, { KEY_PREFIX } from "./storage"

const KEY = KEY_PREFIX + "option"

export async function getOption(): Promise<ms.Option> {
    return storage.get(KEY)
}

export async function saveOption(newVal: ms.Option) {
    const exist = await getOption()
    const newOption = { ...exist || {}, ...newVal || {} }
    await storage.put(KEY, newOption)
}