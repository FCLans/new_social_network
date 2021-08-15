export const isRequired = (value: any) => (value ? undefined : 'Поле является обязательным')

export const maxLength = (max: number) => (value: any) => {
  if (value && value.length > max) {
    return `Максимум ${max} символов`
  } else {
    return undefined
  }
}
