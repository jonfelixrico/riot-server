import { isValidUtc } from '@app/utils/luxon.utils'
import { registerDecorator, ValidationOptions } from 'class-validator'

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
          if (typeof value !== 'string') {
            return false
          }

          return isValidUtc(value)
        },
      },
    })
  }
}
