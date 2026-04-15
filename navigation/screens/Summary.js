import React from 'react';
import {View, Text} from 'react-native';

export default function Summary({route}) {
    const {questions, answers} = route.params;

let score = 0;

questions.forEach((q, i) => {
    const correct = answers[i];
    if(Array.isArray(q.correct)) {
        const correctSorted = [...q.correct].sort();
        const answersSorted = [...correct].sort();
        if(JSON.stringify(correctSorted) === JSON.stringify(answersSorted)) {
            score++;
        }
    } else if (correct === q.correct) {
        score++;
    }
    }
);

return (
    <View>
        <Text>Score: {score} / {questions.length}</Text>

    </View>
);
}
