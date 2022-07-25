import React from "react"; // 리액트 호출
import { TouchableOpacity, Text } from "react-native"; // 리액트 네이티브에서 제공하는 컴포넌트 추가

const CustomBtn = props => {
    return (
        <TouchableOpacity
            style={{ 
            backgroundColor: '#D9D9D9',
            padding: 15,
            margin: 20,
            marginTop: 50,
            borderRadius: 10,
            alignItems:"center"
            }}
            
        >
            <Text style={{ color: '#000000', fontSize: 24, fontFamily:'NanumGothicBold' }}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export default CustomBtn;