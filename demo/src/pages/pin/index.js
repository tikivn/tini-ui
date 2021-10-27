Page({
  data: {
    pin: '',
    completedPin: '',
    position: 0,
  },

  onPinChange(pin, position) {
    this.setData({
      pin,
      position,
    });
  },

  onPinComplete(pin) {
    this.setData({
      completedPin: pin,
    });
  },
});
