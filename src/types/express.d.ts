import { IUser } from "../interfaces/common.interfaces";

declare global{
    namespace Express{
        interface Request{
            user?:IUser;
        }
    }
}