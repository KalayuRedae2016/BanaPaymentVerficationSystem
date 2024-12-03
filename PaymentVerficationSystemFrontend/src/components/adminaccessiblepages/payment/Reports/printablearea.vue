<template>
    <div class="report-table mt-10 hidden" id="printablel-area">
    <h2 class="text-center text-2xl font-bold text-indigo-800 mb-2">
      Bana Mole Report
    </h2>
    <p class="text-center text-sm text-gray-600 mb-4">
      Payment Report for {{ reportPeriod }}
    </p>
    <table class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-50">
        <tr>
          <th
            rowspan="3"
            class="px-4 py-2 text-blue-800 text-left border border-gray-300"
          >
            Banks
          </th>
          <th
            colspan="7"
            class="px-4 py-2 text-blue-800 text-left border border-gray-300"
          >
            Balance
          </th>
        </tr>
        <tr>
          <th
            colspan="4"
            class="px-4 py-2 text-blue-800 text-left border border-gray-300"
          >
            Block
          </th>
          <th
            colspan="3"
            class="px-4 py-2 text-blue-800 text-left border border-gray-300"
          >
            Service
          </th>
        </tr>
        <tr>
          <th
            class="px-4 py-2 text-blue-800 text-left border border-gray-300"
          >
            Regular
          </th>
          <th
            class="px-4 py-2 text-blue-800 text-left border border-gray-300"
          >
            Subsidy
          </th>
          <th
            class="px-4 py-2 text-blue-800 text-left border border-gray-300"
          >
            Urgent
          </th>
          <th
            class="px-4 py-2 text-blue-800 text-left border border-gray-300"
          >
            Total Block
          </th>
          <th
            class="px-4 py-2 text-blue-800 text-left border border-gray-300"
          >
            Penality
          </th>
          <th
            class="px-4 py-2 text-blue-800 text-left border border-gray-300"
          >
            M.service
          </th>
          <th
            class="px-4 py-2 text-blue-800 text-left border border-gray-300"
          >
            Total Service
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-300">
        <tr
          v-for="(balance, bank) in reports.items.categorizedPayments
            .confirmed.bankTypes"
          :key="bank"
        >
          <td
            class="px-4 py-2 text-left border border-gray-300 text-blue-800"
          >
            {{ bank }}
          </td>
          <td class="px-4 py-2 text-left border border-gray-300">
            {{ balance.regularBalance }}
          </td>
          <td class="px-4 py-2 text-left border border-gray-300">
            {{ balance.subsidyBalance }}
          </td>
          <td class="px-4 py-2 text-left border border-gray-300">
            {{ balance.urgentBalance }}
          </td>
          <td class="px-4 py-2 text-left border border-gray-300">
            {{ balance.totalBlockBalance }}
          </td>
          <td class="px-4 py-2 text-left border border-gray-300">
            {{ balance.penalityBalance }}
          </td>

          <td class="px-4 py-2 text-left border border-gray-300">
            {{ balance.serviceBalance }}
          </td>
          <td class="px-4 py-2 text-left border border-gray-300">
            {{ balance.serviceBalance }}
          </td>
        </tr>
        <tr class="font-bold bg-gray-100">
          <td
            class="px-4 py-2 text-left border border-gray-300 text-blue-800"
          >
            Total
          </td>
          <td
            class="px-4 py-2 text-left border border-gray-300 text-blue-800"
          >
            {{
              reports.items.categorizedPayments.confirmed
                .totalRegularAmountPaid
            }}
          </td>
          <!-- Total Regular -->
          <td
            class="px-4 py-2 text-left border border-gray-300 text-blue-800"
          >
            {{
              reports.items.categorizedPayments.confirmed
                .totalSubsidyAmountPaid
            }}
          </td>
          <!-- Total Subsidy -->
          <td
            class="px-4 py-2 text-left border border-gray-300 text-blue-800"
          >
            {{
              reports.items.categorizedPayments.confirmed
                .totalUrgentAmountPaid
            }}
          </td>
          <!-- Total Urgent -->
          <td
            class="px-4 py-2 text-left border border-gray-300 text-blue-800"
          >
            {{
              reports.items.categorizedPayments.confirmed
                .totalBlockBankAccountPaid
            }}
          </td>
          <!-- Total Urgent -->
          <td
            class="px-4 py-2 text-left border border-gray-300 text-blue-800"
          >
            {{
              reports.items.categorizedPayments.confirmed
                .totalPenalityAmountPaid
            }}
          </td>
          <!-- Total Block -->
          <td
            class="px-4 py-2 text-left border border-gray-300 text-blue-800"
          >
            {{
              reports.items.categorizedPayments.confirmed
                .totalServiceAmountPaid
            }}
          </td>
          <td
            class="px-4 py-2 text-left border border-gray-300 text-blue-800"
          >
            {{
              reports.items.categorizedPayments.confirmed
                .totalServiceBankAccountPaid
            }}
          </td>
          <!-- Total penality -->
        </tr>
      </tbody>
    </table>
    <div v-if="monthlySelected" class="flex flex-row space-x-5">
      <div class="mt-5">
        <h4>Confirmed Clients:2000</h4>
      </div>
      <div class="mt-5">
        <h4>Unconfirmed Clients:2000</h4>
      </div>
    </div>
    <div id="qrCodeImageContainer1" class="mb-4 flex justify-center mt-5">
      <!-- The QR code image will be placed here by JavaScript -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        
    },
})
</script>


