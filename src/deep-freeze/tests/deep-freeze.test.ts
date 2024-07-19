import { deepFreeze } from '../deep-freeze';
import { MOCK_ORIGINAL_OBJ, MOCK_MODIFIED_OBJ } from './deep-freeze.mocks';


describe('deepFreeze', () => {
  it('should make an object immutable', () => {

    const frozenObj = deepFreeze(MOCK_ORIGINAL_OBJ);

    expect(Object.isFrozen(frozenObj)).toBe(true);
    expect(Object.isFrozen(frozenObj.address)).toBe(true);
    expect(Object.isFrozen(frozenObj.hobbies)).toBe(true);

    expect(() => { (frozenObj as any).name = MOCK_MODIFIED_OBJ.name; }).toThrow();

    expect(() => { (frozenObj.address as any).city = MOCK_MODIFIED_OBJ.address.city; }).toThrow();

    expect(() => { (frozenObj.hobbies as any).push(MOCK_MODIFIED_OBJ.hobbies[0]); }).toThrow(); 

    const objToDeleteProp = frozenObj as any;
    expect(() => { delete objToDeleteProp.address }).toThrow(); 
  });
});
