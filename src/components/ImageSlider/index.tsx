import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';

import { Container, ImageIndexes, ImageIndex, CarImageWrapper, CarImage } from './styles';

interface ImageSliderProps {
  imagesUrl: string[];
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
        {imagesUrl.map((_, index) => (
          <ImageIndex active={index === imageIndex} key={index} />
        ))}
      </ImageIndexes>


        <FlatList
          data={imagesUrl}
          keyExtractor={key => key}
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={indexChanged.current}
          renderItem={({ item }) => (
            <CarImageWrapper>
              <CarImage
                source={{ uri: item }}
                resizeMode="contain"
              />
            </CarImageWrapper>
          )}
        />
    </Container>
  );
}
