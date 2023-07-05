import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const downloadExcelFile = (byteArray, fileName) => {
  const data = new Uint8Array(byteArray);
  const workbook = XLSX.read(data, { type: 'array' });
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const fileData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(fileData, fileName);
};
