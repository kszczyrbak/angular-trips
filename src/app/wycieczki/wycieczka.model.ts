export class Wycieczka {
  nazwa: string;
  kraj: string;
  dataRozpoczecia: Date;
  dataZakonczenia: Date;
  cena: number;
  iloscMiejsc: number;
  maxMiejsc: number;
  opis: string;
  zdjecie: string;

  constructor(nazwa, kraj, datar, dataz, cena, miejsca, opis, zdjecie) {
    this.nazwa = nazwa;
    this.kraj = kraj;
    this.dataRozpoczecia = datar;
    this.dataZakonczenia = dataz;
    this.cena = cena;
    this.maxMiejsc = miejsca;
    this.opis = opis;
    this.zdjecie = zdjecie;
    this.iloscMiejsc = this.maxMiejsc;
  }
}
