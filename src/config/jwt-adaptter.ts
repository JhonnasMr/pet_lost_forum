import { envs } from "./envs";
import jtw from "jsonwebtoken";


export class JWTadaptter {

    static async generateToken(payload: any, duration: string = '3h'): Promise<any> {
        return new Promise(resolve => {
            jtw.sign(payload, envs.JWT_KEY, { expiresIn: duration }, (err, token) => {
                if (err) {
                    resolve(null);
                }
                resolve(token);
            })
        })
    }

    static async validateToken(token: string) {
        return new Promise((resolve) => {
            jtw.verify(token, envs.JWT_KEY, (err, decoded) => {
                if (err) {
                    resolve(null);
                }
                resolve(decoded);
            })
        })
    }

}