import { Heading, VStack, Text } from "native-base";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

import Logo from "../assets/logo.svg";

export function New() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão"/>

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading fontFamily="heading" color="white" fontSize="lg" /*fontSize="xl"*/ my={8} textAlign="center">
          Crie seu própio bolão da copa {'\n'}
          e compartilhe entre os amigos!
        </Heading>

        <Input
          mb={2}
          placeholder="Qual nome do seu bolão"
        />

        <Button
          title="CRIAR MEU BOLÂO"
        />

        <Text color="gray.100" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único 
          que poderá usar para convidar outras pessoas.
        </Text>
      </VStack>

    </VStack>
  )
}