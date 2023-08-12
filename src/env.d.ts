/// <reference types="vite/client" />

declare type TargetType = {
  content?: string
  id: string
  score?: string
  indicator: indicator[]
}

declare type indicator = {
  id: string
  isFocused: boolean
  content?: string
  score?: number
  weigtht?: string
}
