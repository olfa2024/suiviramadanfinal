// prayer.model.ts

export interface Prayer {
  id: number;
  يوم: string;
  الهجري: string;
  الميلادي: Date;
  الامساك: string;
  الفجر: string;
  الشروق: string;
  الظهر: string;
  العصر: string;
  المغرب: string;
  العشاء: string;
}
