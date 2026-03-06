import { useState, useEffect } from "react"
import "./Decks.css"
import { add_deck } from "../Services/setter"
import { get_decks } from "../Services/getter"
import { create_window } from "../Services/tauri-window/window"
import { Plus } from "lucide-react"
import { Deck } from "../Services/types"

export const Decks = () => {

  const [decks, setDecks] = useState<Deck[]>([])

  const loadDecks = async () => {
    const result = await get_decks();
    setDecks(result)
  }

  const addDeck = async () => {

    const name = prompt("Deck name")
    if (!name) return

    add_deck(name)
    loadDecks()
  }

  const openDeck = async (id: number) => {

    const label = `deck-${id}`
    await create_window(label,`/#/decks/${id}`,'Deck Cards')

  }
  useEffect(() => {
    loadDecks()
  }, [])

  return (

    <div className="decks-page">

      <div className="page-header">
        <h1>Decks</h1>
        <button className="add_deck" onClick={addDeck}><Plus size={15}/> <span>New Deck</span></button>
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