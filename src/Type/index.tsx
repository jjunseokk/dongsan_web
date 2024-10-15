export interface meditation {
  id: number;
  title: string;
  word: string;
  thumbnail: string;
  music: string;
  createDate: string;
}

export interface postMeditation {
  title: string;
  word: string;
  thumbnail: any;
  music: any;
}

export interface deleteMeditation {
  id: number[];
}
