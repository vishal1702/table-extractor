import React, { useState, useEffect } from "react";
import axios from "axios";
import { downloadExcelFile } from '../services/generic';

// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('loginToken')}`;

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [fileDownloadErrorMessage, setFileDownloadErrorMessage] = useState("");
  const [tableData, setTableData] = useState([]);

  const handleFileChange = (event) => {
    setFileDownloadErrorMessage("");
    const files = event.target.files;
    const allowedTypes = ["application/pdf"];
    const maxFileSize = 10 * 1024 * 1024; // 10MB

    const filesSize = Array.from(files).reduce(
      (acc, file) => acc + file.size,
      0
    );

    // filter files to only keep pdf files and check file size
    const checkFileType = Array.from(files).every((file) =>
      allowedTypes.includes(file.type)
    );

    if (!checkFileType) {
      setErrorMessage("Please upload pdf files only");
      setIsSuccess(false);
      setSelectedFiles([]);
      return;
    } else if (filesSize > maxFileSize) {
      setErrorMessage("Total files size should not be more than 10MB");
      setIsSuccess(false);
      setSelectedFiles([]);
      return;
    } else {
      setSelectedFiles(Array.from(files));
      setIsSuccess(true);
    }
  };

  const handleSubmit = async () => {
    // prepare FormData to send files;
    const formData = new FormData();
    if (selectedFiles.length === 0) {
      setErrorMessage("Please select file to upload");
      setIsSuccess(false);
      setSelectedFiles([]);
      return;
    } else if (selectedFiles.length > 0) {
      setErrorMessage("");
      setSuccessMessage("");
      setIsSuccess(true);
      selectedFiles.map((file) => {
        return formData.append("files", file);
      });
    }

    // Make an API request to upload files
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/document/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setFileDownloadErrorMessage("");
        setSelectedFiles([]);
        setTableData(response.data);
        setErrorMessage("");
        setSuccessMessage("Files have been uploaded");
        setIsSuccess(true);
      } else {
        setSelectedFiles([]);
        setErrorMessage("Unable to upload files. Something went wrong!");
        setSuccessMessage("");
        setIsSuccess(false);
      }
    } catch (error) {
      setSelectedFiles([]);
      setErrorMessage("Unable to upload files. Something went wrong!");
      setIsSuccess(false);
    }
  };

  const handleDownload = async (id, filename) => {
    const documentID = id;
    const fileName = filename.substring(0, filename.indexOf(".pdf"));

    if (documentID) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/document/download/excel?ref_id=${documentID}`,
        );
        console.log(response);
        if (response.status === 200) {
          const byteArray = response.data.fileByte;
          const filename = `${fileName}.xlsx`;
          downloadExcelFile(byteArray, filename);
        } 
        else {
          setFileDownloadErrorMessage("Cannot download the file. No tables found in the file.");
          setIsSuccess(false);
        }
        
      } catch (error) {
        setFileDownloadErrorMessage("Something went wrong. Try again later!");
        setIsSuccess(false);
      }
    }
  };


  return (
    <div className="container">
      <div className="App">
        <input
          id="fileupload"
          type="file"
          multiple
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <button className="btn" onClick={handleSubmit}>
          Upload Files
        </button>
        <span>&nbsp;(pdf not more than 10MB)</span>
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        {successMessage && (
          <div className="successMessage">{successMessage}</div>
        )}
      </div>
      <div className="custom-table">
        {tableData.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.documentId}>
                  <td>{row.filename}</td>
                  <td>
                    {<button onClick={() => handleDownload(row.documentId, row.filename)}>Download</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {fileDownloadErrorMessage && (
        <div className="errorMessage1">{fileDownloadErrorMessage}</div>
      )}
    </div>
  );
};

export default FileUpload;
