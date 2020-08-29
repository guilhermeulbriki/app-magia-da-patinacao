import React, { useState, useCallback, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import api from "../../services/api";
import { Feather } from "@expo/vector-icons";

import Header from "../../components/Header";
import primeiroTrophy from "../../assets/primeiro.png";
import segundoTrophy from "../../assets/segundo.png";
import terceiroTrophy from "../../assets/terceiro.png";
import quartoTrophy from "../../assets/quarto.png";
import quintoTrophy from "../../assets/quinto.png";
import competitionImage from "../../assets/competitions.png";
import {
  Container,
  Description,
  TextDescription,
  ImageDescription,
  Trophys,
  Trophy,
  CompetitionsList,
  CompetitionItem,
  ItemDesctiption,
  ItemName,
  ItemCoup,
  ItemPodium,
  PaginationContent,
  PaginationNumber,
} from "./styles";
import putFirstLetterUperCase from "../../utils/putFirstLetterUperCase";

interface ICompetitions {
  id: string;
  name: string;
  city: string;
  category: string;
  award: 1 | 2 | 3 | 4 | 5;
  student_name: string;
}

const Competitions: React.FC = () => {
  const [competitions, setCompetitions] = useState<ICompetitions[]>([]);
  const [pagination, setPagination] = useState(1);
  const [selectedPodium, setSelectedPodium] = useState<
    null | 1 | 2 | 3 | 4 | 5
  >();

  const handleSelectFilter = useCallback((podium: 1 | 2 | 3 | 4 | 5) => {
    setSelectedPodium((oldValue) => (oldValue === podium ? null : podium));
  }, []);

  const handleTogglePagination = useCallback((action: "up" | "down") => {
    action === "up"
      ? setPagination((oldValue) => oldValue + 1)
      : setPagination((oldValue) => oldValue - 1);
  }, []);

  useEffect(() => {
    api
      .get("competitions", {
        params: { award: selectedPodium, page: pagination },
      })
      .then((response) => setCompetitions(response.data));
  }, [selectedPodium, pagination]);

  return (
    <Container>
      <Header title="Premiações" />

      <Description>
        <TextDescription>
          O clube possui {competitions.length} prêmios, tudo isso com a ajuda
          de:
        </TextDescription>
        <ImageDescription source={competitionImage} />
      </Description>

      <Trophys>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => handleSelectFilter(1)}
        >
          <Trophy
            selected={selectedPodium === 1 ? true : false}
            source={primeiroTrophy}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => handleSelectFilter(2)}
        >
          <Trophy
            selected={selectedPodium === 2 ? true : false}
            source={segundoTrophy}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => handleSelectFilter(3)}
        >
          <Trophy
            selected={selectedPodium === 3 ? true : false}
            source={terceiroTrophy}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => handleSelectFilter(4)}
        >
          <Trophy
            selected={selectedPodium === 4 ? true : false}
            source={quartoTrophy}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => handleSelectFilter(5)}
        >
          <Trophy
            selected={selectedPodium === 5 ? true : false}
            source={quintoTrophy}
          />
        </TouchableOpacity>
      </Trophys>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 16,
        }}
      >
        <CompetitionsList>
          {competitions.map((competition) => (
            <CompetitionItem key={competition.id} podium={competition.award}>
              <ItemDesctiption>
                <ItemName white={false}>
                  {putFirstLetterUperCase(competition.student_name)}
                </ItemName>
                <ItemCoup white={false}>
                  {putFirstLetterUperCase(competition.name)} -{" "}
                  {putFirstLetterUperCase(competition.category)}
                </ItemCoup>
              </ItemDesctiption>

              <ItemPodium white={false}>{competition.award}º lugar</ItemPodium>
            </CompetitionItem>
          ))}

          <PaginationContent>
            {pagination > 1 && (
              <Feather
                name="arrow-left"
                color="#4f4f4f"
                size={16}
                onPress={() => handleTogglePagination("down")}
              />
            )}
            <PaginationNumber>{pagination}</PaginationNumber>
            <Feather
              name="arrow-right"
              color="#4f4f4f"
              size={16}
              onPress={() => handleTogglePagination("up")}
            />
          </PaginationContent>
        </CompetitionsList>
      </ScrollView>
    </Container>
  );
};

export default Competitions;
