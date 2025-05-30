export interface Driver {
  name: string;
  license: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  photo: string;

  [key: string]: string;
}
