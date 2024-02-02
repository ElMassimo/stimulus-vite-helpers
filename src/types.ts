/// <reference types="vite/client" />

export type ImportedModules = ReturnType<ImportMeta['glob']>
export type Entry<T> = { [K in keyof T]: [K, T[K]] }[keyof T]
