import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { DocumentType } from 'src/document-type/document-type.entity'
import { getRepository } from 'typeorm'

@ValidatorConstraint({ async: true })
export class IsDocumentTypeExistConstraint
  implements ValidatorConstraintInterface
{
  validate(documentTypeId: any) {
    if (typeof documentTypeId !== 'number') return false
    return getRepository(DocumentType)
      .findOne(documentTypeId)
      .then((documentType) => {
        if (!documentType) return false
        return true
      })
  }
}

export function IsDocumentTypeExist(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDocumentTypeExistConstraint,
    })
  }
}
