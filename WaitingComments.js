import React, {
    Component
} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Keyboard,
    TextInput,
    findNodeHandle,
    TouchableOpacity
} from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';
import {Styles} from './Styles';
import AutogrowInput from './AutoGrowingTextInput';
import { KeyboardAwareScrollView, KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view'
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

    componentDidUpdate (){
        console.log('focus',this.props.focus)
        if(this.props.focus){
            this.focus()
        }
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

    focus = () => {
        this.commentInput.focus()
    }

    handleOnfocus = () =>{
        this.setState({placeholder:''})
        this.props.onFocus()
    }


    render() {
            return ( 
                < View style = {Styles.WaitingComment} >
                    <View style = {{height:1,backgroundColor:'#ebebeb',}} />
                    {/*< KeyboardAwareScrollView ref={ref => {this.scroll = ref}}
                        onKeyboardWillShow={(frames) => {
                                console.log('Keyboard event', frames)
                            }}>*/}
                        < AutogrowInput
                        ref = {ref => this.commentInput = ref}
                        style = {
                            {
                                flex:1,
                                fontSize: 13,                                
                                paddingLeft:15,
                                justifyContent:'flex-start',
                                alignItems: 'center',
                                borderWidth: 1,
                            }
                        }
                        placeholder={this.state.placeholder}
                        onChangeText={(text) => {this.setState({inputText: text})}} 
                        //onFocus={()=>this.scrollToIndex()}
                        //onFocus={(event) => {this._scrollToInput(findNodeHandle(event.target))}}
                        onFocus={this.handleOnfocus}
                        value={this.state.inputText}
                        multiline={true}
                        autoFocus = {false}
                        maxHeight={120}
                        //minHeight={33}
                        underlineColorAndroid = 'transparent'
                        //numberOfLines = {5}
                        />
                       {/*} </KeyboardAwareScrollView >*/}
                    < View style = {{width:110,}}>
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


