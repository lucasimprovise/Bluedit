import firestore from '@react-native-firebase/firestore';
import {User} from './User';
import {Community} from './Community';
import {Comments} from './Comments';
const POSTS = firestore().collection('Posts');

export class Post {
  id: string | undefined;
  title: string;
  content: string;
  upVote: number;
  downVote: number;
  date: Date;
  author: User;
  community: Community;
  comments: Comments | undefined;

  constructor(
    title: string,
    content: string,
    author: User,
    community: Community,
  ) {
    this.title = title;
    this.content = content;
    this.author = author;
    this.upVote = 0;
    this.downVote = 0;
    this.date = new Date();
    this.community = community;
  }

  createPost() {
    POSTS.add({
      title: this.title,
      content: this.content,
      upVote: this.upVote,
      downVote: this.downVote,
      date: this.date,
      author: this.author,
      community: this.community,
    })
      .then((docRef: any) => {
        console.log('Document ajouté avec ID: ', docRef.id);
      })
      .catch((error: any) => {
        console.error("Erreur lors de l'ajout du document: ", error);
      });
  }

  static deletePost(id: string) {
    POSTS.doc(id)
      .delete()
      .then((docRef: any) => {
        console.log('Document supprimer : ', docRef);
      })
      .catch((error: any) => {
        console.log("Erreur lors de la suppression de l'objet", error);
      });
  }

  static getPost(id: string) {
    POSTS.doc(id)
      .get()
      .then(documentSnapshot => {
        console.log('Tag exists: ', documentSnapshot.data());
      })
      .catch((error: any) => {
        console.log('Erreur lors de la recuperation via ID', error);
      });
  }

  static getPostByTitle(field: string) {
    POSTS.where('username', '==', field)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log('Tag ID: ', documentSnapshot.id, documentSnapshot.data());
        });
      })
      .catch((error: any) => {
        console.log('Erreur lors de la recuperation via ID', error);
      });
  }
}
