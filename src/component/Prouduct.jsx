import React from 'react'

const Prouduct = ({product}) => {
    
  return (
  <div className="grid grid-cols-5 items-center gap-4 p-2 border-b">
  <img
    className="w-20 h-20 object-contain"
    src={product.images[0]}
    alt={product.title}
  />

  <span className="p-2 rounded">
    {product.title}
  </span>

  <span className="font-medium">₹{product.price}</span>

  <span className="text-yellow-500">
    ⭐ {product.rating}
  </span>
  <button className=' cursor-pointer bg-blue-400 rounded-xl p-2'>Buy Now</button>

</div>
  )
}

export default Prouduct