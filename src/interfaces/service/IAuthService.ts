import { IUser } from "../common.interfaces"

export interface IAuthService{
    register(data:Partial<IUser>):Promise<IUser>
    login(email:string, password:string):Promise<{ user: Partial<IUser>; token: string }>
    logout(id:string):Promise<void>
}