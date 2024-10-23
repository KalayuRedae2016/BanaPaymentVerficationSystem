<template>
    <div>
      <button @click="showSuccessModal">Show Success Modal</button>
      <button @click="showErrorModal">Show Error Modal</button>
  
      <Modal
        :is-visible="isModalOpen"
        :type="modalType"
        :header="modalHeader"
        :body="modalBody"
        :action-label="modalActionLabel"
        @close="closeModal"
      />
    </div>
  </template>
  
  <script>
  import Modal from './modal.vue';
  
  export default {
    components: {
      Modal
    },
    data() {
      return {
        isModalOpen: false,
        modalType: 'success',
        modalHeader: '',
        modalBody: '',
        modalActionLabel: 'OK'
      };
    },
    methods: {
      showSuccessModal() {
        this.modalType = 'success';
        this.modalHeader = 'Success!';
        this.modalBody = 'Company Profile Edited successfully';
        this.modalActionLabel = 'OK';
        this.isModalOpen = true;
      },
      showErrorModal() {
        this.modalType = 'error';
        this.modalHeader = 'Error!';
        this.modalBody = 'An error occurred while editing company profile.';
        this.modalActionLabel = 'Close';
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      }
    }
  };
  </script>
  