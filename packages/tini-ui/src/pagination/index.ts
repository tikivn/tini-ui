import fmtUnit from '../_util/fmtUnit';

Component({
  props: {
    onChange: (nextPage: number) => {},
    max: 3,
    currentPage: 1,
    type: 'page',
  },
  data: {
    pages: [],
  },

  didMount() {
    const pages = this.calculatePages(this.props.currentPage);
    this.setData({
      pages,
    });
  },
  deriveDataFromProps(nextProps) {
    this.onPageDidChange(nextProps.currentPage);
  },
  methods: {
    onPageDidChange(nextPage) {
      let pages = [];
      if (this.props.type === 'page') {
        pages = this.calculatePages(nextPage);
      }
      this.setData({
        pages,
      });
    },

    jumpToPage(e) {
      const nextPage = e.target.dataset.page;
      this.props.onChange(nextPage);
    },
    jumpPrev() {
      if (this.props.currentPage === 1) {
        return;
      }
      const nextPage = this.props.currentPage - 1;
      this.props.onChange(nextPage);
    },
    jumpNext() {
      if (this.props.currentPage === this.props.max) {
        return;
      }
      const nextPage = this.props.currentPage + 1;
      this.props.onChange(nextPage);
    },
    calculatePages(currentPage) {
      const max = this.props.max;
      if (max <= 5) {
        const pages = [];
        for (let i = 0; i < max; i++) {
          pages.push({
            label: `${i + 1}`,
            page: i + 1,
          });
        }
        return pages;
      }
      if (currentPage - 1 <= 2) {
        return [
          { label: '1', page: 1 },
          { label: '2', page: 2 },
          { label: '3', page: 3 },
          { label: '...', page: 4 },
          { label: `${max}`, page: max },
        ];
      }
      if (max - currentPage <= 2) {
        return [
          { label: '1', page: 1 },
          { label: '...', page: max - 3 },
          { label: `${max - 2}`, page: max - 2 },
          { label: `${max - 1}`, page: max - 1 },
          { label: `${max}`, page: max },
        ];
      }
      return [
        { label: '1', page: 1 },
        { label: '...', page: currentPage - 2 },
        { label: `${currentPage}`, page: currentPage },
        { label: `...`, page: currentPage + 2 },
        { label: `${max}`, page: max },
      ];
    },
  },
});
