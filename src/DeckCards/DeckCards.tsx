import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"
import { getCurrentWindow } from "@tauri-apps/api/window"

type Card = {
  id: number
  deck_id: number
  front: string
  back?: string
}

export const DeckCards = () => {

  const { id } = useParams<{ id: string }>()

  const [cards, setCards] = useState<Card[]>([])

  const loadCards = async () => {

    if (!id) return

    const result = await invoke<Card[]>("get_cards", {
      deckId: Number(id)
    })

    setCards(result)
  }

  const closeWindow = async () => {
    await getCurrentWindow().close()
  }

  useEffect(() => {
    loadCards()
  }, [id])

  return (

    <div style={{ padding: 20 }}>

      <h1>Deck {id}</h1>

      <button onClick={closeWindow}>
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