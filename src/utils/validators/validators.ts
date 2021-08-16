export const isRequired = (value: string) => (value ? undefined : 'Поле является обязательным')

export const maxLength = (max: number) => (value: string) => {
  if (value && value.length > max) {
    return `Максимум ${max} символов`
  } else {
    return undefined
  }
}
