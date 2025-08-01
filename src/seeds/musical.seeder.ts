import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Poster } from '../posters/poster.entity';
import { Musical } from '../musicals/musical.entity';
import { faker } from '@faker-js/faker';

const posters: {
  title: string;
  imageUrl: string;
}[] = [
  {
    // 0
    title: '알라딘',
    imageUrl:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftickets.interpark.com%2Fgoods%2F24012498&psig=AOvVaw09lKaHY2zqVxYouP1GtPCi&ust=1754101615838000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMD8hu7H6I4DFQAAAAAdAAAAABAE',
  },
  {
    // 1
    title: '지킬앤하이드',
    imageUrl:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftickets.interpark.com%2Fgoods%2F24013928&psig=AOvVaw12G7txtRczdb-Xsv-Z33q3&ust=1754101823750000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJDi5dDI6I4DFQAAAAAdAAAAABAE',
  },
  {
    // 2
    title: '데스노트',
    imageUrl:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fnamu.wiki%2Fw%2F%25EB%258D%25B0%25EC%258A%25A4%25EB%2585%25B8%25ED%258A%25B8%2528%25EB%25AE%25A4%25EC%25A7%2580%25EC%25BB%25AC%2529&psig=AOvVaw1dlv5sHgQ3UJVLFFV4FZhD&ust=1754101850594000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMjnxN3I6I4DFQAAAAAdAAAAABAE',
  },
  {
    // 3
    title: '프랑켄슈타인',
    imageUrl:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fnamu.wiki%2Fw%2F%25ED%2594%2584%25EB%259E%2591%25EC%25BC%2584%25EC%258A%2588%25ED%2583%2580%25EC%259D%25B8%2528%25EB%25AE%25A4%25EC%25A7%2580%25EC%25BB%25AC%2529&psig=AOvVaw1atLU3jdGIYVRALG6adC1p&ust=1754101922911000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJCilIDJ6I4DFQAAAAAdAAAAABAE',
  },
  {
    // 4
    title: '하데스타운',
    imageUrl:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftickets.interpark.com%2Fgoods%2F24006851&psig=AOvVaw2yEeF8pQsUwGAbvCURVhY3&ust=1754101948638000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOi5pIzJ6I4DFQAAAAAdAAAAABAE',
  },
  {
    // 5
    title: '웃는 남자',
    imageUrl:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fnamu.wiki%2Fw%2F%25EC%259B%2583%25EB%258A%2594%2520%25EB%2582%25A8%25EC%259E%2590%2528%25EB%25AE%25A4%25EC%25A7%2580%25EC%25BB%25AC%2529&psig=AOvVaw33F1KNeUvnCU19g_7hKf5B&ust=1754102032697000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOiksLTJ6I4DFQAAAAAdAAAAABAE',
  },
  {
    // 6
    title: '스토리 오브 마이 라이프',
    imageUrl:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.doosanartcenter.com%2Fko%2Fperformance%2F1533&psig=AOvVaw2wHf49W6-ULpptSmLDLTDg&ust=1754102141380000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMjhnOjJ6I4DFQAAAAAdAAAAABAE',
  },
  {
    // 7
    title: '위키드',
    imageUrl:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fnamu.wiki%2Fw%2F%25EC%259C%2584%25ED%2582%25A4%25EB%2593%259C%2528%25EB%25AE%25A4%25EC%25A7%2580%25EC%25BB%25AC%2529&psig=AOvVaw2Ts0CcLMkCAerZS2EG0gmz&ust=1754102189008000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOD89f7J6I4DFQAAAAAdAAAAABAE',
  },
  {
    // 8
    title: '레베카',
    imageUrl:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fnamu.wiki%2Fw%2F%25EB%25A0%2588%25EB%25B2%25A0%25EC%25B9%25B4%2528%25EB%25AE%25A4%25EC%25A7%2580%25EC%25BB%25AC%2529&psig=AOvVaw0KzByBnyNx6UHBlrCu3ype&ust=1754102210883000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLCKrInK6I4DFQAAAAAdAAAAABAE',
  },
  {
    // 9
    title: '어쩌면 해피엔딩',
    imageUrl:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fnamu.wiki%2Fw%2F%25EC%2596%25B4%25EC%25A9%258C%25EB%25A9%25B4%2520%25ED%2595%25B4%25ED%2594%25BC%25EC%2597%2594%25EB%2594%25A9&psig=AOvVaw2JmDf-DRslPMvMYGHxEV9R&ust=1754102240393000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOiCtpfK6I4DFQAAAAAdAAAAABAE',
  },
  {
    // 10
    title: '영웅',
    imageUrl:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.lgart.com%2Fproduct%2Fperformance%2F252732&psig=AOvVaw2srZVuDtnmQ7YJGN2C1DIC&ust=1754102276840000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKCD26nK6I4DFQAAAAAdAAAAABAE',
  },
];

@Injectable()
export class MusicalSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async seed(count = 10) {
    const posterRepo = this.dataSource.getRepository(Poster);
    const musicalRepo = this.dataSource.getRepository(Musical);

    for (let i = 0; i < count; i++) {
      const title = posters[i].title;
      const imageUrl = posters[i].imageUrl;
      const synopsis = faker.lorem.paragraph();

      const poster = posterRepo.create({ imageUrl });
      await posterRepo.save(poster);
      const musical = musicalRepo.create({ title, synopsis, poster });
      await musicalRepo.save(musical);
    }

    console.log(`✅ ${count} musicals with posters inserted.`);
  }
}
