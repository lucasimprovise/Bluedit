import firestore from "@react-native-firebase/firestore";
import { User } from "./User";
import { Post } from "./Post";
const COMMENTS = firestore().collection("Comments");

export class Comments {
  id?: string;
  author?: User;
  date?: Date;
  parentPost?: Post | Comments;
  content?: string;

  private constructor() {}

  createCommentObj(author: User, parentPost: Post | Comments, content: string) {
    this.author = author;
    this.parentPost = parentPost;
    this.content = content;
    this.date = new Date();

    return this;
  }

  addComments() {
    COMMENTS.add({
      author: this.author,
      date: this.date,
      parentPost: this.parentPost,
      content: this.content,
    })
      .then((docRef: any) => {
        console.log("Document ajouté avec ID: ", docRef.id);
      })
      .catch((error: any) => {
        console.error("Erreur lors de l'ajout du document: ", error);
      });
  }

  static deleteComment(id: string) {
    COMMENTS.doc(id)
      .delete()
      .then((docRef: any) => {
        console.log("Document supprimer : ", docRef);
      })
      .catch((error: any) => {
        console.log("Erreur lors de la suppression de l'objet", error);
      });
  }

  static getComment(id: string): Comments {
    COMMENTS.doc(id)
      .get()
      .then((documentSnapshot) => {
        console.log("User exists: ", documentSnapshot.data());
        let comment: Comments = Object.assign(
          new Comments(),
          documentSnapshot.data()
        );
        comment.id = id;
        return comment;
      })
      .catch((error: any) => {
        console.log("Erreur lors de la recuperation via ID", error);
      });
    return new Comments();
  }
}
