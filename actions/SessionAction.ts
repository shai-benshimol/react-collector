import { Action } from "./Action";
import { ActionResult } from "./ActionResult";

export class SessionAction implements Action {
    public async add(key: string | number, payload: any): Promise<ActionResult> {
      try {
        sessionStorage.setItem(
          String(key),
          typeof payload === "object" ? JSON.stringify(payload) : payload
        );
        return {
          success: true,
          message: "The object was added to session successfuly"
        };
      } catch (error) {
        return {
          success: false,
          message: error
        };
      }
    }
    public async get<T>(key: string | number): Promise<T> {
      try {
        return await JSON.parse(sessionStorage.getItem(String(key)) || "{}");
      } catch (error) {
        return (await sessionStorage.getItem(String(key))) as any;
      }
    }
    public async remove(key: string | number): Promise<ActionResult> {
      try {
        sessionStorage.removeItem(String(key));
        return {
          success: true,
          message: "The object removed successfuly"
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
        sessionStorage.clear();
        return {
          success: true,
          message: "Session cleared successfuly"
        };
      } catch (error) {
        return {
          success: false,
          message: error
        };
      }
    }
  }