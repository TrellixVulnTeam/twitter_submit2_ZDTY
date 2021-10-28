<template>
  <validation-observer ref="obs" v-slot="ObserverProps">
    <body>
      <CommonHeader />
      <div class="window">

        <p><strong>新規登録</strong></p>

        <validation-provider v-slot="ProviderProps" rules="required|max:20">
          <div class="register">
            <input v-model="name" id="name" type="text" name="ユーザーネーム" value="" placeholder="ユーザーネーム">
            <br />
          </div>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>

        <validation-provider v-slot="ProviderProps" rules="required">
          <div class="register">
            <input v-model="email" id="email" type="email" name="メールアドレス" value="" placeholder="メールアドレス">
            <br />
          </div>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>

        <validation-provider v-slot="ProviderProps" rules="required|min:6">
          <div class="register">
            <input v-model="password" id="password" type="password" name="パスワード" value="" placeholder="パスワード">
            <br />
          </div>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>

        <div>
          <button class="register-button" @click="register(); insertClient()" :disabled="ObserverProps.invalid || !ObserverProps.validated">新規登録</button>
        </div>
      </div>
    </body>


  </validation-observer>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  auth: false,
  data() {
    return {
      name: null,
      email: null,
      password: null,
      clientId: "",
    }
  },
  methods: {
    register() {
      // if (!this.email || !this.password) {
      //   alert('メールアドレスまたはパスワードが入力されていません。')
      //   return
      // }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.sendEmailVerification().then(() => {
            alert('登録が完了しました。')
            this.$router.replace('/mypage')
          })
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/email-already-in-use':
              alert('このメールアドレスはすでに使われています。')
              break
            case 'auth/weak-password':
              alert('パスワードは6文字以上で入力してください。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
    },

    async insertClient() {
      const sendclientData = {
        name: this.name,
        email: this.email,
      };
      await this.$axios.post("http://127.0.0.1:8000/api/client/", sendclientData);
    },
  },
}
</script>

<style>
body {
  background: rgb(31, 33, 42);
}
.window {
  background: white;
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  text-align: center;
  border: 1px rgb(31, 33, 42);
  border-radius: 5px;
}

.register {
  margin: 10px 0;
}

input {
  border: 1px solid;
  width: 250px;
  padding: 10px;
  border-radius: 10px;
}
.register-button:hover {
  opacity: 0.7;
  transition: 0.3s;
  background: rgb(89, 89, 222);
  color: white;
  border: 1px solid;
  border-radius: 20px;
  padding: 10px 20px;
}
.register-button {
  background: rgb(89, 89, 222);
  color: white;
  border: 1px solid;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
}

</style>