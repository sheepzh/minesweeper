import { addIconClickListener } from "../chrome/action"
import { getUrl } from "../chrome/runtime"
import { createTabAfterCurrent, jumpToTab, queryTabs } from "../chrome/tab"
import { GAME_URL } from "../constant/url"

addIconClickListener(async () => {
    const tabs = await queryTabs({ currentWindow: true })
    const url = getUrl(GAME_URL)
    const exist = tabs?.find(t => t?.url?.startsWith(url))
    if (exist) {
        await jumpToTab(exist.id)
    } else {
        await createTabAfterCurrent(url)
    }
})