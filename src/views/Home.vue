<template>

  <div class="main-content">

    <div class="main-content__top">
      <h1 class="main-content__title">
        Status Information
      </h1>
    </div>

    <div id="diStatusInfo" class="main-content__body">
      <p>
        <strong>User information page (Real Time)</strong>
        <button class="searchBtn" id="btnSearch" v-on:click="sendServer">Search</button>
      </p>
      <table class="statusInfoTable">
        <tr>
          <td>신규 회원 : </td>
          <td>
            <input :value="resultNewUserCnt | numberComma" style="width: 98%" type="text" class="textFont textFontWeight fontGreen">
          </td>
          <td>누적 회원 : </td>
          <td>
            <input :value="resultTotUserCnt | numberComma" style="width: 95%" type="text"  class="textFont textFontWeight fontBlack"/>
          </td>
        </tr>
        <tr>
          <td>신규 이미지 :  </td>
          <td>
            <input :value="resultNewUserProfileCnt | numberComma" style="width: 98%" type="text" class="textFont textFontWeight fontGreen"/>
          </td>
          <td>누적 이미지 :  </td>
          <td>
            <input :value="resultTotUserProfileCnt | numberComma" style="width: 95%" type="text" class="textFont textFontWeight fontBlack"/>
          </td>
        </tr>
        <tr>
          <td>지급 예정 POINT : </td>
          <td>
            <input style="width: 98%" :value="resultTotToBePaid | numberComma" type="text" class="textFont textFontWeight fontBlue">
          </td>
          <td>신규 지급 POINT : </td>
          <td>
            <input style="width: 95%" :value="resultNewPaymentPoint | numberComma" type="text"   class="textFont textFontWeight fontGreen"/>
          </td>
        </tr>
        <tr>
          <td>누적 지급 POINT :  </td>
          <td colspan='3'>
            <!--<input id="ipAccumulatePoint" v-model="tot_point" style="width: 99%" type="text"  class="textFont textFontWeight fontBlack"/>-->
            <input  :value="resultTotPoint | numberComma" style="width: 99%" type="text"  class="textFont textFontWeight fontBlack"/>
          </td>
        </tr>
      </table>
      <br />
      <table class="statusInfoTable_2">
        <tr>
          <td colspan='2'>UP Amount/Volume (24H)</td>
          <td colspan='2'> Down Amount/Volume (24H)</td>
        </tr>
        <tr>
          <td>
            <input style="width: 95%" :value="resultNewDownVol | numberComma" type="text" size="20" class="textFont fontBlack"/>
          </td>
          <td>
            <input style="width: 95%" :value="resultNewDownAmount | numberComma" type="text" size="20" class="textFont fontRed"/>
          </td>
          <td>
            <input style="width: 95%" :value="resultNewUpVol | numberComma" type="text" size="20" class="textFont fontBlack"/>
          </td>
          <td>
            <input style="width: 95%" :value="resultNewUpAmount | numberComma" type="text" size="20" class="textFont fontBlue"/>
          </td>
        </tr>
        <tr>
          <td colspan='2'>UP Amount/Volume (누적)</td>
          <td colspan='2'> Down Amount/Volume (누적)</td>
        </tr>
        <tr>
          <td>
            <input style="width: 95%" :value="resultTotDownHoldVol | numberComma" type="text" size="20" class="textFont fontBlack"/>
          </td>
          <td>
            <input style="width: 95%" :value="resultTotDownAmt | numberComma" type="text" size="20" class="textFont fontRed"/>
          </td>
          <td>
            <input style="width: 95%" :value="resultTotUpHoldVol | numberComma" type="text" size="20" class="textFont fontBlack"/>
          </td>
          <td>
            <input style="width: 95%" :value="resultTotUpAmt | numberComma" type="text" size="20" class="textFont fontBlue"/>
          </td>
        </tr>
      </table>
      <br />
      <p>
        * 현 정보는 UTC(경도 0,0)를 기준으로 실시간 24시간 정보입니다.
      </p>

    </div>

  </div>

</template>

<script >
let url = 'adding Http Url'
let resultJsonMsg = ''
let resultJsonData = []
// console.log('url :  ' + url)

export default {
  name: 'home',
  filters: {
    numberComma: value => {
      if (!value) return 0
      return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
    }
  },
  data: function () {
    return {
      resultNewUserCnt: 0,
      resultTotUserCnt: 0,
      resultNewUserProfileCnt: 0,
      resultTotUserProfileCnt: 0,
      resultTotPoint: 0,
      resultNewPaymentPoint: 0,
      resultTotToBePaid: 0,
      resultNewDownAmount: 0,
      resultNewDownVol: 0,
      resultNewUpAmount: 0,
      resultNewUpVol: 0,
      resultTotDownAmt: 0,
      resultTotDownHoldVol: 0,
      resultTotUpAmt: 0,
      resultTotUpHoldVol: 0
    }
  },
  methods: {
    sendServer: function () {
      let self = this
      this.$http.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }})
        .then(function (result) {
          console.log('response :  ' + JSON.stringify(result.data.data))
          /* API 통신 데이터 가져 오기 */
          resultJsonMsg = JSON.stringify(result.data.data)
          resultJsonData = JSON.parse(resultJsonMsg)

          /* 회원 */
          self.resultNewUserCnt = resultJsonData[0].tot_cnt
          self.resultTotUserCnt = '위 형식으로 데이터 바인딩'
          /* 이미지 */
          self.resultNewUserProfileCnt = ''
          self.resultTotUserProfileCnt = ''
          /* 포인트 */
          self.resultTotPoint = ''
          self.resultNewPaymentPoint = ''
          self.resultTotToBePaid = ''
          /* Up Amount 24 */
          self.resultNewDownAmount = ''
          self.resultNewDownVol = ''
          self.resultNewUpAmount = ''
          self.resultNewUpVol = ''
          /* Up Amount 누적 */
          self.resultTotDownAmt = ''
          self.resultTotDownHoldVol = ''
          self.resultTotUpAmt = ''
          self.resultTotUpHoldVol = ''
        })
        .catch(function (exception) {
          console.log('ex :  ' + exception)
        })
    }
  }
}

</script>
