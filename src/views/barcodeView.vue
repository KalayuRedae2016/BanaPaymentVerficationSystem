<template>
    <div class="flex justify-center items-center h-screen">
      <div class="flex flex-col items-center">
        <canvas id="qrcodeCanvas" class="mb-4"></canvas>
        <button @click="generateQRCode" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Generate QR Code
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import QRCode from 'qrcode';
  
  export default {
    data() {
      return {
        userId: 'bana0501tadie',
        userName: 'Tadesse Gebremicheal Berhe',
        canvasId: 'qrcodeCanvas'
      };
    },
    methods: {
      generateQRCode() {
        const qrData = `User ID: ${this.userId}, User Name: ${this.userName}`;
        
        // Get the canvas element
        const canvas = document.getElementById(this.canvasId);
  
        // Ensure the canvas element is available
        if (canvas) {
          QRCode.toCanvas(canvas, qrData, { errorCorrectionLevel: 'H' }, (error) => {
            if (error) {
              console.error('Error generating QR code:', error);
            } else {
              console.log('QR code generated successfully.');
            }
          });
        } else {
          console.error('Canvas element not found.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  #qrcodeCanvas {
    width: 200px; /* Adjust as needed */
    height: 200px; /* Adjust as needed */
  }
  </style>
  