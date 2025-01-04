<template>
    <div class="p-4">
      <!-- Top Controls -->
      <div class="flex justify-between items-center mb-4">
        <!-- Show More -->
        <div class="flex items-center">
          <label for="show-more" class="text-sm font-medium text-gray-700 mr-2">Show More:</label>
          <select
            id="show-more"
            v-model="itemsPerPage"
            @change="changeItemsPerPage(itemsPerPage)"
            class="border border-gray-300 rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
          >
            <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
  
        <!-- Search -->
        <div>
          <label for="search" class="text-sm font-medium text-gray-700">Search:</label>
          <input
            id="search"
            type="text"
            v-model="searchQuery"
            class="ml-2 border border-gray-300 rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
            placeholder="Search..."
          />
        </div>
      </div>
  
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="jtable">
          <thead>
            <tr>
              <th
                v-for="header in headers"
                :key="header.key"
                class="cursor-pointer"
                @click="sortBy(header.key)"
              >
                {{ header.label }}
                <span v-if="header.key === currentSortField">
                  {{ currentSortDirection === 'asc' ? '▲' : '▼' }}
                </span>
              </th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in paginatedData"
              :key="index"
              class="hover:bg-blue-100"
            >
              <td v-for="field in fields" :key="field">
                {{ row[field] }}
              </td>
              <td>
                <button @click="editAction(row)" class="text-blue-600">Edit</button>
                <button @click="deleteAction(row)" class="text-red-600">Delete</button>
              </td>
            </tr>
            <tr v-if="paginatedData.length === 0">
              <td :colspan="fields.length + 1" class="text-center text-gray-500 py-4">
                No data found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Pagination and Entries -->
      <div class="flex justify-between items-center mt-4">
        <div class="text-sm text-gray-600">
          Showing {{ currentRangeStart }} to {{ currentRangeEnd }} of {{ filteredData.length }} entries
        </div>
        <div class="flex items-center space-x-2">
          <button
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
            class="pagination-btn"
          >
            &larr; <!-- Previous Icon -->
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'pagination-btn',
              currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            ]"
          >
            {{ page }}
          </button>
          <button
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
            class="pagination-btn"
          >
            &rarr; <!-- Next Icon -->
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import jTableMixin from "./jtableMix.js";
  
  export default {
    mixins: [jTableMixin],
    data() {
      return {
        headers: [
          { label: "ID", key: "id" },
          { label: "Name", key: "name" },
          { label: "Email", key: "email" },
          { label: "Created At", key: "createdAt" },
        ],
        fields: ["id", "name", "email", "createdAt"],
        data: [
          { id: 1, name: "John Doe", email: "john.doe@example.com", createdAt: "2023-01-01" },
          { id: 2, name: "Jane Smith", email: "jane.smith@example.com", createdAt: "2023-01-02" },
          // Add more data
        ],
      };
    },
    methods: {
      editAction(row) {
        console.log("Edit", row);
      },
      deleteAction(row) {
        console.log("Delete", row);
      },
    },
  };
  </script>
  