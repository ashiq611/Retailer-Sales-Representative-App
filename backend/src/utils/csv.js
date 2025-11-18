import { parse } from "csv-parse";

export const parseCsvBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const records = [];
    const parser = parse({
      columns: true,
      trim: true,
      skipEmptyLines: true,
    });

    parser.on("readable", () => {
      let record;
      while ((record = parser.read()) !== null) {
        records.push(record);
      }
    });

    parser.on("error", (err) => reject(err));
    parser.on("end", () => resolve(records));

    parser.write(buffer);
    parser.end();
  });
};
