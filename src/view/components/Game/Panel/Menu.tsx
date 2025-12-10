import { classNames } from "@util/style"
import { useLocale } from "@view/useLocale"
import React, { memo, ReactNode, useCallback, useEffect, useRef, useState } from "react"
import { useGameContext } from "../context"
import { useOption } from "@view/useOption"
import "./menu.sass"

type ItemProps = {
    label: string
    checked?: boolean
    shortcut?: string
    onClick?: () => void
}

type GroupProps = {
    label: string
    open: boolean
    children?: ReactNode
    onClick?: () => void
}

type MenuGroup = 'game' | 'help'

const Item = memo((props: ItemProps) => {
    const { label, checked, onClick, shortcut } = props
    return (
        <div className="menu-item" onClick={onClick}>
            <div className={classNames('check-box', checked && 'checked')} />
            <div className="label">{label}</div>
            <span className="shortcut">{shortcut || ''}</span>
        </div>
    )
})

const Separator = () => {
    return <div className="menu-separator" />
}

const Group = memo((props: GroupProps) => {
    const { label, open, children, onClick } = props
    return (
        <div className={classNames('menu-group', open && 'open')}>
            <div className="group-label" onClick={onClick}>
                {label}
            </div>
            <div className="menu-dropdown">
                {children}
            </div>
        </div>
    )
})

const Menu = () => {
    const { t } = useLocale()
    const { reset } = useGameContext()
    const { option, setLevel, setVisible } = useOption()
    const level = option?.level
    const [openMenu, setOpenMenu] = useState<MenuGroup>()
    const container = useRef<HTMLDivElement>()
    const toggleMenu = useCallback((newVal: MenuGroup) => setOpenMenu(newVal === openMenu ? null : newVal), [openMenu])
    useEffect(() => {
        const handleClick = (ev: MouseEvent) => {
            const target = ev.target as HTMLElement
            !container.current?.contains?.(target) && toggleMenu(null)
        }
        window.addEventListener('click', handleClick)
        return () => window.removeEventListener('click', handleClick)
    }, [toggleMenu])
    const closeThen = useCallback(() => {
        setOpenMenu(null)
        return true
    }, [])
    return (
        <div className="menu-container" ref={container}>
            <Group
                label={t(msg => msg.menu.game.label)}
                open={openMenu === 'game'}
                onClick={() => toggleMenu('game')}
            >
                <Item
                    label={t(msg => msg.menu.game.new)}
                    onClick={() => closeThen() && reset()}
                    shortcut="F2"
                />
                <Separator />
                <Item
                    label={t(msg => msg.game.level.beginner)}
                    onClick={() => closeThen() && setLevel?.('beginner')}
                    checked={level === 'beginner'}
                />
                <Item
                    label={t(msg => msg.game.level.intermediate)}
                    onClick={() => closeThen() && setLevel?.('intermediate')}
                    checked={level === 'intermediate'}
                />
                <Item
                    label={t(msg => msg.game.level.expert)}
                    onClick={() => closeThen() && setLevel?.('expert')}
                    checked={level === 'expert'}
                />
            </Group>
            <Group
                label={t(msg => msg.menu.option.label)}
                open={openMenu === 'help'}
                onClick={() => toggleMenu('help')}
            >
                <Item
                    label={t(msg => msg.menu.option.pref)}
                    onClick={() => closeThen() && setVisible?.(true)}
                    shortcut="F5"
                />
            </Group>
        </div>
    )
}

export default memo(Menu)