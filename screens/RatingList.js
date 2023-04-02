import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity,Image } from 'react-native';
//import { AntDesign } from '@expo/vector-icons';

const MAX_RATING = 5;

const Item = ({ item, setRating }) => {
  const [rating, setSelectedRating] = useState(item.rating);

  const handlePress = (index) => {
    setSelectedRating(index + 1);
    setRating(item.pid, index + 1);
  };
    // Filled Star. You can also give the path from local
    const starImageFilled =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
    // Empty Star. You can also give the path from local
    const starImageCorner =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

  return (
    <View style={{ margin: 10, padding: 10, backgroundColor: 'white' }}>
      <Text>{item.ProductName}</Text>
      <View style={{ flexDirection: 'row' }}>
        {Array.from({ length: MAX_RATING }, (_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(index)}
          >
            {/* <AntDesign
              name={index < rating ? 'star' : 'staro'}
              size={32}
              color={index < rating ? 'gold' : 'gray'}
            /> */}
            <Image
                style={{width: 40,
                    height: 40,
                    resizeMode: 'cover',}}
                source={
                  index < rating
                    ? { uri: starImageFilled }
                    : { uri: starImageCorner }
                }
              />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const RatingList = () => {
    const [newData, setnewData] = useState([])
  const [data, setData] = useState([
    {
      pid: 1,
      "ProductName": "ABC",
      Rating: 0
    },
    {
      pid: 2,
      "ProductName": "DEF",
      Rating: 0
    },
    {
      pid: 3,
      "ProductName": "GHI",
      Rating: 0
    },
    {
      pid: 4,
      "ProductName": "XYZ",
      Rating: 0
    }
  ]);

  const setRating = (pid, rating) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.pid === pid) {
          item.Rating = rating;
        }
        return item;
      })
    );
  };

  return (
    <View>
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Item item={item} setRating={setRating} />
      )}
      keyExtractor={(item) => item.pid.toString()}
    />
    <TouchableOpacity style={{width:100,height:100,backgroundColor:'blue'}}
        onPress={()=>console.log(data)}
    >
        <Text>Click</Text>
    </TouchableOpacity>
    </View>
  );
};

export default RatingList;
