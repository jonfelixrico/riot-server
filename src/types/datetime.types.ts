type SingleDigit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type UtcOffset =
  | `+${SingleDigit}${SingleDigit}:${SingleDigit}${SingleDigit}`
  | `+${SingleDigit}${SingleDigit}`
  | `+${SingleDigit}`
  | `-${SingleDigit}${SingleDigit}:${SingleDigit}${SingleDigit}`
  | `-${SingleDigit}${SingleDigit}`
  | `-${SingleDigit}`
