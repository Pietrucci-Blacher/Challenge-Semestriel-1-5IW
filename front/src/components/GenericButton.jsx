import React from 'react'
import { Button as FlowbiteButton} from 'flowbite-react';

export default function GenericButton({label = "", onClick = () => {}, ...props}) {
  return (
      <FlowbiteButton onClick={onClick} type="submit">{label}</FlowbiteButton>
  )
}