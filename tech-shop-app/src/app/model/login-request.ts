export class LoginRequest {
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  username:string;
  password:string;


}
