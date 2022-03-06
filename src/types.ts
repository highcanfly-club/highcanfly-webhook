import { SanityDocumentStub } from '@sanity/client'

export type AlgoliaRecord = Readonly<Record<string, any>>

export interface SerializeFunction {
  (document: SanityDocumentStub): AlgoliaRecord
}

export interface VisiblityFunction {
  (document: SanityDocumentStub): boolean
}

export type WebhookBody = {
  _id?: string,
  ids?: {
    created: string[]
    updated: string[]
    deleted: string[]
  }
}
