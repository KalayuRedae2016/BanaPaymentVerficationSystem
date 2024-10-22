<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="text-3xl font-bold">
        <input
          class="border-b border-black focus:outline-none"
          type="text"
          :value="typedText"
          :disabled="isTyping"
        />
        <span class="typing-cursor" v-show="showCursor"></span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        typedText: '',
        textToType: 'Hello, world! This is a typing effect. This is the awsome thing',
        currentIndex: 0,
        showCursor: true,
        isTyping: false,
      };
    },
    mounted() {
      this.startTyping();
    },
    methods: {
      startTyping() {
        this.isTyping = true;
        this.typeNextCharacter();
      },
      typeNextCharacter() {
        if (this.currentIndex < this.textToType.length) {
          this.typedText += this.textToType[this.currentIndex];
          this.currentIndex++;
          setTimeout(this.typeNextCharacter, 100);
        } else {
          setTimeout(this.startDeleting, 1000);
        }
      },
      startDeleting() {
        this.isTyping = false;
        this.currentIndex = this.typedText.length - 1;
        this.deleteLastCharacter();
      },
      deleteLastCharacter() {
        if (this.currentIndex >= 0) {
          this.typedText = this.typedText.slice(0, this.currentIndex);
          this.currentIndex--;
          setTimeout(this.deleteLastCharacter, 50);
        } else {
          this.typedText = '';
          this.isTyping = true;
          this.currentIndex = 0;
          setTimeout(this.startTyping, 1000);
        }
      },
    },
  };
  </script>
  
  <style>
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';
  
  .typing-cursor {
    display: inline-block;
    width: 0.5rem;
    height: 1rem;
    margin-left: 0.25rem;
    background-color: black;
    animation: blink 0.7s infinite;
  }
  
  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  </style>