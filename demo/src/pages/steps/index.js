Page({
  data: {
    activeIndex: 2,
    failIndex: 1,
    size: 0,
    items: [
      {
        title: 'step 1',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley. It was popularised in the 1960s with the release of Letraset PgeMaker including versions of Lorem Ipsum.",
      },
      {
        description: 'description',
      },
      {
        title: 'step 3',
        description: 'description',
      },
      {
        title: 'step 4',
      },

      {
        title: 'step 5',
        description: 'description',
      },
    ],

    showNumberSteps: true,
  },
  onTapStep(e) {
    my.alert({ content: 'you tapped step ' + e.target.dataset.step });
  },
  nextStep() {
    this.setData({
      activeIndex: Math.min(this.data.activeIndex + 1, this.data.items.length - 1),
    });
  },
  preStep() {
    this.setData({
      activeIndex: Math.max(0, this.data.activeIndex - 1),
    });
  },
  setFailIndex() {
    this.setData({
      failIndex: this.data.activeIndex,
    });
  },
  cancelFailIndex() {
    this.setData({
      failIndex: null,
    });
  },
  setIconSizeAdd() {
    this.setData({
      size: this.data.size < 30 && this.data.size > 14 ? this.data.size + 1 : 15,
    });
  },
  setIconSizeReduce() {
    this.setData({
      size: this.data.size > 15 ? this.data.size - 1 : 15,
    });
  },
  showNumberList() {
    this.setData({
      showNumberSteps: !this.data.showNumberSteps,
    });
  },
});
