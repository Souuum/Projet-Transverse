import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import Button from "../components/Button";
import Input from "../components/Input";
import InputLabel from "../components/InputLabel";
import Title from "../components/Title";
import SafeContainer from "../components/SafeContainer";
import { STYLE, COMPLEMENTARY, PRIMARY } from "../components/config.js";
import { StyleSheet, Text } from "react-native";
import NavLink from "../components/NavLink";
import FredokaText from "../components/FredokaText";
import { useAuth } from "../contexts/Auth";
import { Slider } from "react-native-range-slider-expo";
import { popAlert } from "../components/Alert";

const SignupContainer = styled.View`
    margin-bottom: 15px;
`;

const InputContainer = styled.View`
    margin-top: 15px;
`;

const FormContainer = styled.View`
    margin-bottom: 20px;
`;

const FormInputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 15px;
`;

const ScrollViewContainer = styled.ScrollView`
    width: 80%;
    margin: 10px 0;
`;

const Unit = styled.Text`
    font-size: 12px;
    font-family: "FredokaOne";
    width: 60px;
    text-align: center;
`;

const Signup = ({ navigation }) => {
    const auth = useAuth();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [firstname, setFirstName] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [schooyear, setSchoolYear] = useState("");

    const passwordValidation = () => {
        return confirm == password && password.length > 0 && confirm.length > 0;
    };

    const handleSignup = async (credentials) => {
        if (passwordValidation()) {
            setPasswordError("");
            const _check = await auth.signUp(credentials);
            if (_check && _check.response) {
                popAlert("Inscription", "Compte crée !");
                navigation.navigate("Login");
            } else {
                popAlert(
                    "Inscription",
                    _check.message ? _check.message : "Erreur message"
                );
            }
        } else {
            setPasswordError("Les mots de passe ne correspondent pas");
        }
    };

    return (
        <SafeContainer>
            <Title fontSize={"25px"} additionnalStyle={{ marginTop: 30 }}>
                {"Inscription"}
            </Title>
            <ScrollViewContainer>
                <SignupContainer>
                    <InputContainer>
                        <InputLabel additionnalStyle={{ marginBottom: 5 }}>
                            {"Identifiant"}
                        </InputLabel>
                        <Input
                            placeholder={"Email"}
                            onChangeText={(e) => setEmail(e)}
                        />
                    </InputContainer>

                    <InputContainer>
                        <InputLabel additionnalStyle={{ marginBottom: 5 }}>
                            {"Nom"}
                        </InputLabel>
                        <Input
                            placeholder={"Nom"}
                            onChangeText={(e) => setName(e)}
                        />
                    </InputContainer>

                    <InputContainer>
                        <InputLabel additionnalStyle={{ marginBottom: 5 }}>
                            {"Prénom"}
                        </InputLabel>
                        <Input
                            placeholder={"Prénom"}
                            onChangeText={(e) => setFirstName(e)}
                        />
                    </InputContainer>

                    <InputContainer>
                        <InputLabel additionnalStyle={{ marginBottom: 5 }}>
                            {"Mot de passe"}
                        </InputLabel>
                        <Input
                            placeholder={"Mot de passe"}
                            onChangeText={(e) => setPassword(e)}
                            secureTextEntry={true}
                        ></Input>
                    </InputContainer>

                    <InputContainer>
                        <InputLabel additionnalStyle={{ marginBottom: 5 }}>
                            {"Confirmation"}
                        </InputLabel>
                        <Input
                            placeholder={"Confirmer le mot de passe"}
                            onChangeText={(e) => setConfirm(e)}
                            secureTextEntry={true}
                        ></Input>
                    </InputContainer>
                    {passwordError.length > 0 && (
                        <Title
                            fontSize={"12px"}
                            additionnalStyle={{
                                textAlign: "center",
                                marginTop: 5,
                                color: COMPLEMENTARY,
                            }}
                        >
                            {passwordError}
                        </Title>
                    )}

                    <InputContainer>
                        <InputLabel additionnalStyle={{ marginBottom: 5 }}>
                            {"Année d'étude"}
                        </InputLabel>
                        <Input
                            placeholder={"année d'étude"}
                            onChangeText={(e) => setPassword(e)}
                            secureTextEntry={true}
                        ></Input>
                    </InputContainer>
                </SignupContainer>

                <Button
                    handlePress={() =>
                        handleSignup({
                            email: email,
                            username: username,
                            password: password,
                            age: age,
                            height: height,
                            weight: weight,
                            sportsPerWeek: sportsPerWeek,
                            pricePerMeal: pricePerMeal,
                            nutrRatio: nutrRatio,
                            budgRatio: budgRatio,
                        })
                    }
                >
                    {"S'inscrire"}
                </Button>
            </ScrollViewContainer>
            <Text style={{ marginBottom: 10 }}>
                <FredokaText>{"Vous avez déja un compte ?"} </FredokaText>{" "}
                <NavLink handlePress={() => navigation.navigate("Login")}>
                    {"Se connecter"}
                </NavLink>
            </Text>

            <StatusBar style="auto" />
        </SafeContainer>
    );
};

export default Signup;

const styles = StyleSheet.create({
    ...STYLE,
    inputTag: {
        width: 85,
    },
});
