export type Dig<T, U extends keyof T> = Pick<T, U>[U];
