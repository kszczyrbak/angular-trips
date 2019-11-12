export enum Waluta {
  USD,
  EUR,
  PLN
}


export class Wycieczka {
  nazwa: string;
  kraj: string;
  dataRozpoczecia: Date;
  dataZakonczenia: Date;
  cena: number;
  iloscMiejsc: number;
  maxMiejsc: number;
  waluta: Waluta;
  opis: string;
  zdjecie: string;

  constructor(nazwa, kraj, datar, dataz, cena, waluta, miejsca, opis, zdjecie) {
    this.nazwa = nazwa;
    this.kraj = kraj;
    this.dataRozpoczecia = datar;
    this.dataZakonczenia = dataz;
    this.cena = cena;
    this.waluta = waluta;
    this.maxMiejsc = miejsca;
    this.opis = opis;
    this.zdjecie = zdjecie;
    this.iloscMiejsc = this.maxMiejsc;
  }
}

