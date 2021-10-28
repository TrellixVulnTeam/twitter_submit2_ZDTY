<template>
  <div>
<!-- -------------------------左　　　側--------------------------- -->
    <div class="flex">
      <div class="container-left">
        <h1><NuxtLink to="/"><img src="/logo.png" alt="画像" width="100px"></NuxtLink></h1>
        <p><NuxtLink class="homettl" to="/">　ホーム</NuxtLink></p><br>
        <a class="logoutttl" @click="logout">　ログアウト</a>
        <validation-provider v-slot="ProviderProps" rules="required|max:120">
          <div class="share">
            <p>シェア</p><br>
            <textarea v-model="newPost" name="シェア" cols="30" rows="7" id="share"></textarea><br>
            <button @click="insertPost" class="share-button">シェアする</button>
          </div>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>
        
      </div>
<!-- -------------------------右　　　側--------------------------- -->
      <div class="container-right">
        <div class="description">
          <p>ホーム</p>
        </div>
        <div class="postdescription" v-for="item in postCurrent" :key="item.id">
          <p>{{item.name}}
            <span class="likebefore" @click="insertLike(item.id)"></span>
            <span class="likescount">{{item.likes}}</span>
            <span class="deletebefore" @click="deleteButton(item.id)"></span>
            <span class="commentpage" @click="commentButton(item.id)"></span>
          </p><br>
          <p>{{item.post}}</p>
          <!-- <NuxtLink class="commentpage" to="/comment"></NuxtLink></span> -->
        </div>
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
      post_id: "",
      userEmail: "",
      clientId: "",
      newPost: "",
      postId: "",
      postCurrent: [],
      updatePostId: "",
    }
  },

  created() {
    this.getloginInfo();
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/post/")
      .then((response) => (this.postCurrent = response.data.data));
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
    async getclientInfo() {
      const user = await firebase.auth().currentUser.email;
      console.log(user);
      return user;
    },

    async getPost() {
      // postデータの取得
      const postresData = await this.$axios.get("http://127.0.0.1:8000/api/post/");
      this.postCurrent = postresData.data.data;
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

        this.getPost();
      };
    },

    insertLike: async function(item_id) {
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
          client_email: this.userEmail,
          client_id: clientId,
          post_id: item_id,
        }
        await axios
        .post("http://127.0.0.1:8000/api/like/",Data);
        await axios
        .get("http://127.0.0.1:8000/api/post/")
        .then((response) => (this.postCurrent = response.data.data));
      };
    },

    deleteButton: async function(item_id) {
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
          if(postresData.data.data[i]["id"] == item_id) {
            postclientId = postresData.data.data[i]["client_id"];
          };
        }

        if(currentuserId == postclientId) {
          const deletepath = "http://127.0.0.1:8000/api/post/"+item_id;
          await axios
          .delete(deletepath);
          this.getPost();
        } else {
          return;
        }
      };
    },

    commentButton: function(item_id) {
      this.$router.push({ path: 'comment' , query: {post_id: item_id}});
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

textarea {
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

.postdescription {
  border: 1px solid rgb(129, 129, 129);
  padding: 15px 10px;
  border-top: none;
  border-right: none;
}

li {
  list-style-type: none;
}

</style>