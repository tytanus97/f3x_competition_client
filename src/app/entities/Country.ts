import { ThrowStmt } from '@angular/compiler';

export class Country {

  constructor(public countryId: number, public countryName: string, public countryCode: string) {

  }

  public getCountryId(): number {
    return this.countryId;
  }

  public getCountryName(): string {
    return this.countryName;
  }

  public getCountryCode(): string {
    return this.countryCode;
  }

  public setCountryId(id: number): void {
    this.countryId = id;
  }
  public setCountryCode(code: string): void {
    this.countryCode = code;
  }
  public setCountryName(name: string): void {
    this.countryName = name;
  }
}
