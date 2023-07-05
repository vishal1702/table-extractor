import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// export const downloadExcelFile = (byteArray, fileName) => {
//   const data = new Uint8Array(byteArray);
//   const workbook = XLSX.read(data, { type: 'array' });
//   const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

//   const fileData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//   saveAs(fileData, fileName);
// };


export const downloadExcelFile = (base64Data, fileName) => { 
    const workbook = XLSX.read(base64Data, { type: 'base64' });
    const xlsxData = XLSX.write(workbook, { type: 'binary' });
    const buffer = new ArrayBuffer(xlsxData.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < xlsxData.length; i++) {
      view[i] = xlsxData.charCodeAt(i) & 0xff;
    }
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const saveFile = `${fileName}.xlsx`;
    saveAs(blob, saveFile);
};