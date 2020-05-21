import { ActionResult } from "./ActionResult";

export interface Action {
    add(key: string | number, payload: any): Promise<ActionResult>;
    get<T>(key: string | number): Promise<T>;
    remove(key: string | number): Promise<ActionResult>;
    clear(): Promise<ActionResult>;
  }