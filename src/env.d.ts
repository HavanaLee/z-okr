/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

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
