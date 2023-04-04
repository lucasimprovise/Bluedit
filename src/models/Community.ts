import firestore from "@react-native-firebase/firestore";
import { User } from "./User";
import { Tag } from "./Tag";
import { Post } from "./Post";
const COMMUNITY = firestore().collection("Communitys");

export class Community {
  id?: string;
  name?: string;
  creator?: User;
  tags?: Tag[];
  members?: User[];
  description?: string;
  posts?: Post[];
  date?: Date;

  private constructor() {}

  createCommunityObj(
    name: string,
    tags: Tag[],
    creator: User,
    description: string
  ) {
    this.name = name;
    this.creator = creator;
    this.description = description;
    this.tags = tags;
    this.date = new Date();

    return this;
  }

  createCommunity() {
    COMMUNITY.add({
      name: this.name,
      creator: this.creator,
      tags: this.tags,
      members: null,
      desciption: this.description,
      posts: null,
      date: this.date,
    })
      .then((docRef: any) => {
        console.log("Document ajouté avec ID: ", docRef.id);
        this.creator?.addCommunityOwned(Community.getCommunity(docRef.id));
      })
      .catch((error: any) => {
        console.error("Erreur lors de l'ajout du document: ", error);
      });
  }

  static editCommunity(id: string, update: {}) {
    COMMUNITY.doc(id)
      .update(update)
      .then((docRef: any) => {
        console.log("Document modifié, nouveau doc : ", docRef);
      })
      .catch((error: any) => {
        console.log("Erreur lors de la modification de l'objet", error);
      });
  }

  static deleteCommunity(id: string) {
    COMMUNITY.doc(id)
      .delete()
      .then((docRef: any) => {
        console.log("Document supprimer : ", docRef);
      })
      .catch((error: any) => {
        console.log("Erreur lors de la suppression de l'objet", error);
      });
  }

  static getCommunity(id: string) {
    COMMUNITY.doc(id)
      .get()
      .then((documentSnapshot) => {
        console.log("Tag exists: ", documentSnapshot.data());
        let community: Community = Object.assign(
          new Community(),
          documentSnapshot.data()
        );
        community.id = id;
        return community;
      })
      .catch((error: any) => {
        console.log("Erreur lors de la recuperation via ID", error);
      });
    return new Community();
  }

  static getCommunityByName(field: string) {
    COMMUNITY.where("name", "==", field)
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

  followCommunity(id: string, userId: string) {
    let user: User = User.getUser(userId);
    this.members = this.members ?? [];
    this.members = [...this.members, user];

    Community.editCommunity(id, { members: this.members });
    user.addCommunityFollowed(this);
  }
}
