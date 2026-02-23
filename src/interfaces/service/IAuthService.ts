import { IUser } from "../common.interfaces"

export interface IAuthService {
    register(data: Partial<IUser>): Promise<{ user: Partial<IUser>, token: string }>
    login(data: Partial<IUser>): Promise<{ user: Partial<IUser>; token: string }>
    logout(id: string): Promise<void>
}