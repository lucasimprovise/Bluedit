import firestore from '@react-native-firebase/firestore';
import {User} from './User';
import {Tag} from './Tag';
import {Post} from './Post';
const COMMUNITY = firestore().collection('Communitys');

export class Community {
  id: string | undefined;
  name: string;
  creator: User;
  tags: Tag[];
  members: User[] | undefined;
  description: string;
  posts: Post[] | undefined;
  date: Date;

  constructor(name: string, tags: Tag[], creator: User, description: string) {
    this.name = name;
    this.creator = creator;
    this.description = description;
    this.tags = tags;
    this.date = new Date();
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
        console.log('Document ajouté avec ID: ', docRef.id);
      })
      .catch((error: any) => {
        console.error("Erreur lors de l'ajout du document: ", error);
      });
  }

  static deleteCommunity(id: string) {
    COMMUNITY.doc(id)
      .delete()
      .then((docRef: any) => {
        console.log('Document supprimer : ', docRef);
      })
      .catch((error: any) => {
        console.log("Erreur lors de la suppression de l'objet", error);
      });
  }

  static getCommunity(id: string) {
    COMMUNITY.doc(id)
      .get()
      .then(documentSnapshot => {
        console.log('Tag exists: ', documentSnapshot.data());
      })
      .catch((error: any) => {
        console.log('Erreur lors de la recuperation via ID', error);
      });
  }

  static getCommunityByName(field: string) {
    COMMUNITY.where('name', '==', field)
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
