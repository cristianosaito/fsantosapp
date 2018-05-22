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
    let imageName = this.generateUUID();
    let imageRef = storageRef.child(`${userId}/${imageName}.jpg`);
    //return imageRef.putString(image, 'data_url');
    imageRef.putString(image, 'data_url');
    localStorage.setItem('perfil_imagem', imageName);
  }

  getImage(userId: string, imageId: string): any {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`${userId}/${imageId}`);
    console.log(imageRef.getMetadata());
    return imageRef.getDownloadURL();
  }

  private generateUUID(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

}
