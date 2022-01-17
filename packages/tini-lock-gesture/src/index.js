Component({
  data: {
    lastPoint: [],
    pswObj: {},
    touchFlag: false,
    LIMIT: 60, // frame rate
    prev:0,
  },
  props: {
    canvasWidth: 300, // canvas width
    canvasHeight: 150, // canvas height
    canvasId: 'canvasLock',// canvas id
    drawColor: '#ffffff', // circle drawing color
    titleColor: '#000000',
    title: '',
    chooseType : 3, // Grid 3x3
    onFinish: () => { } // Sweepstakes Callback
  },
  async didMount() {
    this.init(); // initialization
    const rect = await new Promise((resolve) => {
      my.createSelectorQuery()
        .select(`#${this.props.canvasId}`)
        .boundingClientRect()
        .exec((res) => resolve(res[0]));
    });
    const { top, right, width } = rect;
    this.top = top;
    this.left = right - width; 
  },
  methods: {
    init() {
      this.setPageData()
      this.pswObj = {}

      this.lastPoint = []
      this.touchFlag = false
      this.ctx = my.createCanvasContext(this.props.canvasId)
      this.createCircle()
    },
   

    createCircle() { // Calculate the coordinates of each point, draw a circle, and evenly distribute the radius according to the size of the canvas
      const n = this.props.chooseType
      let count = 0
      this.r = this.props.canvasWidth / (2 + 4 * n) // Calculate the cricle radius
      const r = this.r
      this.lastPoint = []
      this.arr = [] // Record the position of the 9th grid
      this.restPoint = []
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          count++;
          const obj = {
            x: j * 4 * r + 3 * r,
            y: i * 4 * r + 3 * r,
            index: count
          };
          this.arr.push(obj)
          this.restPoint.push(obj)
        }
      }
      this.ctx.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)

      for (let i = 0; i < this.arr.length; i++) {
        this.drawCle(this.arr[i].x, this.arr[i].y)
      }
      this.ctx.draw(true)
    },

    drawCle(x, y) { // Record the position of the 9th grid
      this.ctx.setStrokeStyle(this.props.drawColor)
      this.ctx.setLineWidth(2)
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true)
      this.ctx.closePath()
      this.ctx.stroke()
    },

    onTouchstart(e) {
      const po = this.getPosition(e);
      
      for (let i = 0; i < this.arr.length; i++) {
        if (Math.abs(po.x - this.arr[i].x) < this.r && Math.abs(po.y - this.arr[i].y) < this.r) {
          this.touchFlag = true;
          this.drawPoint(this.arr[i].x, this.arr[i].y)
          this.lastPoint.push(this.arr[i])
          this.restPoint.splice(i, 1)
          break;
        }
      }

      this.touchFlag && this.ctx.draw(true)
    },

    onTouchmove(e) {
      const now = new Date()
      const duration = now - this.prev
      // Due to the inefficiency of the applet canvas, the frame frequency is greater than 60 and discarded
      if (duration < Math.floor(1000 / this.LIMIT)) return;
      this.prev = now

      if (this.touchFlag) {
        this.update(this.getPosition(e))
      }
    },

    onTouchend(e) {
      if (this.touchFlag) {
        this.touchFlag = false
        this.onFinish(this.lastPoint);

        // 300ms reset, the reset time will affect the lastPoint value and affect the drawline error
        setTimeout(() => {
          this.reset()
        }, 300)
      }
    },

    onTouchcancel(e) {
      this.touchFlag = false
    },

    getPosition(e) { // Get the coordinates of the touch point relative to the canvas
      return {
        x: e.touches[0].pageX - this.left,
        y: e.touches[0].pageY - this.top,
      }
    },

    update(po) { // The core transform method is called when touchmove
      this.ctx.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight)
      for (let i = 0; i < this.arr.length; i++) { // Draw the panel first for each frame
        this.drawCle(this.arr[i].x, this.arr[i].y)
      }

      this.drawPoint(this.lastPoint) // Flower track per frame
      this.drawLine(po, this.lastPoint) // Draw the center of each frame

      for (let i = 0; i < this.restPoint.length; i++) {
        const pt = this.restPoint[i]

        if (Math.abs(po.x - pt.x) < this.r && Math.abs(po.y - pt.y) < this.r) {
          this.drawPoint(pt.x, pt.y)
          this.pickPoints(this.lastPoint[this.lastPoint.length - 1], pt)
          break;
        }
      }
      this.ctx.draw(true)
    },

    drawPoint() { // Initialize the center of the circle
      for (let i = 0; i < this.lastPoint.length; i++) {
        this.ctx.setFillStyle(this.props.drawColor) // Note the use of the set method
        this.ctx.beginPath()
        this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 2, 0, Math.PI * 2, true)
        this.ctx.closePath()
        this.ctx.fill()
      }
    },

    drawLine(po, lastPoint) { // unlock track
      this.ctx.beginPath()
      this.ctx.lineWidth = 3
      this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y)

      for (let i = 1; i < this.lastPoint.length; i++) {
        this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y)
      }
      this.ctx.lineTo(po.x, po.y)
      this.ctx.stroke()
      this.ctx.closePath()
    },

    pickPoints(fromPt, toPt) {
      const lineLength = this.getDis(fromPt, toPt)
      const dir = toPt.index > fromPt.index ? 1 : -1

      const len = this.restPoint.length;
      let i = dir === 1 ? 0 : (len - 1)
      let limit = dir === 1 ? len : -1

      while (i !== limit) {
        const pt = this.restPoint[i]

        if (this.getDis(pt, fromPt) + this.getDis(pt, toPt) === lineLength) {
          this.drawPoint(pt.x, pt.y)
          this.lastPoint.push(pt)
          this.restPoint.splice(i, 1)
          if (limit > 0) {
            i--
            limit--
          }
        }

        i += dir
      }
    },

    // storePass(psw) { // Processing of password and status after touchend
    //   let title, color
    //   if (this.pswObj.step == 1) {
    //     if (this.checkPass(this.pswObj.fpassword, psw)) {
    //       this.pswObj.step = 2;
    //       this.pswObj.spassword = psw;
    //       title = 'Lưu mật khẩu thành công';
    //       color = this.props.drawColor;
    //       this.drawStatusPoint(this.props.drawColor);
    //     } else {
    //       title = 'Mật khẩu không khớp';
    //       color = 'red';
    //       this.drawStatusPoint('red');
    //       delete this.pswObj.step;
    //     }
    //   } else if (this.pswObj.step == 2) {
    //     if (this.checkPass(this.pswObj.spassword, psw)) {
    //       title = 'Đã mở khoá thành công';
    //       this.drawStatusPoint(this.props.drawColor);
    //       this.onFinish();
    //     } else {
    //       title = 'Mở khóa không thành công';
    //       this.drawStatusPoint('red');
    //     }
    //   } else {
    //     this.pswObj.step = 1;
    //     this.pswObj.fpassword = psw;
    //     title = 'Nhập mật khẩu';
    //   }
    //   this.setPageData(title, color)
    // },

    // checkPass(psw1, psw2) { // Detect password
    //   let p1 = ''
    //   let p2 = ''
    //   psw1.forEach(item => {
    //     p1 += item.index + item.index
    //   })
    //   psw2.forEach(item => {
    //     p2 += item.index + item.index
    //   })
    //   return p1 === p2
    // },

    drawStatusPoint(color) { // Initialize the status line
      for (let i = 0; i < this.lastPoint.length; i++) {
        this.ctx.setStrokeStyle(color)
        this.ctx.beginPath()
        this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r, 0, Math.PI * 2, true)
        this.ctx.closePath()
        this.ctx.stroke()
      }

      this.ctx.draw(true)
    },

    updatePassword() {
      this.pswObj = {}
      this.setPageData()
      this.reset()
    },

    setPageData(title = this.props.titleText, color = this.props.titleColor) {
      const { canvasWidth, canvasHeight } = this.props
      this.setData({
        titleText:title,
        titleColor:color,
      })
      if (title == 'Mật khẩu đã được lưu thành công') {
        setTimeout(() => {
          this.$page.setData({
            titleText: 'Bắt đầu mở khóa',
            titleColor:color,
          })
        }, 1000)
      }
    },

    reset() {
      this.createCircle()
    },

    getDis(a, b) {
      return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    },

    onFinish(lastPoint) {
      this.props.onFinish(lastPoint);
    }
  },
})