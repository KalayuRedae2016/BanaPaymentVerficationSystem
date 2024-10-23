<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Receipts</h1>
    <div class="grid grid-cols-1 gap-4">
      <div v-for="receipt in receipts" :key="receipt.id" class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-bold mb-4">Receipt {{ receipt.id }}</h2>
        <div :id="'pdf-' + receipt.id" class="pdf-container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import PDFObject from 'pdfobject';

// Importing PDFs
import receipt1 from '../../../assets/receipt/r.pdf';
import receipt2 from '../../../assets/receipt/r.pdf';
import receipt3 from '../../../assets/receipt/r.pdf';

export default {
  data() {
    return {
      receipts: [
        {
          id: 1,
          pdfUrl: receipt1
        },
        {
          id: 2,
          pdfUrl: receipt2
        },
        {
          id: 3,
          pdfUrl: receipt3
        }
      ]
    };
  },
  mounted() {
    this.receipts.forEach(receipt => {
      PDFObject.embed(receipt.pdfUrl, `#pdf-${receipt.id}`);
    });
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
.pdf-container {
  height: 400px; /* Adjust as needed */
}
</style>
