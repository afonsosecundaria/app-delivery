import { View, Text, Pressable } from 'react-native';

interface Props{
    name: string;
    size: "text-xg" | "text-xl" | "text-2xl";
    label: string;
    action: () => void;
}

export default function Section({name, size, label, action}: Props) {
 return (
   <View className='w-full flex flex-row items-center justify-between px-4'>
        <Text>
            {name}
        </Text>

   </View>
  );
}