import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';

import {Styles} from './Styles';
import { colors } from './colors';
import { horizontal, vertical, width, height } from './layout';

export default class Pagination extends Component {
  static propTypes = {
    scrollToIndex: PropTypes.func.isRequired,
    data: PropTypes.array,
    paginationIndex: PropTypes.number,
    paginationActiveColor: PropTypes.string,
    paginationDefaultColor: PropTypes.string
  };

  static defaultProps = {
    data: [],
    paginationIndex: 0,
    paginationActiveColor: colors.white,
    paginationDefaultColor: colors.gray
  };

  render() {
    const {
      data,
      paginationIndex,
      scrollToIndex,
      paginationDefaultColor,
      paginationActiveColor
    } = this.props;
    return (
      <View style={Styles.paginationContainer}>
        {data.map((_, index) => (
          <TouchableOpacity
            style={[
              Styles.pagination,
              paginationIndex === index
                ? { backgroundColor: paginationActiveColor }
                : { backgroundColor: paginationDefaultColor }
            ]}
            key={index}
            onPress={() => scrollToIndex(index)}
          />
        ))}
      </View>
    );
  }
}
