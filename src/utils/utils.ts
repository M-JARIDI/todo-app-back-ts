import fs from "fs";

export default function jsonReader(pathFile: string, cb: Function) {
  fs.readFile(pathFile, "utf-8", (err, data) => {
    if (err) return cb && cb(err);
    try {
      const object = JSON.parse(data);
      return cb(null, object);
    } catch (error) {
      return cb && cb(error);
    }
  });
}
