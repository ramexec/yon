import { useState, useEffect } from "react"
import "./Decks.css"
import { invoke } from "@tauri-apps/api/core"
import { WebviewWindow, getAllWebviewWindows } from "@tauri-apps/api/webviewWindow"

type Deck = {
  id: number
  name: string
}

export const Decks = () => {

  const [decks, setDecks] = useState<Deck[]>([])

  const loadDecks = async () => {
    const result = await invoke<Deck[]>("get_decks")
    setDecks(result)
  }

  const addDeck = async () => {

    const name = prompt("Deck name")
    if (!name) return

    await invoke("add_deck", { name })
    loadDecks()
  }

  const openDeck = async (id: number) => {

  const label = `deck-${id}`

  const windows = await getAllWebviewWindows()

  const existing = windows.find(w => w.label === label)

  if (existing) {
    await existing.setFocus()
    return
  }

  const win = new WebviewWindow(label, {
    url: `/#/decks/${id}`,
    title: "Deck Cards",
    width: 700,
    height: 500
  })

  win.once("tauri://created", () => {
    console.log("Deck window created")
  })

  win.once("tauri://error", (e) => {
    console.error("Window error:", e)
  })
}
  useEffect(() => {
    loadDecks()
  }, [])

  return (

    <div className="decks-page">

      <div className="page-header">
        <h1>Decks</h1>
        <button onClick={addDeck}>+ New Deck</button>
      </div>

      <div className="deck-list">

        {decks.map(deck => (
          <div key={deck.id} className="deck-card">

            <h3>{deck.name}</h3>

            <button onClick={() => openDeck(deck.id)}>
              Open
            </button>

          </div>
        ))}

      </div>

    </div>
  )
}