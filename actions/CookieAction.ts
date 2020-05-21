import { Action } from "./Action";
import { ActionResult } from "./ActionResult";

export class CookieAction implements Action {
    public async add(
      key: string | number,
      payload: any,
      expired?: Date
    ): Promise<ActionResult> {
      try {
        let cookie: string =
          key +
          "=" +
          (typeof payload === "object" ? JSON.stringify(payload) : payload) +
          (expired ? ";expires=" + expired : "");
        document.cookie = cookie;
        return {
          success: true,
          message: "The object was added to cookie successfuly"
        };
      } catch (error) {
        return {
          success: false,
          message: error
        };
      }
    }
    public async get<T>(key: string | number): Promise<T> {
      let coockies = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
      let cookie = coockies ? coockies[2] : null;
      try {
        return await JSON.parse(cookie || "");
      } catch (error) {
        return (await cookie) as any;
      }
    }
    public async remove(key: string | number): Promise<ActionResult> {
      try {
        document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        return {
          success: true,
          message: "The object was remove from cookie successfuly"
        };
      } catch (error) {
        return {
          success: false,
          message: error
        };
      }
    }
    public async clear(): Promise<ActionResult> {
      try {
        document.cookie.split(";").forEach(c => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        return {
          success: true,
          message: "Cookies cleared successfuly"
        };
      } catch (error) {
        return {
          success: false,
          message: error
        };
      }
    }
  }