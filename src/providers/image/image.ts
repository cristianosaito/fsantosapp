import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProvider {

  constructor() {
  }

  uploadImage(image: string, userId: string): any {
    let storageRef = firebase.storage().ref();
    //let imageName = this.generateUUID();
    let imageName = 'foto';
    let imageRef = storageRef.child(`${userId}/${imageName}.jpg`);
    //return imageRef.putString(image, 'data_url');
    imageRef.putString(image, 'data_url');
  }

  getImage(userId: string): any{
    let storageRef = firebase.storage().ref();
    let imageName = 'foto';
    let imageRef = storageRef.child(`${userId}/${imageName}.jpg`);
    return imageRef.getDownloadURL();
  }
}
