import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { ButtonGroup } from "@rneui/themed";

export default function Question({ route, navigation }) {
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
        answers: newAnswers, // ✅ fixed typo
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
        testID="choices"
        buttons={question.choices}
        selectedIndexes={selectedOptions}
        onPress={handleSelect}
        vertical
      />

      <Button
        title="Next"
        testID="next-question"
        onPress={handleNext} // ✅ matches function name
      />
    </View>
  );
}