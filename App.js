import React, { Component } from 'react'
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'

const deviceWidth = Dimensions.get('window').width
const TopNavBarWidth = 300
const TopNavBarSpacing = 5

const images = [
  'https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg',
  'https://images.pexels.com/photos/65006/pexels-photo-65006.jpeg',
  'https://images.pexels.com/photos/64147/cat-young-cat-playful-pet-64147.jpeg',
]

export default class App extends Component {

  imagelength = images.length
  itemWidth = (TopNavBarWidth / this.imagelength) - ((this.imagelength - 1) * TopNavBarSpacing)
  animatedvalue = new Animated.Value(0)

  render() {
    let imageArray = []
    let navBar = []
    images.forEach((image, i) => {
      console.log(image, i)
      const thisImage = (
        <Image
          key={`image${i}`}
          source={{uri: image}}
          style={{ width: deviceWidth }}
        />
      )
      imageArray.push(thisImage)

      const scrollBarVal = this.animatedvalue.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      })

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : TopNavBarSpacing,
            },
          ]}
        >
          <Animated.View

            style={[
              styles.bar,
              {
                width: this.itemWidth,
                transform: [
                  { translateX: scrollBarVal },
                ],
              },
            ]}
          />
        </View>
      )
      navBar.push(thisBar)
    })

    return (
      <View
        style={styles.container}
        flex={1}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.animatedvalue } } }]
            )
          }
        >

          {imageArray}

        </ScrollView>
        <View
          style={styles.TopNavBar}
        >
          {navBar}
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TopNavBar: {
    position: 'absolute',
    zIndex: 2,
    top: 40,
    flexDirection: 'row',
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2,
  },
  bar: {
    backgroundColor: '#fff',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
})
