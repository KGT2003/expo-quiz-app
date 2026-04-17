import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { ButtonGroup } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function Question({ route, navigation }) {
  const { questions, index, answers } = route.params;
  const question = questions[index];

  const [selectedOptions, setSelectedOptions] = useState([]);

  const isMultipleAnswer = Array.isArray(question.correct);

  const handleSelect = (i) => {
    if (isMultipleAnswer) {
      setSelectedOptions((prev) => {
        if (prev.includes(i)) {
          return prev.filter((x) => x !== i);
        } else {
          return [...prev, i];
        }
      });
    } else {
      setSelectedOptions([i]);
    }
  };

  const handleNext = () => {
    const newAnswers = [...answers, selectedOptions];

    if (index + 1 < questions.length) {
      navigation.replace("Question", {
        questions,
        index: index + 1,
        answers: newAnswers,
      });
    } else {
      navigation.replace("Summary", {
        questions,
        answers: newAnswers,
      });
    }
  };

  return (
    <View>
      <Text>{question.question}</Text>

      <ButtonGroup
        buttons={question.choices}
        selectedIndexes={selectedOptions}
        onPress={handleSelect}
        vertical
      />

      <Button title="Next" onPress={handleNext} />
    </View>
  );
}

function Summary({ route }) {
  const { questions, answers } = route.params;

  let score = 0;

  questions.forEach((q, i) => {
    const userAnswer = answers[i];

    if (Array.isArray(q.correct)) {
      const correctSorted = [...q.correct].sort();
      const answersSorted = [...userAnswer].sort();

      if (
        JSON.stringify(correctSorted) ===
        JSON.stringify(answersSorted)
      ) {
        score++;
      }
    } else if (userAnswer[0] === q.correct) {
      score++;
    }
  });

  return (
    <View>
      <Text>Score: {score} / {questions.length}</Text>
    </View>
  );
}

export default function App() {
  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      correct: 0,
    },
    {
      question: "What is the largest body of water on Earth?",
      choices: ["Atlantic Ocean", "Indian Ocean", "Artic Ocean", "Pacific Ocean"],
      correct: 3,
    },
    {
      question: "The Magna Carta was signed in the year 1215?",
      choices: ["True", "False"],
      correct: 0,
    },
    {
      question: "What Oceans surround the United States?",
      choices: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
      correct: [0, 1]
    }
  ];

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Question"
          component={Question}
          initialParams={{ questions, index: 0, answers: [] }}
        />
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

