Page({
  data: {
    components: [
      {
        name: 'button',
        path: 'pages/button/index',
      },
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
        name: 'tabs',
        path: 'pages/tabs/index',
      },
      {
        name: 'sidebar',
        path: 'pages/sidebar/index',
      },
      {
        name: 'label',
        path: 'pages/label/index',
      },
      {
        name: 'textfield',
        path: 'pages/textfield/index',
      },
    ],
  },
  onNavigate(e) {
    my.navigateTo({ url: e.target.dataset.item.path });
  },
});
