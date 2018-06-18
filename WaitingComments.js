import React, {
    Component
} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';
import {Styles} from './Styles';
import AutoGrowingTextInput from './AutoGrowingTextInput';

export default class WaitingComments extends Component {
    constructor(props) {
            super(props);

            this.state = {
                pressRegiStatus:false,
                lockMode:false,
                name:'',
                inputText: '',
                inputHight:'',
                placeholder: '이게시물에 댓글을 남겨주세요',
                comment: '',
            };
    }

    addTodo() {
        let todoItem = this.state.inputText
        let todos = this.state.todos
        todos.push(todoItem)
        this.setState({
            pressRegiStatus: false,
            lockMode:false,
            name:'',
            inputText: '',
            inputHight: '',
            placeholder: '이게시물에 댓글을 남겨주세요',
            comment: '',
        })
    }


    render() {
            return ( 
                < View style = {Styles.WaitingComment} >
                    <View style = {{height:1,backgroundColor:'#ebebeb',}} />
                    {/*< InputScrollView >*/}
                        <AutoGrowingTextInput
                        ref = "CommentInput"
                        style = {
                            {
                                flex:1,
                                fontSize: 13,                                
                                paddingLeft:15,
                                justifyContent:'flex-start',
                                alignItems: 'center',
                                //borderColor: 'gray',
                                borderWidth: 1,
                            }
                        }
                        placeholder={this.state.placeholder}
                        onChangeText={(text) => {this.setState({inputText: text})}} 
                        onFocus={() => this.setState({placeholder:''})}
                        value={this.state.inputText}
                        multiline={true}

                        maxHeight={120}
                        underlineColorAndroid = 'transparent'
                        //numberOfLines = {5}
                        />
                        {/*</InputScrollView >*/}
                    < View style = {{width:250,}}>
                        < View style = {{width:'100%', position:'absolute', paddingRight:15, bottom:1,alignItems:'flex-end',}} >
                            <TouchableOpacity onPress={this.addTodo.bind(this)}
                                        style ={{}}>
                                < Text style ={{}}> add Todo </Text>
                            </TouchableOpacity >
                        </View>
                    </View>
                </View>

            )
        }
        
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingTop: 5
    },
    input: {
        height: 40,
    },
});

