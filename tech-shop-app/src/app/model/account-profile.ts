export class AccountProfileResponse {
    username: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: Date;
    email: string;
    phoneNumber: string;
}

export class AccountProfileUpdateRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  confirmPassword: string;
}
