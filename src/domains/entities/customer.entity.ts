export class Customer {
  id: string;
  name: string;
  lastname: string;
  birthday: Date;
  age: number;

  constructor(
    id: string,
    name: string,
    lastname: string,
    birthday: Date,
    age: number,
  ) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.birthday = birthday;
    this.age = age;
  }
}
