import * as React from 'react'

export const ProfileStatus = (props: any) => {
  return (
    <div>
      <div>
        <span>{props.status}</span>
      </div>
      <div>
        <input type="text" value={props.status} />
      </div>
    </div>
  )
}
