// Download a text file
export const downloadTxtFile = (downloadText, name) => {
    // Create hidden element on the page
    const element = document.createElement("a");
    // Create text file with the download text
    const file = new Blob([downloadText], {type: 'text/plain'});
    // Create a url of the file for the element
    element.href = URL.createObjectURL(file);
    // Add download of the file name for the element
    element.download = `${name}.txt`;
    // Append the download element to the page. Required for this to work in FireFox
    document.body.appendChild(element);
    // Click the element to download the document
    element.click();
};

// Handle upload for reading files
export const handleFiles = (files, onsuccess) => {
    // Check if the first file is a text file
    if(files[0].type === "text/plain") {
        // Create a file reader
        const reader = new FileReader();
        // On load for file read, call the on success method passed as parameter
        reader.onload = () => {onsuccess(reader.result)};
        // Read first file
        reader.readAsText(files[0]);
    }
};