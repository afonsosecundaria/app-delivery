import { View, Pressable, Image } from 'react-native';
import PagerView from "react-native-pager-view"

export default function Banner() {
 return (
   <View className='w-full h-36 md:h-60 rounded-2xl mt-5 mb-4'>
        <PagerView style={{ flex:1 }} initialPage={0} pageMargin={14}>
            <Pressable 
                className='w-full h-36 md:h-60 rounded-2xl' 
                key='1'
                onPress={() => console.log('clicou')}
            >
                <Image
                    source={require("../../assets/banner.png")}
                    className="w-full h-36 md:h-60 rounded-2xl"
                />
            </Pressable>

            <Pressable 
                className='w-full h-36 md:h-60 rounded-2xl' 
                key='1'
                onPress={() => console.log('clicou 2')}
            >
                <Image
                    source={require("../../assets/Banner-Post.png")}
                    className="w-full h-36 md:h-60 rounded-2xl"
                />
            </Pressable>
        </PagerView>


   </View>  
   );
}