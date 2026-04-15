import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Question from "../screens/Question";
import Summary from "../screens/Summary";

const Stack = createNativeStackNavigator();

export default function StackNavigator({question}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name ="Question">
                {(props) => <Question {...props} question={question} />}
                route={{ params: { question, index: 0, answers: [] } }}
            </Stack.Screen>
            <Stack.Screen name="Summary" component={Summary} />
        </Stack.Navigator>
    )
}