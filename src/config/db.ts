import fs from "fs";

export const readDB = () => {
    console.log(`${process.env.PATH_DB}`);
    return JSON.parse(fs.readFileSync(`${process.env.PATH_DB}`).toString())
}

export const writeDB = (data: any) => {
    return fs.writeFileSync(`${process.env.PATH_DB}`, JSON.stringify(data, null, 2));
}