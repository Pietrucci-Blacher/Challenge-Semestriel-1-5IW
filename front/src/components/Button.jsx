import React from 'react'

export default function Button({label = "", onClick = () => { }}) {
  return (
    <div>
      <button onClick={onClick}>{label}</button>
    </div>
  )
}
