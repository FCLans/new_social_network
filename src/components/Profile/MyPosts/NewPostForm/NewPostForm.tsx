import * as React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { Textarea } from '../../../common/FormsControls/FormsControls'
import { isRequired, maxLength } from '../../../../utils/validators/validators'

const maxLength40 = maxLength(40)

type FormDataType = {
  text: string
}

const NewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field name="text" validators={[maxLength40, isRequired]} component={Textarea} />
      <div>
        <button>Добавить пост</button>
      </div>
    </form>
  )
}

export const NewPostFormRedux = reduxForm({
  form: 'newPost',
})(NewPostForm)
