<template>
  <body>
    <CommonHeader />
    <div class="window">
      <p><strong>ログイン</strong></p>
      <div class="login">
        <input v-model="email" type="email" value="" placeholder="メールアドレス" required />
        <br />
      </div>
      <div class="login">
        <input v-model="password" type="password" value="" placeholder="パスワード" required />
        <br />
      </div>
      <div class="login">
        <button class="login-button" @click="login">ログイン</button>
      </div>
    </div>
  </body>
</template>


<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('ログインが完了しました')
          this.$router.push('/mypage')
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            // case 'auth/user-disabled':
            //   alert('ユーザーが無効になっています。')
            //   break
            // case 'auth/user-not-found':
            //   alert('ユーザーが存在しません。')
            //   break
            case 'auth/wrong-password':
              alert('パスワードが間違っております。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
    },
  },
}
</script>

<style>

.login {
  margin: 10px 0;
}
.login-button:hover {
  opacity: 0.7;
  transition: 0.3s;
  background: rgb(89, 89, 222);
  color: white;
  border: 1px solid;
  border-radius: 20px;
  padding: 10px 20px;
}
.login-button {
  background: rgb(89, 89, 222);
  color: white;
  border: 1px solid;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>