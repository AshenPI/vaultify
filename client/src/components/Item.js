import React from 'react'

function Item({item}) {
  return (
    <div className='item'>
        <h1>{item.name}</h1>
        <img src={item.image} alt="" height="100" width="100"/>
        <h4>{item.price}</h4>
    </div>
  )
}

export default Item;