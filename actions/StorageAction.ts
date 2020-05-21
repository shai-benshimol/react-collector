import { Action } from "./Action";
import { ActionResult } from "./ActionResult";

export class StorageAction implements Action {
    public async add(key: string | number, payload: any): Promise<ActionResult> {
      try {
        localStorage.setItem(
          String(key),
          typeof payload === "object" ? JSON.stringify(payload) : payload
        );
        return {
          success: true,
          message: "The object was added to  storage successfuly"
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
        return await JSON.parse(localStorage.getItem(String(key)) || "{}");
      } catch (error) {
        return (await localStorage.getItem(String(key))) as any;
      }
    }
    public async remove(key: string | number): Promise<ActionResult> {
      try {
        localStorage.removeItem(String(key));
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
        localStorage.clear();
        return {
          success: true,
          message: "Storage cleared successfuly"
        };
      } catch (error) {
        return {
          success: false,
          message: error
        };
      }
    }
  }