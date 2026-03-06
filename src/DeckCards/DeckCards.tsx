import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { get_cards } from "../Services/getter"
import { close_current_window } from "../Services/tauri-window/window"
import { Card } from "../Services/types"
import { del_card } from "../Services/setter"
import { AddCardPopup } from "../AddCardPopup/AddCardPopup"
import { Plus, Pencil, Trash2, X } from "lucide-react"

import "./DeckCards.css"

export const DeckCards = () => {

  const { id } = useParams<{ id: string }>()
  const [cards, setCards] = useState<Card[]>([])
  const [addPopup, setAddPopup] = useState(false)
  const [editCard, setEditCard] = useState<Card | null>(null)

  const loadCards = async () => {
    if (!id) return
    const result = await get_cards(Number(id))
    setCards(result)
  }

  const deleteCard = async (cardId: number) => {

    if (!confirm("Delete this card?")) return

    await del_card(cardId)
    loadCards()
  }

  const close_window = async () => {
    await close_current_window()
  }

  useEffect(() => {
    loadCards()
  }, [id])

  return (

    <div className="deckcards-page">

      <div className="deckcards-header">

        <h1>Deck {id}</h1>

        <div className="header-actions">

          <button
            className="add-card-btn"
            onClick={() => setAddPopup(true)}
          >
            <Plus size={15} />
            Add Card
          </button>

          <button
            className="close-btn"
            onClick={close_window}
          >
            <X size={15} />
          </button>

        </div>

      </div>

      <div className="card-list">

        {cards.map(card => (

          <div key={card.id} className="card-row">

            <div className="card-content">

              <div className="card-front">
                {card.front}
              </div>

              <div className="card-back">
                {card.back}
              </div>

            </div>

            <div className="card-actions">

              <button
                className="edit-btn"
                onClick={() => setEditCard(card)}
              >
                <Pencil size={14} />
              </button>

              <button
                className="delete-btn"
                onClick={() => card.id !== undefined && deleteCard(card.id)}
              >
                <Trash2 size={14} />
              </button>

            </div>

          </div>

        ))}

      </div>

      {addPopup && id && (
        <AddCardPopup
          deckId={Number(id)}
          onClose={() => setAddPopup(false)}
          onAdded={loadCards}
        />
      )}

      {/* {editCard && (
        <EditCardPopup
          card={editCard}
          onClose={() => setEditCard(null)}
          onUpdated={loadCards}
        />
      )} */}

    </div>
  )
}