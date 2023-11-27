import React from 'react'
import { Button as FlowbiteButton} from 'flowbite-react';

export default function GenericButton({label = "", onClick = () => {}, ...props}) {
  return (
      <FlowbiteButton onClick={onClick} type="submit" 
      className="w-full rounded-lg border-gray-200 p-2 pe-8 text-sm shadow-sm text-white">{label}</FlowbiteButton>
  )
}
