<template>
  <div>
<!-- -------------------------左　　　側--------------------------- -->
    <div class="flex">
      <div class="container-left">
        <h1><NuxtLink to="/"><img src="/logo.png" alt="画像" width="100px"></NuxtLink></h1>
        <p><NuxtLink class="homettl" to="/">　ホーム</NuxtLink></p><br>
        <a class="logoutttl" @click="logout">　ログアウト</a>
        <div class="share">
          <p>シェア</p><br>
          <validation-observer ref="obs" v-slot="ObserverProps">
            <validation-provider v-slot="ProviderProps" rules="required|max:120">
              <textarea v-model="newPost" name="シェア" cols="30" rows="7" id="share"></textarea><br>
              <div class="error">{{ ProviderProps.errors[0] }}</div>
          　　<button @click="insertPost" :disabled="ObserverProps.invalid || !ObserverProps.validated" class="share-button">シェアする</button>
        　  </validation-provider>
          </validation-observer>
        </div>
      </div>
<!-- -------------------------右　　　側--------------------------- -->
      <div class="container-right">
        <div class="description">
          <p>ホーム</p>
        </div>
        <div class="postdescription">
          <p>{{resData.name}}
            <span class="likebefore" @click="insertLike"></span>
            <span class="likescount">{{resData.likes}}</span>
            <span class="deletebefore" @click="deleteButton"></span>
            <span class="commentpage" @click="commentButton"></span>
          </p><br>
          <p>{{resData.post}}</p>
        </div>
        <div class="description2">
          <p>コメント</p>
        </div>
        <div class="commentdescription" v-for="item in commentCurrent" :key="item.id">
          <p>{{item.name}}</p><br>
          <p>{{item.comment}}</p>
        </div>
        <validation-observer ref="obs" v-slot="ObserverProps">
          <validation-provider v-slot="ProviderProps" rules="required|max:120">
            <div>
              <input v-model="newComment" type="text" class="textcomment" name="コメント">
              <button @click="insertComment" :disabled="ObserverProps.invalid || !ObserverProps.validated" class="comment-button">コメント</button>
            </div>
            <div class="error">{{ ProviderProps.errors[0] }}</div>
          </validation-provider>
        </validation-observer>
      </div>
    </div>
  </div>

</template>

<script>
import firebase from '~/plugins/firebase'
import axios from "axios";
export default {
  data() {
    return {
      userEmail: "",
      clientId: "",
      newPost: "",
      postId: "",
      resData: [],
      updatePostId: "",
      commentCurrent: [],
      newComment: "",
    }
  },

  created() {
    this.getloginInfo();
  },
  mounted() {
    this.getData();
    this.getComment();
    // axios.get("http://127.0.0.1:8000/api/comment/", function (data) {
    //   let res = [];
    //   for(let i =0; i < data.data.data.length; i++) {
    //     if(data.data.data[i]["id"] == this.$route.query.post_id) {
    //       res = res.push(data.data.data[i]);
    //     };
    //     this.commentCurrent = res;
    //   }
    // })


    // axios
    //   .get("http://127.0.0.1:8000/api/comment/",{
    //     params: {
    //       post_id: this.$route.query.post_id
    //     }
    //   })
    //   .then((response) => (this.commentCurrent = response.data.data));
  },

  methods: {
    // -----------↓FireBase↓----------
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
    getloginInfo() {
        firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("sign in");
          this.userEmail = user.email;
        } else {
          console.log("sign out");
          this.$router.replace('/')
        }
      });
    },
    // -----------↑FireBase↑----------

    async getData() {
      const resData = await this.$axios.get("http://127.0.0.1:8000/api/post/");
      let res = [];
      for(let i =0; i < resData.data.data.length; i++) {
        if(resData.data.data[i]["id"] == this.$route.query.post_id) {
          res = resData.data.data[i];
        }
        this.resData = res;
      }
    },

    async getComment() {
      // await axios
      // .get("http://127.0.0.1:8000/api/comment/",{
      //   params: {
      //     post_id: this.$route.query.post_id
      //   }
      // })
      // .then((response) => (this.commentCurrent = response.data.data))
      // .catch(error => console.log(error));
      // console.log(this.$route.query.post_id);
      // console.log(this.commentCurrent);

      const resData = await this.$axios.get("http://127.0.0.1:8000/api/comment/");
      let res = [];
      for(let i =0; i < resData.data.data.length; i++) {
        if(resData.data.data[i]["post_id"] == this.$route.query.post_id) {
          res.push(resData.data.data[i]);
        };
        this.commentCurrent = res;
        console.log(res);
        // console.log(this.$route.query.post_id);
      }
    },


    async getclientInfo() {
      const user = await firebase.auth().currentUser.email;
      console.log(user);
      return user;
    },

    async insertPost() {
      const user = firebase.auth().currentUser;
      if(user !== null) {
        let clientId = 0;
        const email = user.email;
        const clientresData = await this.$axios.get("http://127.0.0.1:8000/api/client/");
        for(let i =0; i < clientresData.data.data.length; i++) {
          if(clientresData.data.data[i]["email"] == email) {
            clientId = clientresData.data.data[i]["id"];
          };
        }

        const sendpostData = {
          post: this.newPost,
          client_id: clientId,
        };
        await this.$axios.post("http://127.0.0.1:8000/api/post/", sendpostData);
        this.newPost = '';
      };
    },

    async insertLike() {
      const user = firebase.auth().currentUser;
      if(user !== null) {
        let clientId = 0;
        const email = user.email;
        const clientresData = await this.$axios.get("http://127.0.0.1:8000/api/client/");
        for(let i =0; i < clientresData.data.data.length; i++) {
          if(clientresData.data.data[i]["email"] == email) {
            clientId = clientresData.data.data[i]["id"];
          };
        }

        const Data = {
          client_email: email,
          client_id: clientId,
          post_id: this.$route.query.post_id,
        }
        await axios
        .post("http://127.0.0.1:8000/api/like/",Data);
        this.getData();
      };
    },

    async deleteButton() {
      const user = firebase.auth().currentUser;
      if(user !== null) {
        let currentuserId = 0;
        const email = user.email;
        const clientresData = await this.$axios.get("http://127.0.0.1:8000/api/client/");
        for(let i =0; i < clientresData.data.data.length; i++) {
          if(clientresData.data.data[i]["email"] == email) {
            currentuserId = clientresData.data.data[i]["id"];
          };
        }

        let postclientId = 0;
        const postresData = await this.$axios.get("http://127.0.0.1:8000/api/post/");
        for(let i =0; i < postresData.data.data.length; i++) {
          if(postresData.data.data[i]["id"] == this.$route.query.post_id) {
            postclientId = postresData.data.data[i]["client_id"];
          };
        }

        if(currentuserId == postclientId) {
          const deletepath = "http://127.0.0.1:8000/api/post/"+this.$route.query.post_id;
          await axios
          .delete(deletepath);
          this.$router.replace('/mypage');
        } else {
          return;
        }
      };
    },

    commentButton() {
      this.$router.push({ path: 'comment' , query: {post_id: this.$route.query.post_id}});
    },

    async insertComment() {
      const user = firebase.auth().currentUser;
      if(user !== null) {
        let clientId = 0;
        const email = user.email;
        const clientresData = await this.$axios.get("http://127.0.0.1:8000/api/client/");
        for(let i =0; i < clientresData.data.data.length; i++) {
          if(clientresData.data.data[i]["email"] == email) {
            clientId = clientresData.data.data[i]["id"];
          };
        }

        const sendpostData = {
          comment: this.newComment,
          client_id: clientId,
          post_id: this.$route.query.post_id,
        };
        await this.$axios.post("http://127.0.0.1:8000/api/comment/", sendpostData);
        this.newComment = '';
        this.getComment();
      };
    },

  },
}
</script>

<style>
.flex {
  display: flex;
}
.container-left {
  color: white;
  margin-right: 20px;
}
.container-right {
  color: white;
  width: 100%;
}
.homettl {
  text-decoration: none;
  color: white;
}
.homettl::before {
  margin-left: 10px;
  content: "";
  background: url(/home.png);
  background-size: cover;
  vertical-align: bottom;
  height: 20px;
  width: 20px;
  display: inline-block;
}
.logoutttl {
  cursor: pointer;
}
.logoutttl::before {
  margin-left: 10px;
  content: "";
  background: url(/logout.png);
  background-size: cover;
  vertical-align: bottom;
  height: 20px;
  width: 20px;
  display: inline-block;
}

.likebefore::before {
  content: "";
  background: url(/heart.png);
  background-size: cover;
  vertical-align: middle;
  height: 20px;
  width: 20px;
  display: inline-block;
  margin-left: 5px;
}

.likescount {
  margin-left: 5px;
}

.deletebefore::before {
  content: "";
  background: url(/cross.png);
  background-size: cover;
  vertical-align: middle;
  height: 20px;
  width: 20px;
  display: inline-block;
  margin-left: 5px;
}

.commentpage::before {
  content: "";
  background: url(/detail.png);
  background-size: cover;
  vertical-align: middle;
  height: 20px;
  width: 25px;
  display: inline-block;
  margin-left: 40px;
}

.share {
  padding: 30px 0 0 10px;
  position: relative;
}

.textshare {
  resize:none;
  background: rgb(31, 33, 42);
  border-radius: 10px;
  color: white;
}

.share-button {
  margin-top: 20px;
  background: rgb(89, 89, 222);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  position: absolute;
  right: 0%;
  cursor: pointer;
}

.description {
  border: 1px solid rgb(129, 129, 129);
  border-top: none;
  border-right: none;
  padding: 15px 10px;
}

.description2 {
  border: 1px solid rgb(129, 129, 129);
  border-top: none;
  border-right: none;
  padding: 15px 10px;
  text-align: center;
}

.postdescription {
  border: 1px solid rgb(129, 129, 129);
  padding: 15px 10px;
  border-top: none;
  border-right: none;
}

li {
  list-style-type: none;
}

.commentdescription {
  border: 1px solid rgb(129, 129, 129);
  padding: 15px 10px;
  border-top: none;
  border-right: none;
}

.comment-button {
  margin-top: 70px;
  background: rgb(89, 89, 222);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  position: absolute;
  right: 0%;
  cursor: pointer;
}

.textshare {
  resize:none;
  background: rgb(31, 33, 42);
  border-radius: 10px;
  color: white;
}

.textcomment {
  background: rgb(31, 33, 42);
  border-radius: 10px;
  color: white;
  margin: 20px;
  width: 90%;
}

</style>