import uniqueRandomArray from 'unique-random-array'
import userAgents from 'top-user-agents'

export const randomUserAgent = uniqueRandomArray<string>(userAgents)
