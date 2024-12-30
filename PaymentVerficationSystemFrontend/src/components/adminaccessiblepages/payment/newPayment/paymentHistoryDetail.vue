<template>
  <div>
    <Toast ref="toast"/>
    <div class="container hidden" id="printable-area">
      <div
        class="receipt"
        style="
          margin-right: 10px;
          margin-top: 10px;
          margin-bottom: 10px;
          margin-left: 10px;
        "
      >
        <div style="width: 90%; max-width: 100%; min-width: 100%">
          <img
            src="../../../../assets/img/banaReceipt1.jpg"
            alt=""
            style="max-width: 100%; height: auto; display: block"
          />
        </div>

        <div class="receipt-header" style="background-color: white">
          <div class="info">
            <div class="text" style="margin-left: -10px">
              Bill Code: <span>{{ payment.billCode }}</span>
            </div>
            <div class="text">
              Date(Day-Month-Year):
              <span
                >{{ receiptDate.getDate() }}-{{
                  changeMonthIntoString(receiptDate.getMonth() + 1)
                }}-{{ receiptDate.getFullYear() }}</span
              >
            </div>
          </div>
        </div>

        <h2 class="section-title" style="color: #622e2e; font-weight: bold">
          Company Information
        </h2>
        <div class="grid">
          <div class="box">
            <table class="table" style="color: #622e2e; font-weight: bold">
              <tr>
                <td>Country:</td>
                <td>{{ country }}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{{ city }}</td>
              </tr>
            </table>
          </div>
          <div class="box">
            <table class="table" style="color: #622e2e; font-weight: bold">
              <tr>
                <td>Email:</td>
                <td>{{ email }}</td>
              </tr>
              <tr>
                <td>Tel:</td>
                <td>{{ tel }}</td>
              </tr>
              <tr>
                <td>address:</td>
                <td>{{ address }}</td>
              </tr>
            </table>
          </div>
        </div>

        <h2 class="section-title" style="color: #622e2e; font-weight: bold">
          Payment Information
        </h2>
        <table class="table">
          <tr
            style="
              border-bottom: 1px solid #d1d5db;
              border-top: 1px solid #d1d5db;
            "
          >
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              FullName
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ payment.fullName }}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              UserCode
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ payment.userCode }}
            </td>
          </tr>

          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              Payment Term
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ paymentTerm }}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              RegFee
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ payment.registrationFee }}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              Regular Amount
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ payment.regular.amount }}
            </td>
          </tr>

          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              Subsidy Amount
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ payment.subsidy.amount }}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              Urgent Amount
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ payment.urgent.amount }}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              Service Amount
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ payment.service.amount }}
            </td>
          </tr>

          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              Penality
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ payment.penality.amount }}
            </td>
          </tr>

          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              Total Block
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{
                payment.regular.amount +
                payment.subsidy.amount +
                payment.urgent.amount
              }}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              Total Service
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ payment.penality.amount + payment.service.amount }}
            </td>
          </tr>
        </table>

        <div
          class="signature-section"
          style="color: #622e2e; font-weight: bold"
        >
          <div class="signature-row">
            <div class="signature-block">
              <span>Prepared by: ___________________________</span>
              <span style="margin-left: 11px"
                >Signature: ___________________________</span
              >
            </div>
            <div class="signature-block">
              <span>Received by: _________________________</span>
              <span style="margin-left: 13px"
                >Signature: _________________________</span
              >
            </div>
          </div>

          <div
            class="approval-section"
            style="color: #622e2e; font-weight: bold"
          >
            <div class="approval-block">
              <span>Approval Bank Deposit: ____________________________</span>
              <span style="margin-left: 58px"
                >Signature: ____________________________</span
              >
            </div>
          </div>
          <div style="position: relative; width: 100%; height: 150px">
            <div
              class="w-32 h-32"
              id="qrCodeImageContainer"
              style="
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: 40px;
                background-color: lightgray;
              "
            >
              QR Code
            </div>
          </div>
        </div>

        <div
          style="
            display: flex;
            justify-content: center;
            margin-top: 25px;
            margin-bottom: 15px;
            color: #622e2e;
            font-weight: bold;
          "
        >
          <div class="footer">
            &copy; {{ new Date().getFullYear() }} Bana Mole. All rights
            reserved.
          </div>
        </div>
      </div>
      <div
        class="vertical-line"
        style="
          width: 2px;
          border-left: 2px dotted #d1d5db;
          height: 100%;
          margin-right: 10px;
        "
      ></div>

      <div
        class="receipt"
        style="margin-right: 10px; margin-top: 10px; margin-bottom: 10px"
      >
        <!-- 
  <div style="border-radius: 5px; font-size: 15px; font-weight: bold; text-align: center; margin: 10px 0; color:white; background-color:#9494b8; padding-top:3px; padding-bottom:3px; display: flex; align-items: center;">
  <img src="../../../../assets/img/banamall2.png" alt="" style="width: 25px; height: 25px; margin-right: 10px;margin-left:10px;">
  <h1 style="margin: 0;">Bana Mall Official Receipt</h1>
</div> -->

        <div style="width: 90%; max-width: 100%; min-width: 100%">
          <img
            src="../../../../assets/img/banaReceipt1.jpg"
            alt=""
            style="max-width: 100%; height: auto; display: block"
          />
        </div>

        <div class="receipt-header" style="background-color: white">
          <div class="info">
            <div class="text" style="margin-left: -10px">
              Bill Code: <span>{{ payment.billCode }}</span>
            </div>
            <div class="text">
              Date(Day-Month-Year):
              <span
                >{{ receiptDate.getDate() }}-{{
                  changeMonthIntoString(receiptDate.getMonth() + 1)
                }}-{{ receiptDate.getFullYear() }}</span
              >
            </div>
          </div>
        </div>

        <h2 class="section-title" style="color: #622e2e; font-weight: bold">
          Company Information
        </h2>
        <div class="grid">
          <div class="box">
            <table class="table" style="color: #622e2e; font-weight: bold">
              <tr>
                <td>Country:</td>
                <td>{{ country }}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{{ city }}</td>
              </tr>
            </table>
          </div>
          <div class="box">
            <table class="table" style="color: #622e2e; font-weight: bold">
              <tr>
                <td>Email:</td>
                <td>{{ email }}</td>
              </tr>
              <tr>
                <td>Tel:</td>
                <td>{{ tel }}</td>
              </tr>
              <tr>
                <td>address:</td>
                <td>{{ address }}</td>
              </tr>
            </table>
          </div>
        </div>

        <h2 class="section-title" style="color: #622e2e; font-weight: bold">
          Payment Information
        </h2>
        <table class="table">
          <tr
            style="
              border-bottom: 1px solid #d1d5db;
              border-top: 1px solid #d1d5db;
            "
          >
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              FullName
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ payment.fullName }}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              UserCode
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ payment.userCode }}
            </td>
          </tr>

          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              Payment Term
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ paymentTerm }}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              RegFee
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ payment.registrationFee }}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              Regular Amount
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ payment.regular.amount }}
            </td>
          </tr>

          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              Subsidy Amount
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ payment.subsidy.amount }}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              Urgent Amount
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ payment.urgent.amount }}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              Service Amount
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ payment.service.amount }}
            </td>
          </tr>

          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              Penality
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ payment.penality.amount }}
            </td>
          </tr>

          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              Total Block
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{
                payment.regular.amount +
                payment.subsidy.amount +
                payment.urgent.amount
              }}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #d1d5db">
            <td
              style="
                color: #333;
                font-weight: bold;
                padding-left: 20px;
                text-align: left;
              "
            >
              Total Service
            </td>
            <td style="padding-right: 20px; text-align: right">
              {{ payment.penality.amount + payment.service.amount }}
            </td>
          </tr>
        </table>
        <div
          class="signature-section"
          style="color: #622e2e; font-weight: bold"
        >
          <div class="signature-row">
            <div class="signature-block">
              <span>Prepared by: ___________________________</span>
              <span style="margin-left: 11px"
                >Signature: ___________________________</span
              >
            </div>
            <div class="signature-block">
              <span>Received by: _________________________</span>
              <span style="margin-left: 13px"
                >Signature: _________________________</span
              >
            </div>
          </div>

          <div
            class="approval-section"
            style="color: #622e2e; font-weight: bold"
          >
            <div class="approval-block">
              <span>Approval Bank Deposit: ____________________________</span>
              <span style="margin-left: 58px"
                >Signature: ____________________________</span
              >
            </div>
          </div>
          <div style="position: relative; width: 100%; height: 150px">
            <div
              class="w-32 h-32"
              id="qrCodeImageContainer1"
              style="
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: 40px;
                background-color: lightgray;
              "
            >
              QR Code
            </div>
          </div>
        </div>

        <div
          style="
            display: flex;
            justify-content: center;
            margin-top: 25px;
            margin-bottom: 15px;
            color: #622e2e;
            font-weight: bold;
          "
        >
          <div class="footer">
            &copy; {{ new Date().getFullYear() }} Bana Mole. All rights
            reserved.
          </div>
        </div>
      </div>
    </div>

    <div class="">
      <div class="py-3 -mt-1 border-t border-blue-500">
        <p class="text-blue-500 font-bold px-4">View and Get Receipt</p>
        <div class="border-t border-blue-900 ml-5 mt-5 px-3">
          <div class="mt-4 flex flex-col space-y-5">
            <div class="flex flex-row w-full bg-blue-100">
              <!-- Left Column: User Information -->
              <div class="text-gray-800 font-semibold py-4 text-md">
                <p>
                  <i
                    class="fas fa-chevron-right mr-3 text-pink-500 ml-1 text-xs"
                  ></i>

                  <span class="text-blue-900 text-xs">
                    User Code:
                    <span class="ml-3">{{ payment.userCode }}</span></span
                  >
                </p>
                <p>
                  <i
                    class="fas fa-chevron-right mr-3 text-pink-500 ml-1 text-xs"
                  ></i>

                  <span class="text-indigo-800 text-xs">
                    Full Name:
                    <span class="ml-3">{{ payment.fullName }}</span></span
                  >
                </p>
                <p>
                  <i class="fas fa-chevron-right mr-3 text-pink-500 ml-1"></i>

                  <span class="text-indigo-800 text-xs">
                    Report For:
                    <span class="ml-3">
                      {{ payment.activeYear }}-{{
                        changeMonthIntoString(receiptDate.getMonth() + 1)
                      }}</span
                    ></span
                  >
                </p>
              </div>
              <!-- Right Column: Print Button -->
              <div class="ml-auto">
                <button
                  @click="printDiv()"
                  class="custom-button mt-8 text-xs mr-16 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  <i class="fas fa-print text-xs"></i> Print
                </button>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full bg-white">
                <thead>
                  <tr class="bg-gray-200">
                    <th
                      class="w-24 px-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Metric
                    </th>
                    <th
                      class="w-24 px-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Amount
                    </th>
                    <th
                      class="w-24 px-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Payment Date
                    </th>
                    <th
                      class="w-32 px-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Days Late
                    </th>

                    <th
                      class="w-32 px-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Bank Type
                    </th>
                    <th
                      class="w-32 px-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      TT Number
                    </th>
                    <th
                      class="w-32 px-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Paid
                    </th>
                    <th
                      class="w-32 px-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p
                        class="bg-blue-100 text-blue-800 px-2 rounded-lg font-bold"
                      >
                        Regular
                      </p>
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p>{{ payment.regular.amount }}</p>
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p>{{ payment.regular.paidAt }}</p>
                    </td>

                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p>{{ payment.regular.daysLate }}</p>
                    </td>

                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      {{ payment.regular.bankType }}
                    </td>

                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      {{ payment.regular.TTNumber }}
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      {{ payment.regular.isPaid }}
                    </td>

                    <td
                      @click="
                        showEditModalDetail(
                          payment.billCode,
                          payment.regular,
                          'regular',
                        )
                      "
                      class="px-3 text-xs text-gray-700 whitespace-nowrap"
                    >
                      <button class="custom-button">
                        <i class="fas fa-edit "></i> Edit
                      </button>
                    </td>
                  </tr>
                  <tr v-if="payment.subsidy.amount > 0">
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p
                        class="bg-cyan-100 text-cyan-800 px-2 rounded-lg font-bold"
                      >
                        Subsidy
                      </p>
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      {{ payment.subsidy.amount }}
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p v-if="payment.subsidy.amount > 0">
                        {{ payment.subsidy.paidAt }}
                      </p>
                      <p v-else>----------------</p>
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p>
                        {{ payment.subsidy.daysLate }}
                      </p>
                    </td>

                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p v-if="payment.subsidy.amount > 0">
                        {{ payment.subsidy.bankType }}
                      </p>
                      <p v-else>--------------</p>
                    </td>

                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p v-if="payment.subsidy.amount > 0">
                        {{ payment.subsidy.TTNumber }}
                      </p>
                      <p v-else>-------------</p>
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p v-if="payment.subsidy.amount > 0">
                        {{ payment.subsidy.isPaid }}
                      </p>
                      <p v-else>Not needed</p>
                    </td>

                    <td
                      v-if="payment.subsidy.amount > 0"
                      class="px-3 text-xs text-gray-700 whitespace-nowrap"
                    >
                      <button
                        @click="
                          showEditModalDetail(
                            payment.billCode,
                            payment.subsidy,
                            'subsidy',
                          )
                        "
                        class="custom-button"
                      >
                        <i class="fas fa-edit "></i> Edit
                      </button>
                    </td>

                    <td
                      v-if="payment.subsidy.amount == 0"
                      class="px-3 text-xs text-gray-700 whitespace-nowrap"
                    >
                      Action Not Needed;
                    </td>
                  </tr>

                  <tr v-if="payment.urgent.amount > 0">
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p
                        class="bg-pink-100 text-blue-800 px-2 rounded-lg font-bold"
                      >
                        Urgent
                      </p>
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      {{ payment.urgent.amount }}
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      {{ payment.urgent.paidAt }}
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      {{ payment.urgent.daysLate }}
                    </td>

                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p v-if="payment.urgent.amount > 0">
                        {{ payment.urgent.bankType }}
                      </p>
                      <p v-else>--------------</p>
                    </td>

                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p v-if="payment.urgent.amount > 0">
                        {{ payment.urgent.TTNumber }}
                      </p>
                      <p v-else>-------------</p>
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p v-if="payment.urgent.amount > 0">
                        {{ payment.urgent.isPaid }}
                      </p>
                      <p v-else>Not needed</p>
                    </td>
                    <td
                      v-if="payment.urgent.amount > 0"
                      class="px-3 text-xs text-gray-700 whitespace-nowrap"
                    >
                      <button
                        @click="
                          showEditModalDetail(
                            payment.billCode,
                            payment.urgent,
                            'urgent',
                          )
                        "
                        class="custom-button"
                      >
                        <i class="fas fa-edit"></i>Edit
                      </button>
                    </td>

                    <td
                      v-if="payment.urgent.amount == 0"
                      class="px-3 text-xs text-gray-700 whitespace-nowrap"
                    >
                      Action Not Needed;
                    </td>
                  </tr>
                  <tr>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p
                        class="bg-yellow-100 text-blue-800 px-2 rounded-lg font-bold"
                      >
                        Service
                      </p>
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      {{ payment.service.amount }}
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      {{ payment.service.paidAt }}
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p v-if="!payment.service.dayslate">
                        {{ payment.service.daysLate }}
                      </p>
                      <p else>0</p>
                    </td>

                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      {{ payment.service.bankType }}
                    </td>

                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      {{ payment.service.TTNumber }}
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      {{ payment.service.isPaid }}
                    </td>
                    <td
                      @click="
                        showEditModalDetail(
                          payment.billCode,
                          payment.service,
                          'service',
                        )
                      "
                      class="px-3 text-xs text-gray-700 whitespace-nowrap"
                    >
                      <button class="custom-button">
                        <i class="fas fa-edit"></i>Edit
                      </button>

                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="overflow-x-auto">
              <table class="">
                <thead>
                  <tr class="bg-gray-200">
                    <th
                      class="w-24 px-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Metric
                    </th>
                    <th
                      class="w-24 px-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Regular Penality
                    </th>
                    <th
                      class="w-24 px-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Subsidy Penality
                    </th>
                    <th
                      class="w-32 px-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Urgent Penality
                    </th>
                    <th
                      class="w-32 px-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Total Penality
                    </th>
                    <th
                      class="w-32 px-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Paid At
                    </th>
                    <th
                      class="w-32 px-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Bank Type
                    </th>
                    <th
                      class="w-32 px-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      TT Number
                    </th>
                    <th
                      class="w-32 px-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Paid
                    </th>
                    <th
                      class="w-32 px-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p
                        class="bg-red-300 text-blue-800 px-2 rounded-lg font-bold"
                      >
                        Penality
                      </p>
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p
                        class="bg-red-100 text-blue-800 px-2 rounded-lg font-bold"
                      >
                        {{ payment.regular.penality }}
                      </p>
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p
                        class="bg-red-100 text-blue-800 px-2 rounded-lg font-bold"
                      >
                        {{ payment.subsidy.penality }}
                      </p>
                    </td>

                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p
                        class="bg-red-100 text-blue-800 px-2 rounded-lg font-bold"
                      >
                        {{ payment.urgent.penality }}
                      </p>
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p
                        class="bg-red-100 text-blue-800 px-2 rounded-lg font-bold"
                      >
                        {{ payment.penality.amount }}
                      </p>
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p v-if="payment.penality.amount > 0">
                        {{ payment.penality.paidAt }}
                      </p>
                      <p v-else>----</p>
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p v-if="payment.penality.amount > 0">
                        {{ payment.penality.bankType }}
                      </p>
                      <p v-else>----</p>
                    </td>

                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p v-if="payment.penality.amount > 0">
                        {{ payment.penality.TTNumber }}
                      </p>
                      <p v-else>----</p>
                    </td>
                    <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                      <p v-if="payment.penality.amount > 0">
                        {{ payment.penality.isPaid }}
                      </p>
                      <p v-else class="text-xxs">Nothing to pay</p>
                    </td>
                    <td v-if="payment.penality.amount > 0"
                      @click="
                        showEditModalDetail(
                          payment.billCode,
                          payment.penality,
                          'penality',
                        )
                      "
                      class="px-3 text-xs text-gray-700 whitespace-nowrap"
                    >
                      <button class="custom-button">
                        <i class="fas fa-edit "></i> Edit
                      </button>
                    </td>
                    <td v-else class="text-xxs">No action needed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showEditModal">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="flex flex-row">
              <div>{{ $t("editBlockAccount") }}</div>
              <div class="ml-32 lg:ml-64">
                <svg
                  @click="showEditModal = !showEditModal"
                  class="w-6 h-6 custom-star hover:text-red-700 transition-colors duration-300 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            <hr class="my-4 md:min-w-full bg-red-500" />

            <div class="">
              <form class="px-5 py-5">
                <div class="mb-4">
                  <label
                    class="block text-xs font-medium text-gray-700 sm:text-base md:text-xs"
                  >
                    Payment Date
                    <span class="custom-star ml-1">*</span>
                  </label>

                  <input
                    @change="fetchPenality(paymentType, paidt)"
                    type="date"
                    class="custom-input"
                    placeholder="Payment Date"
                    v-model="paidAtGC"
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-xs font-medium text-gray-700 sm:text-base md:text-xs"
                  >
                    Bank Type
                    <span class="custom-star ml-1">*</span>
                  </label>

                  <select  v-if="paymentType!='service'" v-model="bankType" class="custom-select">
                    <option value="">Select Bank Type</option>
                    <option 
                     
                      v-for="(bank, index) in blockBanks"
                      :key="'block-' + index"
                      :value="bank.bankType"
                    >
                      {{ bank.bankType }}
                    </option>
                  </select>
                  <select v-else v-model="bankType" class="custom-select">
                    <option value="">Select Bank Type</option>
                    <option 
                     
                      v-for="(bank, index) in serviceBanks"
                      :key="'block-' + index"
                      :value="bank.bankType"
                    >
                      {{ bank.bankType }}
                    </option>
                  </select>
                </div>

                <div class="mb-4">
                  <label
                    class="block text-xs font-medium text-gray-700 sm:text-base md:text-xs"
                  >
                    TTNNumber
                    <span class="custom-star ml-1">*</span>
                  </label>

                  <input
                    type="TTNumber"
                    class="custom-input"
                    placeholder="TTNumber"
                    v-model="TTNumber"
                  />
                </div>

                <div class="mb-4 flex flex-row space-x-3">
                  <input
                    type="checkbox"
                    :checked="!isPaid"
                    @change="toggleIsPaid"
                  />
                  <label
                    class="block text-xs font-medium text-gray-700 sm:text-base md:text-xs"
                  >
                    Make unpaid
                  
                  </label>
                </div>

                <button
                  @click.prevent="saveChanges()"
                  type="submit"
                  class="custom-button"
                >
                  <i class="fas fa-save"
                    ><span class="text-md ml-3"></span></i
                  >
                  Save Changes
                </button>
              </form>
            </div>
            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>


<script>
import QRCode from "qrcode";
import Toast from "../../../Common/Toast.vue"
export default {
  components:{
    Toast,
  },
  data() {
    return {
      //for editing error and success
      isPaid:true,
      showSuccess: false,
      showError: false,
      errorMessage: "",
      successMessage: "",
      selectedPayment: "",

      paidAt: null,
      paidAtGC: null,
      TTNumber: "",
      bankType: "",
      paymentType: "",
      penality: "",
      isPaid:true,
      billCode: "",

      showEditModal: false,

      payload: "",
      //from query or from payment;
      userCode: "",
      activeYear: "",
      activeMonth: "",
   

      // we will try from db then. but now from static
      paymentTerm: "monthly",
      websiteUrl: "https://bannamall.com/",
      email: "",
      country: "Ethipia",
      tel: "",
      address: "",
      city: "Mekelle",

      receiptDate: new Date(),
      payment: {
        fullName: "",
        activeYear: "",
        activeMonth: "",
        userCode: "",
        receiptDate: "",
        billCode: "",
        paymentTerm: "",

        regular: {
          amount: "",
          penality: "",
          paidAt: "",
          bankType: "",
          TTNumber: "",
          isPaid: true,
          daysLate: 3,
        },
        subsidy: {
          amount: "",
          penality: "",
          paidAt: "",
          bankType: "",
          TTNumber: "",
          isPaid: true,
          daysLate: 3,
        },
        urgent: {
          amount: "",
          penality: "",
          paidAt: "",
          bankType: "",
          TTNumber: "",
          isPaid: true,
          daysLate: "",
        },
        service: {
          amount: "",
          penality: "",
          paidAt: "",
          bankType: "",
          TTNumber: "",
          isPaid: true,
          daysLate: "",
        },
        penality: {
          amount: "",
          penality: "",
          paidAt: "",
          bankType: "",
          TTNumber: "",
          isPaid: true,
          daysLate: "",
        },
      },
    };
  },

  created() {
    console.log("In the payment history page");
    this.userCode = this.$route.params.userCode || "Default UserCode";
    this.year = this.$route.query.year || "Default Year";
    this.month = this.$route.query.month || "Default Month";

    console.log("usercode,year,month", this.userCode, this.year, this.month);

    this.$apiClient
      .get("/api/v1/organization")
      .then((response) => {
        console.log("Org response", response);
        if (response.data.status === 1) {
          console.log(
            "Organization email",
            response.data.organization.companyEmail
          );
          this.email = response.data.organization.companyEmail;
          this.tel = response.data.organization.companyPhoneNumber;
          this.address = response.data.organization.companyAddress;
        }
      })
      .catch((error) => {
        console.log("Error", error.message);
        this.organizationCreated = 0;
      });

    this.$apiClient
      .get("/api/v1/payments/paymentbyMonth", {
        params: {
          userCode: this.userCode,
          activeYear: this.year,
          activeMonth: this.month,
        },
      })
      .then((response) => {
        console.log("response pp", response);
        this.payment = response.data.payment;
        console.log("this payment is billcode ", this.payment.billCode);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    serviceBanks() {
      return this.$store.getters.serviceBanks;
    },
    blockBanks() {
      return this.$store.getters.blockBanks;
    },
  },

  methods: {
    toggleIsPaid(event) {
      this.isPaid = !event.target.checked;
    },
    changeMonthIntoString(month) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      console.log("month of month", months[month]);

      if (month >= 1 && month <= 12) {
        return months[month - 1];
      }
      return "Invalid month";
    },
    fetchPenality(paymentType, paidAt) {
      this.$apiClient
        .get("api/v1/payments/penality", {
          params: {
            activeYear: this.selectedPayment.activeYear,
            activeMonth: this.selectedPayment.activeMonth,
            paymentType: paymentType,
            paymentDate: paidAt,
          },
        })
        .then((response) => {
          this.payment.paymentTpe.penality = response.data.message;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showEditModalDetail(
      billCode,
      payment,
      paymentType,
    ) {
      console.log("payment type: ", paymentType);
      this.bankType = payment.bankType;
      this.TTNumber = payment.TTNumber;
      this.paidAt = payment.paidAt;
      this.paymentType = paymentType;
      this.billCode = billCode;
      this.isPaid = payment.isPaid;
      this.paidAtGC = payment.paidAtGC;

      this.showEditModal = true;
    },

    saveChanges() {

      const payment={
        paymentType: this.paymentType,
        paidAt: this.paidAt,
        paidAtGC: this.paidAtGC,
        bankType: this.bankType,
        TTNumber: this.TTNumber,
        isPaid: this.isPaid,
      }
      if (this.paymentType === "regular") {
   
        this.payload = {
          billCode: this.billCode,
          regular: payment,
        };
      }
      if (this.paymentType === "subsidy") {
        this.payload = {
          billCode: this.billCode,
          subsidy:payment,
        };
      }
      if (this.paymentType === "urgent") {
        this.payload = {
          billCode: this.billCode,
          urgent: payment,
        };
      }
      if (this.paymentType === "service") {
        this.payload = {
          billCode: this.billCode,
          service:payment,
        };
      }


      if (this.paymentType === "penality") {
        this.payload = {
          billCode: this.billCode,
          penality: payment,
        };
      }

      
      console.log("ppppPayload", this.payload);

      this.$apiClient
        .patch("/api/v1/payments/update", this.payload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          //alert('k')
          this.$reloadPage();
          console.log("Response from service confirming", response.data);
          console.log("message",response.data.message);
          this.$refs.toast.showSuccessToastMessage(response.data.message);
        })
        .catch((error) => {
          console.log("Error confirming", error);
        });

      this.showEditModal = false;
    },

    async generateQRCodeImage() {
      const qrData = `Bana ${this.paymentTerm} Report,UserCode: ${this.payment.userCode}, Full Name: ${this.payment.fullName},Year:${this.payment.activeYear},Month:${this.payment.activeMonth},BillCode:${this.payment.billCode},Email:${this.Email},Website:${this.websiteUrl}`;
      try {
        // Generate QR code as a data URL (image) without rendering it to a canvas
        const qrCodeImage = await QRCode.toDataURL(qrData, {
          errorCorrectionLevel: "H",
        });

        // You can now use qrCodeImage in an <img> tag directly
        document.getElementById(
          "qrCodeImageContainer"
        ).innerHTML = `<img src="${qrCodeImage}" alt="QR Code" style="height:100px; width:100px;" /> `;
        document.getElementById(
          "qrCodeImageContainer1"
        ).innerHTML = `<img src="${qrCodeImage}" alt="QR Code"  style="height:100px; width:100px;" />`;
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    },

    async printDiv() {
      await this.generateQRCodeImage();
      const printContent = document.getElementById("printable-area").innerHTML;
      const linkElement = document.createElement("link");
      linkElement.href = "/assets/css/tailwind.min.csss";
      linkElement.rel = "stylesheet";
      const printWindow = window.open(
        "",
        "",
        `height=${window.innerHeight},width=${window.innerWidth}`
      );
      printWindow.document.open();
      printWindow.document.write(`
      <html>
        <head>
          <style>
            @media print {
              #printable-area {
                display: flex !important;
                flex-direction: row !important;
                width: 100% !important;
                height:100%;
                
              }
              .receipt {
                flex: 1 !important;
                min-width: 0 !important;
                page-break-inside: avoid; /* Prevents page breaks inside receipts */
              }
              body {
                margin: 0 !important;
                padding: 0 !important;
              }

                 .container {
      display: flex;
      flex-direction: row;
      width: 100%;
     
    }

    .receipt {
      flex: 1;
      padding: 10px;
      border: 1px dotted #622e2e; /* Red dotted border */
    }

    .receipt:nth-child(2) {
      border-left: none;
    }

    .receipt-header {
      background-color: #bbf7d0; /* Light green */
      color: #1d4ed8; /* Dark blue text */
      padding: 10px;
    }

    .receipt-header .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .receipt-header .info .text {
      font-size: 10px;
      font-weight: bold;
    }

    .receipt-header .qr {
      width: 80px;
      height: 80px;
      background: #e5e7eb; /* Placeholder for QR Code */
      margin-left: 10px;
    }

    .section-title {
      font-size: 12px;
      font-weight: bold;
      margin-top: 10px;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px;
      margin-top: 5px;
    }

    .box {
      background: #ffffff;
      border: 1px solid #d1d5db;
      padding: 5px;
    }

    .table {
      width: 100%;
      font-size: 10px;
      border-collapse: collapse;
    }

    .table th,
    .table td {
      padding: 2px;
      text-align: left;
    }

    .table .right {
      text-align: right;
    }

    .signature-section {
      margin-top: 15px;
      font-size: 10px;
    }

    .signature-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .signature-block {
      width: 45%;
      text-align: left;
    }

    .signature-block span {
      display: block;
      margin-bottom: 5px;
    }

    .approval-section {
      margin-top: 10px;
      font-size: 10px;
    }

    .approval-block span {
      display: block;
      margin-bottom: 5px;
    }
              /* Ensure background color is set */
              #printable-area {
                background-color: white; /* Use a solid color or adjust as needed */
              }
            }
          </style>
          ${linkElement.outerHTML} <!-- Include the Tailwind CSS link -->
        </head>
        <body>
          <div id="printable-area">
            ${printContent}
          </div>
        </body>
      </html>
    `);
      printWindow.document.close();
      printWindow.onload = function () {
        printWindow.focus();
        printWindow.print();
      };
      printWindow.onafterprint = function () {
        printWindow.close();
      };
    },
  },
};
</script>
<style>
.fade-enter-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
