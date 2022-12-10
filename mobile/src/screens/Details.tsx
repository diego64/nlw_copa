import { useEffect, useState } from 'react';
import { Share } from 'react-native';
import { HStack, useToast, VStack } from 'native-base';
import { useRoute } from '@react-navigation/native';

import { api } from '../services/api';

import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { Guesses } from '../components/Guesses';
import { Option } from '../components/Option';
import { PoolCardPros } from '../components/PoolCard';
import { PoolHeader } from '../components/PoolHeader';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';

interface RouteParams { 
  id: string;
};

export function Details() {
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses')
  const [isLoding, setIsLoding] = useState(true);
  const [poolsDetails, setPoolsDetails] = useState<PoolCardPros>({} as PoolCardPros);

  const route = useRoute();
  const toast = useToast();

  const { id } = route.params as RouteParams;

  async function fetchPoolDetails(){
    try {
      setIsLoding(true);

      const response = await api.get(`/pools/${id}`);
      setPoolsDetails(response.data.pool)
    } catch (error) {
      console.log(error);

      toast.show({
        title:'Não foi possível carregar os detalhes do bolão',
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoding(false);
    }
  };

  async function handleCodeShare(){
    await Share.share({
      message: poolsDetails.code
    });
  };

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);

  if(isLoding) {
    return (
      <Loading />
    )
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header 
        title={poolsDetails.title} 
        showBackButton 
        showShareButton
        onShare={handleCodeShare}
      />

      {
        poolsDetails._count?.participants > 0 ?
        <VStack px={5} flex={1}>
          <PoolHeader data={poolsDetails} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={8}>
            <Option 
              title="Seus palpites"
              isSelected={optionSelected === 'guesses'}
              onPress={() => setOptionSelected('guesses')}
            />

            <Option 
              title="Ranking do grupo"
              isSelected={optionSelected === 'ranking'}
              onPress={() => setOptionSelected('ranking')}
            />
          </HStack>

          <Guesses poolId={poolsDetails.id} code={poolsDetails.code}/>
        </VStack>

        : <EmptyMyPoolList code={poolsDetails.code} />
      }

    </VStack>
  );
}