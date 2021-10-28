<template>
    <div class="homecontainer">
        <CommonHeader />
        <NuxtLink to="/"><img class="homelogo" src="/logo.png" alt="画像" width="100px"></NuxtLink>
        <p class="main-title">掲示板型SNSサービス</p>
        <div class="window">
            <NuxtLink class="main" to="/register"><p>新規登録</p></NuxtLink>
            <br />
            <NuxtLink class="main" to="/login"><p>ログイン</p></NuxtLink>
            <br />
            <NuxtLink class="main" to="/mypage"><p>マイページへ</p></NuxtLink>
        </div>
    </div>
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
  // data() {
  //   return {
  //     loginCheck: false,
  //     message: 'ログインができておりません',
  //   }
  // },
  // created() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.message = 'ログイン済みです',
  //       this.loginCheck = true
  //     }
  //   })
  // },
}
</script>

<style>
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

.homecontainer {
  color: white;
  text-align: center;
  margin: 10px;
}
.homelogo {
  width: 100%;
  height: auto;
}
.main-title {
  margin: 20px;
  font-size: 30px;
}
.main {
  margin: 20px;
  font-size: 20px;
  color: #000;
  text-decoration: none;
}
</style>