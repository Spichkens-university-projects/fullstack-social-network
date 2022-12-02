import { JwtPayloadType } from './jwt-payload.type'

export interface LoginResponseType {
	user: JwtPayloadType
	accessToken: string
	refreshToken: string
}
