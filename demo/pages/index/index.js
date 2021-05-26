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
        name: 'input',
        path: 'pages/input/index',
      },
    ],
  },
  onNavigate(e) {
    my.navigateTo({ url: e.target.dataset.item.path });
  },
  onLoad() {
    my.navigateTo({ url: 'pages/input/index' });
  },
});
