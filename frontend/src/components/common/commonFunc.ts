import slowmotion from '@bgms/slowmotion.mp3';
import silverWaves from '@bgms/silver_waves.mp3';

export const returnTrue = () => true;
export const returnFalse = () => false;
export interface popUp {
  title: string;
  message: string;
}

export const bgmList = [
  {title: 'slow motion', bgm: slowmotion},
  {title: 'silver waves', bgm: silverWaves},
  {title: 'silver waves', bgm: silverWaves},
  {title: 'silver waves', bgm: silverWaves},
  {title: 'silver waves', bgm: silverWaves},
  {title: 'silver waves', bgm: silverWaves},
  {title: 'silver waves', bgm: silverWaves},
  {title: 'silver waves', bgm: silverWaves},
  {title: 'silver waves', bgm: silverWaves},
  {title: 'silver waves', bgm: silverWaves},
  {title: 'silver waves', bgm: silverWaves},
  {title: 'silver waves', bgm: silverWaves},
  {title: 'silver waves', bgm: silverWaves},
  {title: 'silver waves', bgm: silverWaves},
];

export const isNumberType = (id: string | undefined | null) => {
  return !id || !parseInt(id);
};
