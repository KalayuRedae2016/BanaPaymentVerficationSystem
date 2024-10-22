<template>
    <div>
      <button @click="exportExcel" class="k-button">Export Excel</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [
          { ProductID: 1, ProductName: 'Product A' },
          { ProductID: 2, ProductName: 'Product B' },
          { ProductID: 3, ProductName: 'Product C' },
          { ProductID: 4, ProductName: 'Product D' },
          { ProductID: 5, ProductName: 'Product E' }
        ]
      };
    },
    methods: {
      exportExcel() {
        // Create a new workbook
        const workbook = {
          SheetNames: ['Products'],
          Sheets: {
            'Products': this.generateSheetData()
          }
        };
  
        // Convert the workbook to a data URL
        const dataURL = this.workbookToDataURL(workbook);
  
        // Initiate the file download
        this.downloadFile(dataURL, 'products.xlsx');
      },
      generateSheetData() {
        // Generate the sheet data from the products array
        const sheetData = [['Product ID', 'Product Name']];
        this.products.forEach(product => {
          sheetData.push([product.ProductID, product.ProductName]);
        });
        return sheetData;
      },
      workbookToDataURL(workbook) {
        // Convert the workbook to a binary string
        const workbookBinary = this.json2xlsx(workbook);
  
        // Convert the binary string to a data URL
        return `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${btoa(workbookBinary)}`;
      },
      json2xlsx(workbook) {
        // Implement a function to convert a JavaScript object to an XLSX binary string
        // This is a simplified implementation, you may need to use a library like js-xlsx for a more robust solution
        let binary = '';
        const sheets = workbook.Sheets;
        for (const sheet in sheets) {
          if (sheets.hasOwnProperty(sheet)) {
            const data = sheets[sheet];
            for (let i = 0; i < data.length; i++) {
              let row = '';
              for (let j = 0; j < data[i].length; j++) {
                row += data[i][j] + ',';
              }
              binary += row + '\n';
            }
          }
        }
        return binary;
      },
      downloadFile(dataURL, fileName) {
        // Create a temporary link element and initiate the file download
        const link = document.createElement('a');
        link.href = dataURL;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };
  </script>