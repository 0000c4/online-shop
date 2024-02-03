import {makeAutoObservable} from "mobx"
import { check, login, registration } from "../http/userAPI";
 class UserStore {
    isAuth = false;
    user = {age: 1488};

    constructor(){

        makeAutoObservable(this);
    }
    setIsAuth(bool){
        this.isAuth = bool
    }
    setUser(user){
        this.user = user
    }

    async registration(email, password){
        try {
            const user = await registration(email, password);
            this.setUser(user);
            this.setIsAuth(true);
        } catch (error) {
            alert(error.response.data.message)
        }

    }
    async login(email, password){
        try {
            const user = await login(email, password);
            this.setUser(user);
            this.setIsAuth(true);
            return user;
        } catch (error) {
            alert(error.response.data.message)
        }

    }

    async logout(){
        try {
            this.setUser({});
            this.setIsAuth(false);
            localStorage.removeItem('token')
        } catch (error) {
            alert(error.response.data.message)
        }

    }

    async check(){
        try {
            const user = await check();
            this.setUser(user);
            this.setIsAuth(true);
            return user;
        } catch (error) {
        }

    }
}

export default new UserStore();