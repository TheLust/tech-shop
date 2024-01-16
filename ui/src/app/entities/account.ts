export class LoginRequest {
  username: string | undefined;
  password: string | undefined;
}

enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other"
}

export class RegisterRequest {
  username: string | undefined;
  password: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  gender: Gender | undefined;
  dateOfBirth: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
}
