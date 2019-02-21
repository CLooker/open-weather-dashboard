const compose = (...fns) => initalData =>
  fns.reduceRight((updatedData, fn) => fn(updatedData), initalData);

export default compose;
