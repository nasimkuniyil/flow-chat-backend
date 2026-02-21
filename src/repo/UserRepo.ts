import {IUserRepo} from "../interfaces/repo.types";
import { IUser } from "../interfaces/model.types";
import BaseRepo from "./BaseRepo";
import User from "../models/User";

export default class UserRepo extends BaseRepo<IUser> implements IUserRepo{
    constructor(){
        super(User);
    }
}