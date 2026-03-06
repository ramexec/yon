import { useState, useEffect } from "react"
import "./Decks.css"
import { add_deck } from "../Services/setter"
import { get_decks } from "../Services/getter"
import { create_window } from "../Services/tauri-window/window"
import { Plus, CreditCard, Trash2 } from "lucide-react"
import { Deck } from "../Services/types"
import { AddCardPopup } from "../AddCardPopup/AddCardPopup"
import { del_deck } from "../Services/setter"

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

  const deleteDeck = async (id:number) => {

    if(!confirm("Delete this deck and all its cards?")) return

    await del_deck(id)
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

          <div key={deck.id} className="deck-row">

            <div className="deck-info">
              <h3>{deck.name}</h3>
            </div>

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
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteDeck(deck.id)}
              >
                <Trash2 size={14}/>
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