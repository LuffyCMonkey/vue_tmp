<template>

  <div class="main-content">
    <div class="main-content__top">
      <h1 class="main-content__title">
        Image blocking
      </h1>
    </div>
    <div id="diStatusInfo" class="main-content__body">
      <p>Search Blocking Image
        <button type="button" v-on:click="sendFileList(null)">Search</button>
      </p>
      <br />
      <tr>
        <td>File ID :  </td>
        <td>
          <label for="ipFileId"></label><input id="ipFileId" type="text" size="20" v-model="inFileId"/>
        </td>
        <td> DEL Fl : </td>
        <td>
          <!-- <input id="ipDelFl" type="text" size="20" value="N"/> -->
          <select id="seDelFl">
            <option value="Y">이미지 차단</option>
            <option value="N">차단 해제</option>
          </select>
          <button type="button" id="btnSendPost" >단일 차단</button>
        </td>
      </tr>

      <!-- *******************************Tcp 통신 확인 - Get********************************************-->
      <br />
      <p>Search for star or user name</p>
      <tr>
        <td>Star Name : </td>
        <td>
          <label>
            <input type="text" size="20" v-model="inStarNm"/>
          </label>
        </td>

        <td>User Name : </td>
        <td>
          <label>
            <input type="text" size="20" v-model="inUserNm"/>
          </label>
          <button type="button" id="btnCkDeleteStarImageFile" >선택한 파일 차단</button>
        </td>
      </tr>
      <br/>
      <br/>
      <tr >
        <div class="gridClass">
          <table id="imgTable" board="1" style="height:auto; width:100%; auto; display: flex"  >
            <thead>
            <tr>
              <td width="50">순번<input type="checkbox" name="ckAll"></td>
              <td width="150">파일 아이디</td>
              <td width="100">스타 이름</td>
              <td width="100">사용자 이름</td>
              <td width="160" >경로+이미지명</td>
              <td width="70" >삭제 여부</td>
            </tr>
            <tr v-for="(star, index) in resultData" v-bind:key="index">
              <td width="50"><input type="checkbox" v-bind:name="index"></td>
              <td width="150">{{star.file_id}}</td>
              <td width="100">{{star.star_nm}}</td>
              <td width="100">{{star.nick_nm}}</td>
              <td width="160" ><img v-bind:src="star.file_path_original+star.file_nm_original" witdh='150' height='100'></td>
              <td width="70" >{{star.del_fl}}</td>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </tr>
    </div>
    <div class="footerBlockImage">
      <div id="footDiv" class="pagination" >
        <a id='prev' class='preNextTag' v-on:click="preNext('preFl')">&laquo;</a>
        <a class='aTag' v-for="(firstNum) in lastNum" v-bind:key="firstNum"  v-on:click="sendFileList(firstNum)" id=" + firstNum + ">{{firstNum}}</a>
        <a id='next' class='preNextTag' v-on:click="preNext('Next')">&raquo;</a>
      </div>
    </div>
  </div>

</template>

<script >
let url = 'adding Http Url'
let urlDetail = ''
let resultJsonMsg = ''
let pageCount = 10 // 한 화면에 나타낼 페이지 수
// console.log('url :  ' + url)

export default {
  name: 'blockImage',
  filters: {
  },
  created: function () {
    this.maxStarFileCnt()
  },
  data: function () {
    return {
      currentPageCnt: 0,
      firstNum: 0,
      lastNum: 0,
      inFileId: '',
      inUserNm: '',
      inStarNm: '',
      resultMaxPageCount: 0,
      resultData: []
    }
  },
  methods: {
    sendFileList: function (pValue) {
      let self = this
      let searchUrl = ''
      self.resultData = []
      if (pValue) {
        urlDetail = ''
      } else {
        urlDetail = ''
      }
      // console.log('urlDetail   : ' + urlDetail)

      this.$http.get(searchUrl.concat(url, 'blockingImageFile', urlDetail), {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }})
        .then(function (result) {
          resultJsonMsg = JSON.stringify(result.data.data)
          self.resultData = JSON.parse(resultJsonMsg)
        })
        .catch(function (exception) {
          console.log('ex :  ' + exception)
        })
    },
    maxStarFileCnt: function () {
      let self = this
      let searchUrl = ''
      urlDetail = '?user_nm=' + self.inUserNm + '&star_nm=' + self.inStarNm
      // console.log('urlDetail   : ' + urlDetail)

      this.$http.get(searchUrl.concat(url, 'maxStarFileCnt', urlDetail), {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }})
        .then(function (result) {
          self.resultMaxPageCount = parseInt(0)
          self.lastNum = parseInt(0)
          console.log('resultMaxPageCount   : ' + self.resultMaxPageCount)
          self.currentPageCnt = 0
        })
        .catch(function (exception) {
          console.log('ex :  ' + exception)
        })
    },
    preNext: function (preNextFl) {
      let maxNum = Math.ceil(this.resultMaxPageCount / pageCount)
      if (preNextFl === 'preFl') {
        this.currentPageCnt = this.currentPageCnt - 1
        if (this.currentPageCnt < 0) {
          this.currentPageCnt = 0
        }
      } else {
        this.currentPageCnt = this.currentPageCnt + 1
        if (this.currentPageCnt >= maxNum) {
          this.currentPageCnt = maxNum - 1
        }
      }

      if (this.currentPageCnt > (this.currentPageCnt * pageCount) + 1) {
        this.firstNum = 1
      } else {
        this.firstNum = (this.currentPageCnt * pageCount) + 1
      }

      if (this.resultMaxPageCount < (this.currentPageCnt + 1) * pageCount) {
        this.lastNum = this.resultMaxPageCount
      } else {
        this.lastNum = (this.currentPageCnt + 1) * pageCount
      }
    }
  }
}
</script>
