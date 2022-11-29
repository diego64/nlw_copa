import { useEffect, useState } from 'react';
import { VStack, Icon, useToast } from 'native-base';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { PoolCard } from '../components/PoolCard';

import { api } from '../services/api';

export function Pools() {
  const [isLoading, setIsLoading] = useState(true);

  const { navigate } = useNavigation();

  const toast = useToast();

  async function fetchPools() {
    try {
      setIsLoading(true);

      const response = await api.get('/pools');
      console.log(response);

    } catch (error) {
      console.log(error);

      toast.show({ 
        title: 'Não foi possivél carregar os bolões',
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally{
      setIsLoading(false)
    };
  };

  useEffect(() => {
    fetchPools();
  }, []);

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="MEUS BOLÕES" />

      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
        <Button 
          title="BUSCAR BOLÃO POR CÓDIGO" 
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
          onPress={() => navigate('find')}
        />
      </VStack>

      <Loading />
    </VStack>
  );
}