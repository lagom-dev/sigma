import { querySelectorAll } from '../extend-query-selector-all';

describe('NodeList.prototype.map', () => {
  beforeAll(() => {
    querySelectorAll()
    document.body.innerHTML = `
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
      <div class="item">Item 3</div>
    `;
  });

  it('should add map method to prototype', () => {
    const items = document.querySelectorAll('.item') as NodeListOf<Element> & NodeList;
    expect(items.map).toBeDefined();
  });

  it('should correctly map items', () => {
    const items = document.querySelectorAll('.item') as NodeListOf<Element> & NodeList;
    const itemTexts = items.map((item) => item.textContent);

    expect(itemTexts).toEqual(['Item 1', 'Item 2', 'Item 3']);
  });

  it('should correctly map items with index', () => {
    const items = document.querySelectorAll('.item') as NodeListOf<Element> & NodeList;
    const itemTextsWithIndices = items.map((item, index) => `${index + 1}: ${item.textContent}`);

    expect(itemTextsWithIndices).toEqual(['1: Item 1', '2: Item 2', '3: Item 3']);
  });

  it('should handle empty NodeList', () => {
    const items = document.querySelectorAll('.non-existent') as NodeListOf<Element> & NodeList;
    const itemTexts = items.map((item) => item.textContent);

    expect(itemTexts).toEqual([]);
  });
});
