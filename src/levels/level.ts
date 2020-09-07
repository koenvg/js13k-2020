import { TileEngine } from 'kontra'

export interface Level {
  render(): void
  tileEngine: TileEngine
}
