<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Admin Messages</h1>
    <div class="grid grid-cols-1 gap-4">
      <div v-for="message in messages" :key="message.id" 
           :class="message.sender === 'admin' ? 'bg-blue-100' : 'bg-green-100'"
           class="shadow-md rounded-lg p-6">
        <h2 class="text-xl font-bold mb-2">{{ message.title }}</h2>
        <p class="mb-2">{{ message.content }}</p>
        <p class="text-gray-500 text-sm">{{ message.timestamp }}</p>
        <p class="text-gray-700 font-semibold text-sm">{{ message.sender === 'admin' ? 'Admin' : 'Member' }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      messages: [
        {
          id: 1,
          title: 'Update from Admin',
          content: 'This is an important update from the admin.',
          timestamp: '2024-07-05 10:00 AM',
          sender: 'admin'
        },
        {
          id: 2,
          title: 'Question from Member',
          content: 'I have a question regarding the latest update.',
          timestamp: '2024-07-05 11:00 AM',
          sender: 'member'
        },
        {
          id: 3,
          title: 'Reminder from Admin',
          content: 'Don’t forget about the upcoming meeting.',
          timestamp: '2024-07-05 12:00 PM',
          sender: 'admin'
        }
      ]
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
