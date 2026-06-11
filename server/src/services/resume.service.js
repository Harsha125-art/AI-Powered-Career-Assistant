import { PdfReader } from "pdfreader";

export const extractResumeText = async (filePath) => {
  return new Promise((resolve, reject) => {
    let text = "";

    new PdfReader().parseFileItems(filePath, (err, item) => {
      if (err) {
        reject(err);
      } else if (!item) {
        // End of file
        resolve(text);
      } else if (item.text) {
        text += item.text + " ";
      }
    });
  });
};