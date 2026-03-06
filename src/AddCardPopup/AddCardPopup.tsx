import { useState } from "react"
import "./AddCardPopup.css"
import { add_card } from "../Services/setter"
import { Card } from "../Services/types"

interface Props {
  deckId: number
  onClose: () => void
  onAdded?: () => void
}

export const AddCardPopup = ({ deckId, onClose, onAdded }: Props) => {

  const [front, setFront] = useState("")
  const [back, setBack] = useState("")
  const [loading, setLoading] = useState(false)

  const addCard = async () => {
    if (!front.trim() || !back.trim()) return

    setLoading(true)

    try {

      const card: Card = {
        deck_id: deckId,
        front: front,
        back: back
      }

      await add_card(card)

      setFront("")
      setBack("")

      onAdded?.()
      onClose()

    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  return (
    <div className="popup-overlay">
        
      <div className="popup-card">
        
        <h2>Add Card {deckId} asdasdad</h2>

        <div className="field">
          <label>Front</label>
          <textarea
            value={front}
            onChange={(e) => setFront(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Back</label>
          <textarea
            value={back}
            onChange={(e) => setBack(e.target.value)}
          />
        </div>

        <div className="popup-actions">

          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button
            className="add-btn"
            onClick={addCard}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Card"}
          </button>

        </div>

      </div>

    </div>
  )
}