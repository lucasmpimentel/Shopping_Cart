const fetchProducts = async (input) => {
  try {  
    const search = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${input}`);
    const data = await search.json();
    return data;
  } catch (error) {
    console.log(`Products request fail: ${error.message}`);
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
