import { Injectable } from '@nestjs/common';
const SHORTNED = {};

@Injectable()
export class AppService {
  private DICT_DEFAULT = 'abcdefghijkqlmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVXWYZ';
  private DICTIONARY = [];

  constructor() {
    this.DICTIONARY = this.DICT_DEFAULT.split('');
  }

  translate(code: string): string {
    console.log('translate', SHORTNED)
    return SHORTNED[code];
  }

  getShortenUrl(url: string): string {
    const randomString = this.getRandomString(8);
    if (randomString in SHORTNED) {
      return this.getShortenUrl(url);
    }

    SHORTNED[randomString] = url;

    return `http://localhost:3000/shortn/${randomString}`;
  }

  getRandomString(size: number) {
    let text = '';
    while (text.length < size) {
      text += this.DICTIONARY[
        this.getRandomInt(this.DICTIONARY.length)
      ];
    }

    return text;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}
