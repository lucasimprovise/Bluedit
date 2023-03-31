import firestore from '@react-native-firebase/firestore';
import {Community} from './Community';
import {Post} from './Post';
const USERS = firestore().collection('Users');

export class User {
  id: string | undefined;
  mail: string;
  username: string;
  password: string;
  //profilPic: Blob;
  description: string;
  communityOwned: Community[] | undefined;
  communityFollowed: Community[] | undefined;
  posts: Post[] | undefined;

  public constructor(
    mail: string,
    username: string,
    password: string,
    description: string,
  ) {
    this.mail = mail;
    this.username = username;
    this.password = password;
    this.description = description;
  }

  addUser() {
    USERS.add({
      mail: this.mail,
      username: this.username,
      password: this.password,
      description: this.description,
    })
      .then((docRef: any) => {
        console.log('Document ajouté avec ID: ', docRef.id);
      })
      .catch((error: any) => {
        console.error("Erreur lors de l'ajout du document: ", error);
      });
  }

  static editUser(id: string, update: {}) {
    USERS.doc(id)
      .update(update)
      .then((docRef: any) => {
        console.log('Document modifié, nouveau doc : ', docRef);
      })
      .catch((error: any) => {
        console.log("Erreur lors de la modification de l'objet", error);
      });
  }

  static deleteUser(id: string) {
    USERS.doc(id)
      .delete()
      .then((docRef: any) => {
        console.log('Document supprimer : ', docRef);
      })
      .catch((error: any) => {
        console.log("Erreur lors de la suppression de l'objet", error);
      });
  }

  static getUser(id: string) {
    USERS.doc(id)
      .get()
      .then(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);
      })
      .catch((error: any) => {
        console.log('Erreur lors de la recuperation via ID', error);
      });
  }

  static getUserByUsername(field: string) {
    USERS.where('username', '==', field)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
        });
      })
      .catch((error: any) => {
        console.log('Erreur lors de la recuperation via ID', error);
      });
  }

  addCommunityOwned() {}
  addCommunityFollowed() {}
  addPosts() {}
}
