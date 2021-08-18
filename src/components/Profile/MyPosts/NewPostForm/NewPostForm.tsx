import * as React from 'react'
import { reduxForm } from 'redux-form'
import { createField, Textarea } from '../../../common/FormsControls/FormsControls'
import { isRequired, maxLength } from '../../../../utils/validators/validators'

const maxLength40 = maxLength(40)

const NewPostForm = (props: any) => {
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      {createField('text', [maxLength40, isRequired], Textarea)}
      <div>
        <button>Добавить пост</button>
      </div>
    </form>
  )
}

export const NewPostFormRedux = reduxForm({
  form: 'newPost',
})(NewPostForm)
