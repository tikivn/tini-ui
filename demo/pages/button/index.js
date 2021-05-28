const variants = {
  size: ['small', 'medium', 'large'],
  type: ['solid', 'outline', 'ghost'],
  shape: ['pill', 'rounded', 'circle'],

  skeleton: [false, true],
  loading: [false, true],
  disabled: [false, true],
};
const items = [];
items.push({
  // default
});
items.push({
  loading: 1,
});
items.push({
  loading: 1,
  type: 'outline',
});
variants.size.forEach((size) => {
  variants.disabled.forEach((disabled) => {
    variants.skeleton.forEach((skeleton) => {
      variants.shape.forEach((shape) => {
        variants.loading.forEach((loading) => {
          variants.type.forEach((type) => {
            items.push({
              type,
              shape,
              size,
              skeleton,
              loading,
              disabled,
              active: false,
              hover: false,
              iconName: 'close',
            });
          });
        });
      });
    });
  });
});

Page({
  data: {
    items,
  },
});
