import { useEffect, useState } from 'react';
import { useToast, VStack } from 'native-base';
import { useRoute } from '@react-navigation/native';

import { api } from '../services/api';

import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { PoolCardPros } from '../components/PoolCard';
import { PoolHeader } from '../components/PoolHeader';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';

interface RouteParams { 
  id: string;
};

export function Details() {
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
  }

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
      <Header title={id} showBackButton showShareButton/>

      {
        poolsDetails._count?.participants > 0 ?
        <VStack px={5} flex={1}>
          <PoolHeader data={poolsDetails} />
        </VStack>

        : <EmptyMyPoolList code={poolsDetails.code} />
      }

    </VStack>
  );
}