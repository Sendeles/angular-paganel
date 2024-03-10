//go to docs > auth rest > sign in with email and pass
export interface IUser {
  email?: string,
  password?: string,
  returnSecureToken: boolean
}

export interface IAuthResponse {
  idToken: string,
  email: string,
  refreshToken:	string,
  expiresIn: string,
  localId: string,
  registered:	boolean
}
