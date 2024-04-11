/* eslint-disable prettier/prettier */
import fs from 'fs';
import modeSetting from '../interfaces/modeSetting';
import numberID from '../interfaces/numberID';

const readFileModeSetting = (filePath: string): modeSetting => {
  const data = fs.readFileSync(filePath, 'utf8');
  const jsonData = JSON.parse(data) as modeSetting;
  return jsonData;
};
const writeFileModeSetting = (filePath: string, updatedData:any) =>{
  fs.writeFileSync(filePath,updatedData,'utf-8');
  return updatedData;
}
const readFileID = (filePath: string): Number => {
  const data = fs.readFileSync(filePath, 'utf8');
  const jsonData = JSON.parse(data) as numberID;
  return jsonData.id;
};

const writeFileID = (filePath: string, id: Number) => {
  const data = {id: id};
  const jsonString = JSON.stringify(data, undefined, 2);
  fs.writeFileSync(filePath, jsonString);
};

export {readFileModeSetting,writeFileModeSetting, readFileID, writeFileID};
