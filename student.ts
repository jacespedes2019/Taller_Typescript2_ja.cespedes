export class Student {
    name:string;
    img: string;
    code: string;
    cc: string;
    age: number;
    address: string;
    telephone: string;
  
    constructor(name: string, img: string, code: string, cc: string, age: number, address: string, telephone: string) {
      this.name = name;
      this.img= img;
      this.code= code;
      this.cc= cc;
      this.age= age;
      this.address= address;
      this.telephone= telephone;
    }
  }