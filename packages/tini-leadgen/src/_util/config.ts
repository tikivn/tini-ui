export type Option = {
  icon: string;
  title: string;
  description: string;
  required: boolean;
  fields: string[];
  text: string;
};

export const EKYCOptions: Option = {
  icon: 'https://salt.tikicdn.com/ts/tiniapp/07/62/86/11e0d63eb05631f4c7d4f6e43f7b86ff.png',
  title: 'Thông tin cá nhân',
  description: 'Đây là thông tin bắt buộc',
  required: true,
  fields: ['full_name', 'dob', 'gender', 'id_card'],
  text: '',
};

export const AccountOptions: Option = {
  icon: 'https://salt.tikicdn.com/ts/tiniapp/c4/85/05/1987f03146cb38d344e52b947f8a3f42.png',
  title: 'Thông tin tài khoản',
  description: 'Đây là thông tin bắt buộc',
  required: true,
  fields: ['email', 'phone'],
  text: '',
};
