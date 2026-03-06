export type Deck = {
  id: number
  name: string
}
export type Config = {
  theme : string
}

export type Card = {
  id: number
  deck_id: number
  front: string
  back?: string
}
