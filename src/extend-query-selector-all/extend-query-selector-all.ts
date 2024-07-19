
  
  export const querySelectorAll = () => {
    if (!('map' in NodeList.prototype)) {
      (NodeList.prototype as NodeList).map = function(
        this,
        callback
      ) {
        const arrayFromNodeList = Array.from(this);
        return arrayFromNodeList.map((value, index) => callback(value, index, this));
      };
    }
  }
  