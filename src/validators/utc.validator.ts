import { registerDecorator, ValidationOptions } from 'class-validator'
import { FixedOffsetZone } from 'luxon'

const UTC_REGEXP = /^(?:[+-]\d\d:\d\d)|(?:[+-]\d)$/

export function IsUtc(property: string, validationOptions?: ValidationOptions) {
  return function (object: Record<string, unknown>, propertyName: string) {
    registerDecorator({
      name: 'isUtc',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (typeof value !== 'string' || !UTC_REGEXP.test(value)) {
            return false
          }

          return FixedOffsetZone.parseSpecifier(`UTC${value}`)?.isValid
        },
      },
    })
  }
}
