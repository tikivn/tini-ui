export interface INoteInfo {
  title: string;
  maxlength: number;
  placeholder: string;
}

export interface NoteInfoProps {
  className?: string;
  data: INoteInfo;
}

Component({
  props: {
    className: '',
    data: {
      title: '',
      maxlength: 100,
      placeholder: '',
    },
  } as NoteInfoProps,
});
