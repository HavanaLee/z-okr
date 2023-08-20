import { InjectionKey } from 'vue'

export type Source = 'target' | 'indicator'
/**
 * @param tidx target index
 * @param source target or indicator
 * @param idx indicator index
 */
type DialogType = (tidx: number, source: Source, idx?: number) => void
export const dialogInjectionKey: InjectionKey<DialogType> = Symbol('dialogInjectionKey')

export const IsDelete: InjectionKey<() => boolean> = Symbol('IsDelete')
export const UpdateDelFlag: InjectionKey<() => void> = Symbol('UpdateDelFlag')
