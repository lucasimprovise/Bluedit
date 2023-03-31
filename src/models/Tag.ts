import firestore from "@react-native-firebase/firestore";
const TAGS = firestore().collection("Tags");

export class Tag {
  id: string | undefined;
  title?: string;

  private constructor() {}

  public createTagObj(title: string) {
    this.title = title;
    return this;
  }

  addTag() {
    TAGS.add({
      title: this.title,
    })
      .then((docRef: any) => {
        console.log("Document ajouté avec ID: ", docRef.id);
      })
      .catch((error: any) => {
        console.error("Erreur lors de l'ajout du document: ", error);
      });
  }

  static deleteTag(id: string) {
    TAGS.doc(id)
      .delete()
      .then((docRef: any) => {
        console.log("Document supprimer : ", docRef);
      })
      .catch((error: any) => {
        console.log("Erreur lors de la suppression de l'objet", error);
      });
  }

  static getTag(id: string) {
    TAGS.doc(id)
      .get()
      .then((documentSnapshot) => {
        console.log("Tag exists: ", documentSnapshot.data());
        let tag: Tag = Object.assign(new Tag(), documentSnapshot.data());
        tag.id = documentSnapshot.id;
        return tag;
      })
      .catch((error: any) => {
        console.log("Erreur lors de la recuperation via ID", error);
      });
    return new Tag();
  }

  static getTagByTitle(field: string) {
    TAGS.where("username", "==", field)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          console.log("Tag ID: ", documentSnapshot.id, documentSnapshot.data());
        });
      })
      .catch((error: any) => {
        console.log("Erreur lors de la recuperation via ID", error);
      });
  }
}
