<template>
  <header>
    <h1 class="title"><NuxtLink to="/"><img src="/logo.png" alt="画像" width="100px"></NuxtLink></h1>
    <nav class="nav">
      <ul class="menu-group">
        <li class="menu-item" v-if="!loginCheck">
          <NuxtLink to="/register">新規登録</NuxtLink>
        </li>
        <li class="menu-item" v-if="!loginCheck">
          <NuxtLink to="/login">ログイン</NuxtLink>
        </li>
        <li class="menu-item" v-else>
          <a @click="logout">ログアウト</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      loginCheck: false,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loginCheck = true
      }
    })
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('ログアウトが完了しました')
          this.loginCheck = false
          this.$router.replace('/')
        })
    },
  },
};
</script>

<style scoped>

/* ----------------------リセット---------------------------- */
html, body, div, span, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
abbr, address, cite, code,
del, dfn, em, img, ins, kbd, q, samp,
small, strong, sub, sup, var,
b, i,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure,
footer, header, hgroup, menu, nav, section, summary,
time, mark, audio, video {
    margin:0;
    padding:0;
    border:0;
    outline:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
}

body {
    line-height:1;
}

article,aside,details,figcaption,figure,
footer,header,hgroup,menu,nav,section {
    display:block;
}

nav ul {
    list-style:none;
}

blockquote, q {
    quotes:none;
}

blockquote:before, blockquote:after,
q:before, q:after {
    content:'';
    content:none;
}

a {
    margin:0;
    padding:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
}

/* change colours to suit your needs */
ins {
    background-color:#ff9;
    color:#000;
    text-decoration:none;
}

/* change colours to suit your needs */
mark {
    background-color:#ff9;
    color:#000;
    font-style:italic;
    font-weight:bold;
}

del {
    text-decoration: line-through;
}

abbr[title], dfn[title] {
    border-bottom:1px dotted;
    cursor:help;
}

table {
    border-collapse:collapse;
    border-spacing:0;
}

/* change border colour to suit your needs */
hr {
    display:block;
    height:1px;
    border:0;
    border-top:1px solid #cccccc;
    margin:1em 0;
    padding:0;
}

input, select {
    vertical-align:middle;
}
/* -------------------------------------------------- */

header {
  display: flex;
  height: 50px;
  padding: 0 10px;
  margin-bottom: 10px;
  background-color: rgb(31, 33, 42);
  align-items: center;
}
.title {
  margin-right: auto;
}
.menu-item {
  list-style: none;
  display: inline-block;
  padding: 10px;
}
.menu-item a {
  color: rgb(255, 255, 255);
  text-decoration: none;
  cursor: pointer;
}
</style>