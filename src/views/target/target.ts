export type TargetType = {
  content?: string
  id: string
  score?: number
  progress?: string
  indicator: Indicator[]
}

export type Indicator = Omit<TargetType, 'indicator'> & { weight?: string; isFocused: boolean }
