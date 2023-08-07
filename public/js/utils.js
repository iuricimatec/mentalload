    // Function to convert data to CSV format
    function convertToCSV(data) {
        const header = Object.keys(data[0]).join(",") + "\n";
        const rows = data.map(obj => Object.values(obj).join(",")).join("\n");
        return header + rows;
      }
  
      // Function to trigger the download
      function downloadCSV(data, filename) {
        const csvData = convertToCSV(data);
        const blob = new Blob([csvData], { type: "text/csv" });
  
        // Create a download link
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
  
        // Simulate a click on the link to trigger the download
        link.click();
  
        // Clean up
        URL.revokeObjectURL(link.href);
      }
  
      // Sample data (replace this with your actual data)
      const sampleData = [
        { name: "John Doe", age: 30, email: "john@example.com" },
        { name: "Jane Smith", age: 25, email: "jane@example.com" },
        { name: "Bob Johnson", age: 35, email: "bob@example.com" }
      ];
  
      // Event listener for the button click
      const saveButton = document.getElementById("saveButton");
      saveButton.addEventListener("click", function() {
        downloadCSV(sampleData, "data.csv");
      });
  