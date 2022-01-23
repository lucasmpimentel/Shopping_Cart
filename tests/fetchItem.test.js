require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  
  it('Verifica se fetchItem é uma função', () => {
    expect(fetchItem).toBeInstanceOf(Function);
  })

  it('Verifica se a fetchItem ao receber MLB1615760527 como parametro executa o fetch corretamente', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })

  it('Verifica se ao chamar fetchItem com o argumento MLB1615760527, a função fetch utiliza o endpoint https://api.mercadolibre.com/items/MLB1615760527', async () => {
    const expected = await fetchItem('MLB1615760527');
    const received = await fetch('https://api.mercadolibre.com/items/MLB1615760527').then((data) => data.json());
    expect(expected).toEqual(received);
  })

  it('Verifica se o retorno de fetchItem com o argumento MLB1615760527 é um objeto igual ao `item`', async () => {
    const expected = await fetchItem('MLB1615760527');
    expect(expected).toEqual(item);
  })

  it('Verifica se ao chamar fetchItem sem argumento a função retorna um erro com a mensagem: You must provide an url', async () => {
    const expected = await fetchItem();
    expect(expected).toEqual(Error('You must provide an url'));
  })
});
