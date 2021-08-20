import { reduxForm, Field } from 'redux-form'
import { Input, Textarea } from '../../common/FormsControls/FormsControls'
import * as React from 'react'

const ProfileInfoForm = (props: any) => {
  const { handleSubmit, contacts } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <b>Полное имя:</b>
        <Field name={'fullName'} component={Input} />
      </div>
      <div>
        <b>В поисках работы:</b>
        <Field name={'lookingForAJob'} component={Input} type={'checkbox'} />
      </div>
      <div>
        <b>Описание навыков:</b>
        <Field name={'lookingForAJobDescription'} component={Textarea} />
      </div>
      <div>
        <b>Обо мне:</b>
        <Field name={'aboutMe'} component={Textarea} />
      </div>
      <div>
        <b>Мои контакты:</b>
        {Object.keys(contacts).map((key) => {
          return (
            <div key={key}>
              <b>{key}</b>
              <Field name={'contacts.' + key} component={Input} />
            </div>
          )
        })}
      </div>
      <button>Сохранить</button>
    </form>
  )
}

export const ProfileInfoFormRedux = reduxForm({ form: 'profileForm' })(ProfileInfoForm)
