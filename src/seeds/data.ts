import { MusicalNumbersDto } from 'src/musical-numbers/musical-numbers.dto';

export const MusicalData: {
  title: string;
  imageUrl: string;
  numbers?: MusicalNumbersDto[];
}[] = [
  {
    title: '데스노트',
    imageUrl:
      'https://ticketimage.interpark.com/Play/image/large/23/23002291_p.gif',
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
    imageUrl:
      'https://ticketimage.interpark.com/Play/image/large/23/23008837_p.gif',
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
    imageUrl:
      'https://ticketimage.interpark.com/Play/image/large/24/24012498_p.gif',
  },
  {
    title: '지킬앤하이드',
    imageUrl:
      'https://ticketimage.interpark.com/Play/image/large/24/24013928_p.gif',
  },
  {
    title: '프랑켄슈타인',
    imageUrl:
      'https://image.yes24.com/themusical/fileStorage/ThemusicalAdmin/Play/Image/2023101938920458f86986298757ce2d5e31430e590ecd0e.png',
  },
  {
    title: '하데스타운',
    imageUrl:
      'https://ticketimage.interpark.com/Play/image/large/24/24006851_p.gif',
  },
  {
    title: '웃는 남자',
    imageUrl:
      'https://ticketimage.interpark.com/Play/image/large/22/22004761_p.gif',
  },
  {
    title: '스토리 오브 마이 라이프',
    imageUrl:
      'https://www.doosanartcenter.com/upload/contentsImage/23092714074648862148.jpg',
  },
  {
    title: '위키드',
    imageUrl:
      'https://ticketimage.interpark.com/Play/image/large/25/25005777_p.gif',
  },
  {
    title: '어쩌면 해피엔딩',
    imageUrl:
      'https://ticketimage.interpark.com/Play/image/large/24/24006741_p.gif',
  },
];
