require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {

  it('Verifica se fetchProducts é uma função', () => {
    expect(fetchProducts).toBeInstanceOf(Function)
    })
    
  it('Verifica se fetchProducts(´computador´) utiliza corretamente o endpoint', ()=> {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  })

  it('Verifica se o retorno de fetchProducts(´computador´) é igual ao objeto computadorSearch,', async () => {
    const actualSearch = await fetchProducts('computador')
    expect(actualSearch).toEqual(computadorSearch)
  })
    
  it('Teste se sem argumento retorna o erro', async ()=>{
    const expectedError = await fetchProducts();
    expect(expectedError).toEqual(new Error('You must provide an url'))
  });
});
