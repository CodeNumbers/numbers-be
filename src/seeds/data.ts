import { MusicalNumbersDto } from 'src/musical-numbers/musical-numbers.dto';

export const MusicalData: {
  title: string;
  imageKey: string;
  numbers?: MusicalNumbersDto[];
}[] = [
  {
    title: '데스노트',
    imageKey: '1-데스노트.jpeg',
    numbers: [
      {
        act: 1,
        order: 1,
        title: '정의는 어디에?',
        videoUrl: 'https://youtube.com/embed/xNT5hhm7_so',
        actors: ['한지상'],
      },
      {
        act: 1,
        order: 2,
        title: '불쌍한 인간',
        videoUrl: 'https://youtube.com/embed/bFNAKvNY33w',
        actors: ['박혜나', '강홍석'],
      },
      {
        act: 1,
        order: 4,
        title: '데스노트',
        videoUrl: 'https://youtube.com/embed/rrI7tOhoVzA',
        actors: ['홍광호'],
      },
      {
        act: 2,
        order: 17,
        title: '죽음의 게임',
        videoUrl: 'https://youtube.com/embed/M21WzeO7uD4',
        actors: ['고은성', '김준수', '케이'],
      },
      {
        act: 2,
        order: 22,
        title: '놈의 마음속으로',
        videoUrl: 'https://youtube.com/embed/mPxFLpdw-44',
        actors: ['한지상', '김준수'],
      },
    ],
  },
  {
    title: '레베카',
    imageKey: '2-레베카.jpeg',
    numbers: [
      {
        act: 2,
        order: 1,
        title: 'Rebecca - version 2',
        videoUrl: 'https://youtube.com/embed/Y_57Ej3LjYA',
        actors: ['옥주현', '이지혜'],
      },
      {
        act: 2,
        order: 1,
        title: 'Rebecca - version 2',
        videoUrl: 'https://youtube.com/embed/a-5qMx92Tj4',
        actors: ['신영숙', '이지혜'],
      },
    ],
  },
  {
    title: '알라딘',
    imageKey: '3-알라딘.jpeg',
  },
  {
    title: '지킬앤하이드',
    imageKey: '4-지킬앤하이드.jpeg',
  },
  {
    title: '프랑켄슈타인',
    imageKey: '5-프랑켄슈타인.jpeg',
  },
  {
    title: '하데스타운',
    imageKey: '6-하데스타운.jpeg',
  },
  {
    title: '웃는 남자',
    imageKey: '7-웃는남자.jpeg',
  },
  {
    title: '스토리 오브 마이 라이프',
    imageKey: '8-스토리오브마이라이프.jpeg',
  },
  {
    title: '위키드',
    imageKey: '9-위키드.jpeg',
  },
  {
    title: '어쩌면 해피엔딩',
    imageKey: '10-어쩌면해피엔딩.jpeg',
  },
];
