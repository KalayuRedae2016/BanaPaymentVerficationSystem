export default {
    data() {
      return {
        searchQuery: "",
        currentPage: 1,
        itemsPerPage: 10,
        currentSortField: null,
        currentSortDirection: "asc",
      };
    },
    props: {
      data: {
        type: Array,
        required: true,
      },
      itemsPerPageOptions: {
        type: Array,
        default: () => [1, 2, 5, 10, 50, 100],
      },
    },
    computed: {
      filteredData() {
        let result = this.data;
  
        // Apply search
        if (this.searchQuery) {
          result = result.filter((row) =>
            Object.values(row).some((value) =>
              String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
            )
          );
        }
  
        // Apply sorting
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
      goToPage(page) {
        this.currentPage = page;
      },
      changeItemsPerPage(count) {
        this.itemsPerPage = count;
        this.currentPage = 1; // Reset to first page
      },
    },
  };
  