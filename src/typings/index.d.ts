/**
 * Null or whatever
 */
export type Nullable<T> = T | null | undefined

export type Recordable<T = any> = Record<string, T>

export type TargetContext = '_blank' | '_parent' | '_self' | '_top'

export type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
