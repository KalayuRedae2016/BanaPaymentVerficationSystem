  <template>
  <div class="bg-white rounded-lg mt-16 md:-mt-0">
    <div class="flex flex-row items-center">
      <div
        class="flex flex-row space-x-1 ml-3 mt-5 font-semibold text-blue-800 font-extrabold font-extrabold"
      >
        <button
          @click="$router.back()"
          class="flex items-center text-blue-600 hover:text-blue-800 hover:bg-gray-200 hover:rounded-full hover:p-1"
        >
          <i class="fas fa-arrow-left mr-2"></i> 
        </button>
       <p>Organization Payment Detail</p>
      </div>
    </div>

    <hr class="my-2 bg-red-500" />
    <div class="space-y-4 px-4 mb-3 text-gray-500">
      <div>
  <p v-for="(value, key) in $route.query" :key="key">
    {{ capitalizeFirstLetter(
        key === 'semiYear' ? 'Semi Year' : 
        key === 'timeRange' ? 'Time Range' : 
        key
      ) }}: 
    {{ 
      value === '1st' ? 'First-Half' :
      value === '2nd' ? 'Second-Half' :
      value === 'semiAnnual' ? 'Semiannual' :
      capitalizeFirstLetter(value)
    }}
  </p>
</div>




      <!-- Cards for each bank -->
      <div
        v-for="(balance, bank) in totalBalance.totalBalanceBankType"
        :key="bank"
        class="bg-white shadow-md rounded-lg p-4 border border-gray-300"
      >
        <!-- Centered Bank Name -->
        <div v-if="bank != 'null'">
          <h3
            v-if="bank != 'null'"
            class="text-lg font-semibold text-blue-800 mb-4"
          >
            {{ bank }}
          </h3>
          <!-- Balance Details in Two Columns -->
          <div class="grid lg:grid-cols-2 gap-6 text-sm ml-3">
            <!-- Left Column -->
            <div class="space-y-2 lg:border-r border-blue-500 pr-10">
              <div class="flex justify-between">
                <span class="font-medium">{{ $t("regular") }}</span>
                <span>{{ balance.regularBalance || 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium">{{ $t("subsidy") }}</span>
                <span>{{ balance.subsidyBalance || 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium">{{ $t("urgent") }}</span>
                <span>{{ balance.urgentBalance || 0 }}</span>
              </div>

              <div class="flex justify-between">
                <span class="font-medium">{{
                  $t("Outgoing Block Balance")
                }}</span>
                <span>{{ balance.blockBankOutcoming || 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium">{{
                  $t("Incoming Block Balance")
                }}</span>
                <span>{{ balance.blockBankIncoming || 0 }}</span>
              </div>

              <div class="flex justify-between">
                <span class="font-medium">{{
                  $t("Block Expenditure Offset")
                }}</span>
                <span>{{ balance.blockExpenditure || 0 }}</span>
              </div>

              <div class="flex justify-between">
                <span class="font-medium">{{
                  $t("Block Expenditure Offset")
                }}</span>
                <span>{{ balance.blockUserWithdrawal || 0 }}</span>
              </div>

              <div class="flex justify-between">
                <span class="font-medium">{{ $t("totalBlock") }}</span>
                <span class="bg-gray-100 px-2 py-1 rounded text-blue-500">{{
                  balance.totalBlockBalance || 0
                }}</span>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-2 pr-10">
              <div class="flex justify-between">
                <span class="font-medium">{{ $t("penality") }}</span>
                <span>{{ balance.penalityBalance || 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium">{{ $t("Monthly Service") }}</span>
                <span>{{ balance.serviceBalance || 0 }}</span>
              </div>

              <div class="flex justify-between">
                <span class="font-medium">{{
                  $t("Outgoing Service Balance")
                }}</span>
                <span>{{ balance.serviceBankOutcoming || 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium">{{
                  $t("Incoming Service Balance")
                }}</span>
                <span>{{ balance.serviceBankIncoming || 0 }}</span>
              </div>

              <div class="flex justify-between">
                <span class="font-medium">{{
                  $t("Service Expenditure Offset")
                }}</span>
                <span>{{ balance.serviceExpenditure || 0 }}</span>
              </div>

              <div class="flex justify-between">
                <span class="font-medium">{{
                  $t("Service User Withdrawal Offset")
                }}</span>
                <span>{{ balance.serviceUserWithdrawal || 0 }}</span>
              </div>

              <div class="flex justify-between">
                <span class="font-medium">{{ $t("totalService") }}</span>
                <span class="bg-gray-100 px-2 py-1 rounded text-blue-500">{{
                  balance.totalServiceBalance || 0
                }}</span>
              </div>
            </div>
          </div>
          <div
            class="flex justify-between border-t border-gray-500 mt-5 pt-5 pr-10"
          >
            <span class="font-medium text-blue-500">{{
              $t("Total Balance")
            }}</span>
            <span class="bg-gray-200 px-2 py-1 rounded text-blue-500">
              {{
                (balance.totalServiceBalance || 0) +
                (balance.totalBlockBalance || 0)
              }}
            </span>
          </div>
        </div>
      </div>

      <!-- Total Summary Card -->
      <div class="bg-gray-50 shadow-md rounded-lg p-4 border-r border-gray-300">
        <h3 class="text-lg font-bold text-blue-800 mb-4">
          {{ $t("total") }}
        </h3>
        <div class="grid lg:grid-cols-2 gap-6 text-sm ml-3">
          <!-- Left Column -->
          <div class="space-y-2 lg:border-r border-blue-500 pr-10">
            <div class="flex justify-between">
              <span class="font-medium">{{ $t("regular") }}</span>
              <span>{{ totalOrgBalance.totalRegularBalance || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">{{ $t("subsidy") }}</span>
              <span>{{ totalOrgBalance.totalSubsidyBalance || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">{{ $t("urgent") }}</span>
              <span>{{ totalOrgBalance.totalUrgentBalance || 0 }}</span>
            </div>

            <div class="flex justify-between">
              <span class="font-medium">{{ $t("Total Transfered") }}</span>
              <span>{{ totalOrgBalance.blockBankTransfered || 0 }}</span>
            </div>

            <div class="flex justify-between">
              <span class="font-medium">{{
                $t("Total Expenditure Offset")
              }}</span>
              <span>{{ totalOrgBalance.blockExpenditure || 0 }}</span>
            </div>

            <div class="flex justify-between">
              <span class="font-medium">{{ $t("Total User Withdrawal") }}</span>
              <span>{{ totalOrgBalance.blockUserWithdrawal || 0 }}</span>
            </div>

            <div class="flex justify-between">
              <span class="font-medium">{{ $t("totalBlock") }}</span>
              <span class="bg-gray-100 px-2 py-1 rounded">{{
                totalOrgBalance.totalBlockBankAccount || 0
              }}</span>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-2 pr-10">
            <div class="flex justify-between">
              <span class="font-medium">{{ $t("penality") }}</span>
              <span>{{ totalOrgBalance.totalPenalityBalance || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">{{ $t("Monthly Service") }}</span>
              <span>{{ totalOrgBalance.totalServiceBalance || 0 }}</span>
            </div>

            <div class="flex justify-between">
              <span class="font-medium">{{ $t("Total Transfered") }}</span>
              <span>{{ totalOrgBalance.serviceBankTransfered || 0 }}</span>
            </div>

            <div class="flex justify-between">
              <span class="font-medium">{{
                $t("Total Expenditure Offset")
              }}</span>
              <span>{{ totalOrgBalance.serviceExpenditure || 0 }}</span>
            </div>

            <div class="flex justify-between">
              <span class="font-medium">{{ $t("Total User Withdrawal") }}</span>
              <span>{{ totalOrgBalance.serviceUserWithdrawal || 0 }}</span>
            </div>

            <div class="flex justify-between">
              <span class="font-medium">{{ $t("totalService") }}</span>
              <span class="bg-gray-100 px-2 py-1 rounded">{{
                totalOrgBalance.totalServiceBankAccount || 0
              }}</span>
            </div>
          </div>
        </div>

        <div
          class="flex justify-between border-t border-gray-500 mt-5 pt-5 pr-10"
        >
          <span class="font-medium text-blue-500">{{
            $t("Total Balance")
          }}</span>
          <span class="bg-gray-200 px-2 py-1 rounded text-blue-500">
            {{
              (totalOrgBalance.totalServiceBankAccount || 0) +
              (totalOrgBalance.totalBlockBankAccount || 0)
            }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ClientsView",
  components: {},
  data() {
    return {
      totalBalance: [],
      totalOrgBalance: {},
    };
  },

  watch: {},

  computed: {},
  async created() {
    const params = this.$route.query;
    try {
      const response = await this.$apiGet("/api/v1/payments/reports", params);
      console.log("Response for report:checkwethisek to see ", response);
      this.reports = response || {
        items: {
          totalBalanceBankType: [],
        },
      };
      this.totalBalance = response.items;
      this.totalOrgBalance = response.items.Organization;

      this.reportLength = 1;
    } catch (error) {
      this.reportLength = 0;
      this.reports = {
        items: {
          totalBalanceBankType: [],
        },
      };
    } finally {
    }
  },
  methods: {
    capitalizeFirstLetter(value) {
    if (!value) return value; // Avoid undefined or null
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
  },
};
</script>