/// <reference types="vite/client" />

export type ImportedModules = ReturnType<ImportMeta['globEager']>
export type Entry<T> = { [K in keyof T]: [K, T[K]] }[keyof T]
