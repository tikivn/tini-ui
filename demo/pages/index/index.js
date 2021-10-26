Page({
  data: {
    components: [
      {
        name: 'avatar',
        path: 'pages/avatar/index',
      },
      {
        name: 'badge',
        path: 'pages/badge/index',
      },
      {
        name: 'list',
        path: 'pages/list/index',
      },
      {
        name: 'modal',
        path: 'pages/modal/index',
      },
      {
        name: 'popup',
        path: 'pages/popup/index',
      },
      {
        name: 'stepper',
        path: 'pages/stepper/index',
      },
      {
        name: 'button',
        path: 'pages/button/index',
      },
      {
        name: 'chip',
        path: 'pages/chip/index',
      },
      {
        name: 'pin',
        path: 'pages/pin/index',
      },
    ],
  },
  onNavigate(e) {
    my.navigateTo({ url: e.target.dataset.item.path });
  },
});
