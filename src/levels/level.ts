import { TileEngine } from 'kontra'

export interface Level {
  render(): void
  update(): void
  tileEngine: TileEngine
}
