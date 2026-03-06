import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { get_cards } from "../Services/getter"
import { close_current_window } from "../Services/tauri-window/window"
import { Card } from "../Services/types"


export const DeckCards = () => {

  const { id } = useParams<{ id: string }>()
  const [cards, setCards] = useState<Card[]>([])

  const loadCards = async () => {
    if (!id) return
    const result = await get_cards(Number(id));
    setCards(result)
  }

  const close_window = async () => {
    await close_current_window();
  }

  useEffect(() => {
    loadCards()
  }, [id])

  return (

    <div style={{ padding: 20 }}>

      <h1>Deck {id}</h1>

      <button onClick={close_window}>
        Close Window
      </button>

      <div>

        {cards.map(card => (
          <div
            key={card.id}
            style={{
              border: "1px solid gray",
              padding: 10,
              marginTop: 10
            }}
          >

            <p><b>Front:</b> {card.front}</p>
            <p><b>Back:</b> {card.back}</p>

          </div>
        ))}

      </div>

    </div>
  )
}