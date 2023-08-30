import EventEmitter from "events";
import { mkdirSync, readFileSync, readdirSync, rmdir, writeFileSync } from "fs";
interface DataBaseOptions {
  path?: string;
  name?: string;
}
type eventNames = "set" | "delete" | "add" | "subtract" | "deleteAll";
export class DataBase extends EventEmitter {
  private data: any;
  private path: string;
  private dbname: string;
  constructor(options: DataBaseOptions) {
    super();
    this.path = (options?.path ?? ".") + "/";
    this.dbname = (options?.name ?? "database") + ".json";
    this.fileControl();
    this.data = JSON.parse(readFileSync(this.path + this.dbname, "utf-8"));
  }
  private save() {
    this.fileControl();
    writeFileSync(
      `${this.path}${this.dbname}`,
      JSON.stringify(this.data, null, 1),
      "utf-8"
    );
  }
  private pathControl() {
    if (this.path == "./") return;
    let dir = "./";
    for (const dirs of this.path.split("/")) {
      if (!readdirSync(dir).includes(dirs)) {
        if (dirs.trim() === "") break;

        mkdirSync(dir + dirs);
      }

      dir += dirs + "/";
    }
  }
  private fileControl() {
    this.pathControl();
    if (!readdirSync(this.path).includes(this.dbname)) {
      writeFileSync(
        `${this.path}${this.dbname}`,
        JSON.stringify({}, null, 1),
        "utf-8"
      );
      this.data = JSON.parse(readFileSync(this.path + this.dbname, "utf-8"));
    }
  }

  on(eventName: eventNames, listener: (...args: any[]) => void): this {
    return super.on(eventName, listener);
  }
  set(key: string, value: any) {
    this.emit("set", this.data[key], value);
    this.data[key] = value;
    this.save();
  }
  delete(key: string) {
    this.emit("delete", this.data[key]);
    delete this.data[key];
    this.save();
  }
  has(key: string) {
    if (typeof this.data[key] === "undefined") return false;
    if (typeof this.data[key] !== "undefined") return true;
  }
  get(key: string) {
    return this.data[key];
  }
  fetch(key: string) {
    return this.get(key);
  }
  subtract(key: string, value: number) {
    if (!this.has(key)) throw Error(`${key} is undefined`);
    if (typeof this.data[key] !== "number")
      throw TypeError(`${key} is not a number`);
    this.emit("subtract", this.data[key], this.data[key] - value);
    this.data[key] -= value;
    this.save();
  }
  add(key: string, value: number) {
    if (!this.has(key)) throw Error(`${key} is undefined`);
    if (typeof this.data[key] !== "number")
      throw TypeError(`${key} is not a number`);
    this.emit("add", this.data[key], this.data[key] + value);
    this.data[key] += value;
    this.save();
  }
  all(): object {
    return this.data;
  }
  deleteAll() {
    this.emit("deleteAll", this.data);
    this.data = {};
    this.save();
  }
}
