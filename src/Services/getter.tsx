import { invoke } from "@tauri-apps/api/core"

export type Deck = {
  id: number
  name: string
}

export type Card = {
  id: number
  deck_id: number
  front: string
  back?: string
}


export const get_decks = async () => {
  return await invoke<Deck[]>("get_decks")
}

export const get_cards = async (id: number) => {
  return await invoke<Card[]>("get_cards", {
    deckId: id
  })
}