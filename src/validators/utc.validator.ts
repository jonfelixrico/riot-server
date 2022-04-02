import { registerDecorator, ValidationOptions } from 'class-validator'
import { FixedOffsetZone } from 'luxon'

const UTC_REGEXP = /^(?:[+-]\d\d:\d\d)|(?:[+-]\d)$/

export function IsUtc(validationOptions?: ValidationOptions) {
  // We have to use Object; we can't use Record<string, unknown> (recommended) here
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUtc',
      target: object.constructor,
      propertyName: propertyName,
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
