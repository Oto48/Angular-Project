export interface Company {
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
}

export interface ParsedUser extends User {
  firstName: string;
  lastName: string;
}
