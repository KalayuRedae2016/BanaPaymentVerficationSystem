<template>
    <div class="container mx-auto p-4" style="margin-top: 100px">
      <h1>This is the recievet also</h1>
      <div class="receipt">
        <h2>Receipt</h2>
        <div class="receipt-details">
          <p><strong>Name:</strong> {{ name }}</p>
          <p><strong>Amount:</strong> {{ amount }}</p>
          <!-- other receipt details -->
        </div>
  
        <button
          @click="printReceipt"
          class="ml-32 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded"
        >
          Print Reciept
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ClientsView",
    data() {
      return {
        name: "John Doe",
        amount: "100.00",
        // other receipt data
      };
    },
    methods: {
      printReceipt() {
        window.print();
      },
    },
  };
  </script>
  
  <style scoped>
  @media print {
    body * {
      visibility: hidden;
    }
  
    .receipt,
    .receipt * {
      visibility: visible;
    }
  
    .receipt {
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
    }
  
    .receipt h2 {
      text-align: center;
    }
  
    .receipt-details {
      margin-top: 20px;
    }
  }
  </style>
  
  <!-- <template>
      <div class="container mx-auto p-4" style="margin-top: 100px;">
        <button @click="generatePDF" style="margin-left:900px;margin-bottom: 15px;;">Print Receipt</button>
        <div class="receipt">
          <h2>Receipt</h2>
          <div class="receipt-details">
            <p><strong>Name:</strong> {{ name }}</p>
            <p><strong>Amount:</strong> {{ amount }}</p>
            <div class="signature-container">
              <canvas ref="signatureCanvas"></canvas>
            </div>
          </div>
        </div>
     
      </div>
    </template>
    
    <script>
    import html2pdf from 'html2pdf.js';
    import SignaturePad from 'signature_pad';
    
    export default {
      name:'NurseView',
      data() {
        return {
  
          name: 'John Doe',
          amount: '100.00',
          signaturePad: null,
        };
      },
      mounted() {
        this.initializeSignaturePad();
      },
      methods: {
        initializeSignaturePad() {
          const canvas = this.$refs.signatureCanvas;
          this.signaturePad = new SignaturePad(canvas);
        },
        generatePDF() {
          const receiptElement = this.$el;
    
          const opt = {
            margin: 10,
            filename: 'receipt.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          };
    
          const signatureDataUrl = this.signaturePad.toDataURL();
          const receiptWithSignature = receiptElement.cloneNode(true);
          const signatureImage = document.createElement('img');
          signatureImage.src = signatureDataUrl;
          receiptWithSignature.querySelector('.signature-container').appendChild(signatureImage);
    
          html2pdf().set(opt).from(receiptWithSignature).save();
        },
      },
    };
    </script>
    
    <style scoped>
    .receipt {
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
    }
    
    .receipt h2 {
      text-align: center;
    }
    
    .receipt-details {
      margin-top: 20px;
      border-top: 1px dashed #ccc;
      padding-top: 10px;
    }
    
    .signature-container {
      width: 100%;
      height: 150px;
      border: 1px solid #ccc;
      margin-top: 20px;
    }
    </style> -->
  