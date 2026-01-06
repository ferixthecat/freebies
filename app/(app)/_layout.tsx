import useUserStore from '@/hooks/use-userstore';
import { Stack } from 'expo-router';

const RootNav = () => {
  const { user } = useUserStore();
  return (
    <Stack>
      <Stack.Protected guard={user}>
        <Stack.Screen name='(auth)' options={{ headerShown: false }}/>
      </Stack.Protected>
      <Stack.Protected guard={!user}>
        <Stack.Screen name='(public)' options={{ headerShown: false }}/>
      </Stack.Protected>
    </Stack>
  )
}

export default RootNav;