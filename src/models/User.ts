import firestore from "@react-native-firebase/firestore";
import { Community } from "./Community";
import { Post } from "./Post";
const USERS = firestore().collection("Users");

export class User {
  id?: string;
  mail?: string;
  username?: string;
  password?: string;
  //profilPic: Blob;
  description?: string;
  communityOwned?: Community[];
  communityFollowed?: Community[];
  posts?: Post[];

  private constructor() {}

  public createUserObj(
    mail: string,
    username: string,
    password: string,
    description: string
  ): User {
    this.mail = mail;
    this.username = username;
    this.password = password;
    this.description = description;

    return this;
  }

  addUser() {
    USERS.add({
      mail: this.mail,
      username: this.username,
      password: this.password,
      description: this.description,
    })
      .then((docRef: any) => {
        console.log("Document ajouté avec ID: ", docRef.id);
      })
      .catch((error: any) => {
        console.error("Erreur lors de l'ajout du document: ", error);
      });
  }

  static editUser(id: string, update: {}) {
    USERS.doc(id)
      .update(update)
      .then((docRef: any) => {
        console.log("Document modifié, nouveau doc : ", docRef);
      })
      .catch((error: any) => {
        console.log("Erreur lors de la modification de l'objet", error);
      });
  }

  static deleteUser(id: string) {
    USERS.doc(id)
      .delete()
      .then((docRef: any) => {
        console.log("Document supprimer : ", docRef);
      })
      .catch((error: any) => {
        console.log("Erreur lors de la suppression de l'objet", error);
      });
  }

  static getUser(id: string): User {
    USERS.doc(id)
      .get()
      .then((documentSnapshot) => {
        console.log("User exists: ", documentSnapshot.exists);
        let user: User = Object.assign(new User(), documentSnapshot.data());
        user.id = id;
        return user;
      })
      .catch((error: any) => {
        console.log("Erreur lors de la recuperation via ID", error);
      });
    return new User();
  }

  static getUserByUsername(field: string) {
    USERS.where("username", "==", field)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          console.log(
            "User ID: ",
            documentSnapshot.id,
            documentSnapshot.data()
          );
        });
      })
      .catch((error: any) => {
        console.log("Erreur lors de la recuperation via ID", error);
      });
  }

  addCommunityOwned(community: Community) {
    this.communityOwned = this.communityOwned ?? [];
    this.communityOwned = [...this.communityOwned, community];

    let update = { communityOwned: this.communityOwned };
    if (this.id != undefined) User.editUser(this.id, update);
  }
  addCommunityFollowed(community: Community) {
    this.communityFollowed = this.communityFollowed ?? [];
    this.communityFollowed = [...this.communityFollowed, community];

    let update = { communityFollowed: this.communityFollowed };
    if (this.id != undefined) User.editUser(this.id, update);
  }
  addPosts(post: Post) {
    this.posts = this.posts ?? [];
    this.posts = [...this.posts, post];

    let update = { posts: this.posts };
    if (this.id != undefined) User.editUser(this.id, update);
  }
}
