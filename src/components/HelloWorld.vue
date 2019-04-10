<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <p><input v-model="msg"/></p>
    <p><input v-bind:value="msg"/></p>
    <p>{{msg}}</p>

    <button class="searchBtn" id="btnSearch" @click="sendServer">Search</button>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
let tmpStr = 'tmp_world'
let url = 'http://localhost:3500/batch/v001/statusInformationStardaq'
let resultJsonMsg = ''
let resultJsonData = []
let totPointStr = '0'

export default {
  name: 'HelloWorld',
  data: () => {
    return {
      msg: tmpStr
    }
  },
  methods: {
    sendServer: function () {
      this.msg = 'Change World...'
      let self = this
      this.$http.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }})
        .then(function (result) {
          console.log('response :  ' + JSON.stringify(result.data.data[0]))
          resultJsonMsg = JSON.stringify(result.data.data)
          console.log('stringMsg :  ' + JSON.stringify(resultJsonMsg))
          resultJsonData = JSON.parse(resultJsonMsg)
          console.log('resultJsonData :  ' + resultJsonData[2][0].tot_point)
          totPointStr = resultJsonData[2][0].tot_point
          console.log('totPoint :  ' + totPointStr)
          self.msg = totPointStr
        })
        .catch((exception) => {
          console.log('ex :  ' + exception)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
