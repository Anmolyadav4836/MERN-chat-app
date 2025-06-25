import React from 'react'

export const Button = ({title}) => {
  return (
    <div className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md border border-blue-700 text-sm transition duration-200'>{title}</div>
  )
}
