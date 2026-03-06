import { useState, useEffect } from "react"
import "./Decks.css"
import { add_deck } from "../Services/setter"
import { get_decks } from "../Services/getter"
import { create_window } from "../Services/tauri-window/window"
import { Plus, CreditCard } from "lucide-react"
import { Deck } from "../Services/types"
import { AddCardPopup } from "../AddCardPopup/AddCardPopup"


export const Decks = () => {

  const [decks, setDecks] = useState<Deck[]>([])
  const [popupDeck, setPopupDeck] = useState<number | null>(null)

  const loadDecks = async () => {
    const result = await get_decks()
    setDecks(result)
  }

  const addDeck = async () => {
    const name = prompt("Deck name")
    if (!name) return

    await add_deck(name)
    loadDecks()
  }

  const openDeck = async (id: number) => {
    const label = `deck-${id}`
    await create_window(label, `/#/decks/${id}`, "Deck Cards")
  }

  useEffect(() => {
    loadDecks()
  }, [])

  return (

    <div className="decks-page">

      <div className="page-header">
        <h1>Decks</h1>

        <button className="add-deck-btn" onClick={addDeck}>
          <Plus size={16}/> 
          <span>New Deck</span>
        </button>
      </div>

      <div className="deck-list">

        {decks.map(deck => (

          <div key={deck.id} className="deck-card">

            <h3>{deck.name}</h3>

            <div className="deck-actions">

              <button
                className="open-btn"
                onClick={() => openDeck(deck.id)}
              >
                Open
              </button>

              <button
                className="add-card-btn"
                onClick={() => setPopupDeck(deck.id)}
              >
                <CreditCard size={14}/>
                Add Card
              </button>

            </div>

          </div>

        ))}

      </div>

      {popupDeck !== null && (
        <AddCardPopup
          deckId={popupDeck}
          onClose={() => setPopupDeck(null)}
          onAdded={loadDecks}
        />
      )}

    </div>
  )
}