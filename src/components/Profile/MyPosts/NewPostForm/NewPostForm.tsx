import * as React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Textarea } from '../../../common/FormsControls/FormsControls'
import { isRequired, maxLength } from '../../../../utils/validators/validators'

const maxLength40 = maxLength(40)

const NewPostForm = (props: any) => {
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field component={Textarea} name={'text'} placeholder={'Текст нового поста'} validate={[maxLength40, isRequired]} />
      </div>

      <div>
        <button>Добавить пост</button>
      </div>
    </form>
  )
}

export const NewPostFormRedux = reduxForm({
  form: 'newPost',
})(NewPostForm)
