export class Helpers {
  static getUrlParameter(path: string) {
    return path.split('/')[2];
  }
}
