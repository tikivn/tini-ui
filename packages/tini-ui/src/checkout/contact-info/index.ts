export interface IContactInfo {
  title: string;
  fullname: string;
  phone_number: string;
  email: string;
}

export interface ContactInfoProps {
  className?: string;
  data: IContactInfo;
}

Component({
  props: {
    className: '',
    data: {
      title: '',
      fullname: '',
      phone_number: '',
      email: '',
    },
  } as ContactInfoProps,
});
