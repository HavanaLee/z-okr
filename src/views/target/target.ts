export type TargetType = {
  content?: string
  id: string
  score?: number
  indicator: Indicator[]
}

export type Indicator = Omit<TargetType, 'indicator'> & { weight?: string; isFocused: boolean }

