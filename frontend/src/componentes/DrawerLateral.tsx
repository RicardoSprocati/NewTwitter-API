import { type ReactNode, useEffect } from "react"
import { Overlay, Painel, BotaoFechar } from "./DrawerLateral.estilo"

type Props = {
    aberto: boolean
    onClose: () => void
    titulo?: string
    children: ReactNode
}

export default function DrawerLateral({ aberto, onClose, titulo = "Menu", children }: Props) {

    useEffect(() => {
        if (!aberto) return
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [aberto, onClose])

    if (!aberto) return null
    return (
        <>
            <Overlay onClick={onClose} role="button" aria-label="Fechar menu" />
            <Painel aria-modal="true" role="dialog" aria-label={titulo}>
                <header>
                    <h3 style={{ margin: 0 }}>{titulo}</h3>
                    <BotaoFechar onClick={onClose} aria-label="Fechar">×</BotaoFechar>
                </header>
                {children}
            </Painel>
        </>
    )
}
