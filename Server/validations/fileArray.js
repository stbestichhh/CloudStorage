const validateFileArray = (files) => !files || !Array.isArray(files) || files.length === 0;
export default validateFileArray;
