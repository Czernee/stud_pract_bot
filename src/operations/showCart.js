function showCart(data) {
    return data?.products?.map((product) => {
      return `\n🔹${product.title} - ${product.price}₽`;
    }).join('')
  }

module.exports = showCart