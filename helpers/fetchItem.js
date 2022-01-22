const fetchItem = async (item) => {
  try {
    const getItem = await fetch(`https://api.mercadolibre.com/items/${item}`);
    const selected = await getItem.json();
    return selected;
  } catch (error) {
    console.log(`Requested product fail: ${error.message}`);
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
