<template>
    <div>
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat"
           :style="{ backgroundImage: `url(${backgroundImage})` }">
      </div>
    <div class="relative h-screen">
      <!-- Background -->
    
  
      <header
      class="relative bg-cover bg-center h-screen flex items-center justify-center text-white"
       >
      <div class="absolute inset-0 bg-blue-900 bg-opacity-80"></div>
      <div class="relative z-10 text-center">
        <img
          class="w-40 h-40 rounded-full mx-auto border-4 border-white shadow-md"
          src="../assets/img/profile.jpg"
          alt="Profile Picture"
        />
        <h1 class="text-5xl font-bold mt-4">Tadesse Gebremicheal Berhe</h1>
        <p class="text-3xl mt-2">Software Developer</p>
      </div>
    </header>


    <section class="py-20 bg-gray-50">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-green-500 mb-6 border-b border-green-500 pb-2">
  About Me
</h2>

        <p class="text-gray-600 text-lg leading-relaxed">
          I am a software developer specializing in <strong>Node.js</strong>, 
          <strong>Vue.js</strong>, <strong>Flutter</strong>, and <strong>Python Django</strong>.
          I have experience in developing innovative solutions like <em>Live Crime Notifier</em>, 
          <em>Expense and Income Calculator</em>, and <em>Plant Disease Detector</em>.
        </p>
      </div>
    </section>

    <section class="py-20 bg-gray-100">
    <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-green-500 mb-6 border-b border-green-500 pb-2">
 Skills
</h2>
    <p class="text-gray-700 text-lg leading-relaxed mb-5 ">
    I have the following  <strong>Node.js</strong>, 
          <strong>Vue.js</strong>, <strong>Flutter</strong>, and <strong>Python Django</strong>.
          I have experience in developing innovative solutions like <em>Live Crime Notifier</em>, 
          <em>Expense and Income Calculator</em>, and <em>Plant Disease Detector</em>.
    </p>

      <!-- Carousel Container -->
      <div class="relative">
        <div class="carousel-container overflow-hidden relative">
          <!-- Carousel Wrapper -->
          <div :class="`flex transition-transform duration-500 ease-in-out transform`" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div class="carousel-slide bg-white p-6 shadow-lg rounded-lg">
              <i class="fab fa-node-js text-4xl text-green-500"></i>
              <p class="text-gray-700 mt-4">Node.js</p>
            </div>
            <div class="carousel-slide bg-white p-6 shadow-lg rounded-lg">
              <i class="fab fa-vuejs text-4xl text-green-600"></i>
              <p class="text-gray-700 mt-4">Vue.js</p>
            </div>
            <div class="carousel-slide bg-white p-6 shadow-lg rounded-lg">
              <i class="fas fa-mobile-alt text-4xl text-blue-500"></i>
              <p class="text-gray-700 mt-4">Flutter</p>
            </div>
            <div class="carousel-slide bg-white p-6 shadow-lg rounded-lg">
              <i class="fab fa-python text-4xl text-yellow-500"></i>
              <p class="text-gray-700 mt-4">Python Django</p>
            </div>
            <div class="carousel-slide bg-white p-6 shadow-lg rounded-lg">
              <i class="fab fa-python text-4xl text-yellow-500"></i>
              <p class="text-gray-700 mt-4">Java</p>
            </div>
            <div class="carousel-slide bg-white p-6 shadow-lg rounded-lg">
              <i class="fab fa-python text-4xl text-yellow-500"></i>
              <p class="text-gray-700 mt-4">HTML</p>
            </div>
            <div class="carousel-slide bg-white p-6 shadow-lg rounded-lg">
              <i class="fab fa-python text-4xl text-yellow-500"></i>
              <p class="text-gray-700 mt-4">CSS</p>
            </div>
            <div class="carousel-slide bg-white p-6 shadow-lg rounded-lg">
              <i class="fab fa-python text-4xl text-yellow-500"></i>
              <p class="text-gray-700 mt-4">JS</p>
            </div>
          </div>
        </div>

        <!-- Left and Right Buttons -->
        <button 
          @click="prevSlide"
          class="bg-green-500 ml-5 absolute top-1/2 left-0 transform -translate-y-1/2  p-2 rounded-full focus:outline-none">
          ‹
        </button>
        <button 
          @click="nextSlide"
          class="mr-5 absolute top-1/2 right-0 transform -translate-y-1/2  p-2 rounded-full focus:outline-none">
          ›
        </button>
      </div>
    </div>
  </section>
  <section class="py-20 bg-gray-100">
      <div class="max-w-5xl mx-auto text-center">
                <h2 class="text-3xl font-bold text-green-500 mb-6 border-b border-green-500 pb-2">
        Exprience
       </h2>
       <p class="text-gray-700 text-lg leading-relaxed mb-5 ">
    I have the following  <strong>Node.js</strong>, 
          <strong>Vue.js</strong>, <strong>Flutter</strong>, and <strong>Python Django</strong>.
          I have experience in developing innovative solutions like <em>Live Crime Notifier</em>, 
          <em>Expense and Income Calculator</em>, and <em>Plant Disease Detector</em>.
    </p>
        <div class="grid gap-8 grid-cols-1 md:grid-cols-2">
          <div class="bg-white p-6 shadow-lg rounded-lg">
            <img src="https://via.placeholder.com/200" alt="Project" class="rounded-t-lg">
            <h3 class="text-2xl font-semibold mt-4">Live Crime Notifier</h3>
            <p class="text-gray-600 mt-2">Android-based project for real-time crime reporting and alerting.</p>
          </div>
          <div class="bg-white p-6 shadow-lg rounded-lg">
            <img src="https://via.placeholder.com/200" alt="Project" class="rounded-t-lg">
            <h3 class="text-2xl font-semibold mt-4">Plant Disease Detector</h3>
            <p class="text-gray-600 mt-2">CNN-based solution for detecting plant diseases from images.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-100">
      <div class="max-w-5xl mx-auto text-center">
                <h2 class="text-3xl font-bold text-green-500 mb-6 border-b border-green-500 pb-2">
         Projects
       </h2>
       <p class="text-gray-700 text-lg leading-relaxed mb-5 ">
    I have the following  <strong>Node.js</strong>, 
          <strong>Vue.js</strong>, <strong>Flutter</strong>, and <strong>Python Django</strong>.
          I have experience in developing innovative solutions like <em>Live Crime Notifier</em>, 
          <em>Expense and Income Calculator</em>, and <em>Plant Disease Detector</em>.
    </p>
        <div class="grid gap-8 grid-cols-1 md:grid-cols-2">
          <div class="bg-white p-6 shadow-lg rounded-lg">
            <img src="https://via.placeholder.com/200" alt="Project" class="rounded-t-lg">
            <h3 class="text-2xl font-semibold mt-4">Live Crime Notifier</h3>
            <p class="text-gray-600 mt-2">Android-based project for real-time crime reporting and alerting.</p>
          </div>
          <div class="bg-white p-6 shadow-lg rounded-lg">
            <img src="https://via.placeholder.com/200" alt="Project" class="rounded-t-lg">
            <h3 class="text-2xl font-semibold mt-4">Plant Disease Detector</h3>
            <p class="text-gray-600 mt-2">CNN-based solution for detecting plant diseases from images.</p>
          </div>
        </div>
      </div>
    </section>


    <section class="py-20 bg-gray-50">
      <div class="max-w-5xl mx-auto text-center">
       
        <h2 class="text-3xl font-bold text-green-500 mb-6 border-b border-green-500 pb-2">
            Certificates
       </h2>

       <p class="text-gray-700 text-lg leading-relaxed mb-5 ">
    I have the following  <strong>Node.js</strong>, 
          <strong>Vue.js</strong>, <strong>Flutter</strong>, and <strong>Python Django</strong>.
          I have experience in developing innovative solutions like <em>Live Crime Notifier</em>, 
          <em>Expense and Income Calculator</em>, and <em>Plant Disease Detector</em>.
    </p>
        <div class="grid gap-8 grid-cols-1 md:grid-cols-2">
          <div class="bg-white p-6 shadow-lg rounded-lg">
            <img src="https://via.placeholder.com/150" alt="Certificate" class="rounded-t-lg">
            <h3 class="text-2xl font-semibold mt-4">Certified Vue.js Developer</h3>
            <p class="text-gray-600 mt-2">Issued by Vue Mastery</p>
          </div>
          <div class="bg-white p-6 shadow-lg rounded-lg">
            <img src="https://via.placeholder.com/150" alt="Certificate" class="rounded-t-lg">
            <h3 class="text-2xl font-semibold mt-4">Advanced Python Programming</h3>
            <p class="text-gray-600 mt-2">Issued by Coursera</p>
          </div>
        </div>
      </div>
    </section>

<!-- <section>
  <div class="relative w-64 h-32 bg-white p-4 rounded-lg shadow-md">
  
    <div class="relative z-10">
      <h3 class="text-lg font-semibold">Card Title</h3>
      <p class="text-sm text-gray-600">This is the card content.</p>
    </div>

 
    <div
      class="absolute inset-0 rounded-lg border-4 border-transparent z-0 pointer-events-none looping-border"
    ></div>
  </div>
</section> -->

<div class="relative w-full mb-5 bg-white p-4 rounded-lg shadow-md overflow-hidden">
    <!-- Card content -->
    <div class="relative z-10">
      <h3 class="text-lg font-semibold">Card Title</h3>
      <p class="text-sm text-gray-600">This is the card content.</p>
    </div>

    <!-- Looping border -->
    <div class="absolute inset-0 border-line"></div>
  </div>


    <footer
      class="relative bg-cover bg-center text-white py-20"
    >
      <div class="absolute inset-0 bg-blue-800 bg-opacity-85"></div>
      <div class="relative z-10 max-w-5xl mx-auto text-center">
  
        <h2 class="text-3xl font-bold text-green-500 mb-6 border-b border-green-500 pb-2">
            Connect Me
       </h2>
        <div class="flex justify-center space-x-6 mb-8">
          <a href="#" class="text-2xl hover:text-blue-500 transition-colors"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="text-2xl hover:text-blue-300 transition-colors"><i class="fab fa-twitter"></i></a>
          <a href="#" class="text-2xl hover:text-pink-400 transition-colors"><i class="fab fa-instagram"></i></a>
          <a href="#" class="text-2xl hover:text-blue-700 transition-colors"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <p>&copy; 2025 Tadesse Gebremicheal Berhe. All Rights Reserved.</p>
      </div>
    </footer>
   
    </div>
    </div>
  </template>
  
 




<script>
import church3 from '@/assets/img/codeImage.jpg'; // Adjust the path as needed

export default {
  data() {
    return {
    backgroundImage: church3,
      currentIndex: 0, // To track the current slide index
      totalSlides: 8,  // Total number of slides in the carousel
    };
  },
  mounted() {
    // Start auto-sliding the carousel
    this.startAutoSlide();
  },
  beforeDestroy() {
    // Clear the interval when the component is destroyed
    clearInterval(this.autoSlideInterval);
  },
  methods: {
    // Go to the next slide
    nextSlide() {
      if (this.currentIndex < this.totalSlides - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0; // Loop to the first slide
      }
    },
    // Go to the previous slide
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.totalSlides - 1; // Loop to the last slide
      }
    },
    // Start the auto-slide functionality
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide();
      }, 3000); // Change slide every 3 seconds (3000ms)
    },
  },
};
</script>
Step 3: Tailwind CSS Styling
The styling remains the same. We use Tailwind's utility classes to make the carousel look great.

vue
Copy code
<style scoped>
.carousel-container {
  width: 100%;
  overflow: hidden;
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-slide {
  flex: 0 0 100%; /* Each slide takes up 100% of the container's width */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

/* Custom navigation button styles */
button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border: none;
  font-size: 24px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

button:focus {
  outline: none;
}

/* @keyframes looping-border {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 400% 400%;
  }
}

.looping-border {
  background: linear-gradient(
    90deg,
    rgba(255, 0, 0, 0.8),
    rgba(0, 255, 0, 0.8),
    rgba(0, 0, 255, 0.8),
    rgba(255, 0, 0, 0.8)
  );
  background-size: 400% 400%;
  animation: looping-border 4s linear infinite;
  border-radius: inherit;
} */

@keyframes border-loop {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 200%;
  }
}

.border-line {
  border-radius: 0.75rem; /* Match the card's border-radius */
  background: linear-gradient(
    90deg,
    rgba(255, 0, 0, 0.8),
    rgba(0, 255, 0, 0.8),
    rgba(0, 0, 255, 0.8),
    rgba(255, 0, 0, 0.8)
  );
  background-size: 200% 200%;
  animation: border-loop 4s linear infinite;
  -webkit-mask: 
    linear-gradient(black 0 0) content-box, 
    linear-gradient(black 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: 2px; /* Border thickness */
}


</style>