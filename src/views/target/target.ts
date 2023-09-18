export type TargetType = {
  content: string
  id: string
  score?: string
  progress?: string
  indicator: Indicator[]
}

export type WeightList = Pick<Indicator, 'id'> & { weight: string; content: string }

export type Indicator = Omit<TargetType, 'indicator'> & { weight: string; isFocused: boolean }
