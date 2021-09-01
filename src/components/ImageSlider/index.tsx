import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { Bullet } from '../Bullet';

import { Container, ImageIndexes, CarImageWrapper, CarImage } from './styles';

interface ImageSliderProps {
  imagesUrl: {
    id: string;
    photo: string;
  }[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl } :ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((item, index) => (
          <Bullet active={index === imageIndex} key={item.id} />
        ))}
      </ImageIndexes>


        <FlatList
          data={imagesUrl}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={indexChanged.current}
          renderItem={({ item }) => (
            <CarImageWrapper>
              <CarImage
                source={{ uri: item.photo }}
                resizeMode="contain"
              />
            </CarImageWrapper>
          )}
        />
    </Container>
  );
}
