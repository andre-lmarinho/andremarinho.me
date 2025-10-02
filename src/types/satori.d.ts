declare module 'satori' {
  type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

  export type Font = {
    name: string;
    data: ArrayBuffer;
    style?: 'normal' | 'italic';
    weight?: FontWeight;
  };
}
