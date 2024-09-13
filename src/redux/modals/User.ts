interface User {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile: string;
  role: string;
  uuid: string;
  verified: boolean;
}

interface CreateUser {
  first_name: string;
  last_name: string;
  password: string;
  confirm_password: string;
  email: string;
  phone_number: string;
  country: string;
}

interface LoginUser {
  email: string;
  password: string;
}

interface UpdateUser {
  first_name: string;
  last_name: string;
  phone_number: string;
  country: string;
}
interface ChangePassword {
  current_password: string;
  password: string;
  confirm_password: string;
}

interface ReestPassword {
  email: string;
  password: string;
  confirm_password: string;
}

export type {
  User,
  CreateUser,
  LoginUser,
  UpdateUser,
  ChangePassword,
  ReestPassword,
};
