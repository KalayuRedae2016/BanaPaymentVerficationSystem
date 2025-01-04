<template>
    <div class="p-4 bg-white shadow-lg">
      <!-- Top Controls -->
      <div class="flex justify-between items-center mb-4">
        <!-- Show More -->
        <div class="flex items-center">
          <label for="show-more" class="text-sm font-medium text-gray-700 mr-2">Show More:</label>
          <select
            id="show-more"
            v-model="itemsPerPage"
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
        <table class="table-auto w-full border border-gray-300">
          <thead>
            <tr>
              <th
                v-for="header in headers"
                :key="header.key"
                class="px-4 py-2 border-b text-left cursor-pointer"
                @click="sortBy(header.key)"
              >
                {{ header.label }}
                <span v-if="header.key === currentSortField">
                  {{ currentSortDirection === 'asc' ? '▲' : '▼' }}
                </span>
              </th>
              <th class="px-4 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in paginatedData"
              :key="index"
              class="border-b hover:bg-blue-100"
            >
              <td
                v-for="field in fields"
                :key="field"
                class="px-4 py-2"
              >
                {{ row[field] }}
              </td>
              <!-- Actions Column -->
              <td class="px-4 py-2">
                <button
                  @click="$emit('edit', row)"
                  class="text-blue-600 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  @click="$emit('delete', row)"
                  class="text-red-600 hover:underline"
                >
                  Delete
                </button>
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
  
      <!-- Bottom Controls -->
      <div class="flex justify-between items-center mt-4">
        <!-- Entries Reference -->
        <div class="text-sm text-gray-600">
          Showing {{ currentRangeStart }} to {{ currentRangeEnd }} of {{ filteredData.length }} entries
        </div>
  
        <!-- Pagination -->
        <div class="flex items-center space-x-2">
          <button
            :disabled="currentPage === 1"
            @click="currentPage--"
            class="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <span>&larr;</span> <!-- Previous Icon -->
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-3 py-1 rounded',
              currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            ]"
          >
            {{ page }}
          </button>
          <button
            :disabled="currentPage === totalPages"
            @click="currentPage++"
            class="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <span>&rarr;</span> <!-- Next Icon -->
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: {
        type: Array,
        required: true,
      },
      headers: {
        type: Array,
        required: true,
      },
      fields: {
        type: Array,
        required: true,
      },
      itemsPerPageOptions: {
        type: Array,
        default: () => [1, 2, 5, 10, 50, 100],
      },
    },
    data() {
      return {
        searchQuery: "",
        currentPage: 1,
        itemsPerPage: 10,
        currentSortField: null,
        currentSortDirection: "asc",
      };
    },
    computed: {
      filteredData() {
        let result = this.data;
        if (this.searchQuery) {
          result = result.filter((row) =>
            this.fields.some((field) =>
              String(row[field]).toLowerCase().includes(this.searchQuery.toLowerCase())
            )
          );
        }
        if (this.currentSortField) {
          result = result.sort((a, b) => {
            const valA = a[this.currentSortField];
            const valB = b[this.currentSortField];
            if (valA < valB) return this.currentSortDirection === "asc" ? -1 : 1;
            if (valA > valB) return this.currentSortDirection === "asc" ? 1 : -1;
            return 0;
          });
        }
        return result;
      },
      paginatedData() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredData.slice(start, end);
      },
      currentRangeStart() {
        return this.filteredData.length > 0
          ? (this.currentPage - 1) * this.itemsPerPage + 1
          : 0;
      },
      currentRangeEnd() {
        return Math.min(this.currentPage * this.itemsPerPage, this.filteredData.length);
      },
      totalPages() {
        return Math.ceil(this.filteredData.length / this.itemsPerPage);
      },
    },
    methods: {
      sortBy(field) {
        if (this.currentSortField === field) {
          this.currentSortDirection = this.currentSortDirection === "asc" ? "desc" : "asc";
        } else {
          this.currentSortField = field;
          this.currentSortDirection = "asc";
        }
      },
    },
  };
  </script>
  