import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import SPACING from "../config/SPACING";
import colors from "../config/colors";
import { Ionicons } from "@expo/vector-icons";

const logo = require("../../assets/logos/cyber.png");
import series from "../data/series";
import { LinearGradient } from "expo-linear-gradient";

const MajeureScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: SPACING * 4,
          }}
        >
          <Image
            style={{
              height: SPACING * 20,
              width: SPACING * 20,
            }}
            source={logo}
          />
          <Text
            style={{
              color: colors.white,
              fontSize: SPACING * 5,
              fontWeight: "700",
            }}
          >
            Nom Majeure
          </Text>
          <Text
            style={{
              color: colors.light,
              marginTop: SPACING / 2,
            }}
          >
            5 Searies
          </Text>
        </View>

        <LinearGradient
          colors={["#b00b69", "#A01070"]}
          style={{
            height: 250,
            borderRadius: SPACING * 2,
            padding: SPACING * 2,
            marginBottom: SPACING * 2,
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: SPACING * 1.7,
              fontWeight: "700",
              marginBottom: SPACING,
            }}
          >
            Description
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.white }}>descriptions</Text>
            <TouchableOpacity
              style={{
                overflow: "hidden",
                borderRadius: SPACING / 2,
              }}
            >
              <LinearGradient
                style={{
                  paddingHorizontal: SPACING,
                  paddingVertical: SPACING / 3,
                }}
                colors={[colors["dark-gray"], colors.dark]}
              >
                <Ionicons
                  name="arrow-forward"
                  color={colors.light}
                  size={SPACING * 2}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={["#b00b69", "#A01070"]}
          style={{
            height: 250,
            borderRadius: SPACING * 2,
            padding: SPACING * 2,
            marginBottom: SPACING * 2,
          }}
        >
          <Text
            style={{
              color: colors.light,
              fontSize: SPACING * 1.7,
              fontWeight: "700",
              marginBottom: SPACING,
            }}
          >
            Matières
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.light }}>descriptions</Text>
            <TouchableOpacity
              style={{
                overflow: "hidden",
                borderRadius: SPACING / 2,
              }}
            >
              <LinearGradient
                style={{
                  paddingHorizontal: SPACING,
                  paddingVertical: SPACING / 3,
                }}
                colors={[colors["dark-gray"], colors.dark]}
              >
                <Ionicons
                  name="arrow-forward"
                  color={colors.light}
                  size={SPACING * 2}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {series.map((item) => (
          <LinearGradient
            key={item.id}
            colors={["#b00b69", "#A01070"]}
            style={{
              height: 250,
              borderRadius: SPACING * 2,
              padding: SPACING * 2,
              marginBottom: SPACING * 2,
            }}
          >
            <Text
              style={{
                color: colors.light,
                fontSize: SPACING * 1.7,
                fontWeight: "700",
                marginBottom: SPACING,
              }}
            >
              temoignages
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: colors.light }}>descriptions</Text>
              <TouchableOpacity
                style={{
                  overflow: "hidden",
                  borderRadius: SPACING / 2,
                }}
              >
                <LinearGradient
                  style={{
                    paddingHorizontal: SPACING,
                    paddingVertical: SPACING / 3,
                  }}
                  colors={[colors["dark-gray"], colors.dark]}
                >
                  <Ionicons
                    name="arrow-forward"
                    color={colors.light}
                    size={SPACING * 2}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        ))}
      </ScrollView>
      <TouchableOpacity>
        <LinearGradient
          style={{
            padding: SPACING / 5,
            borderRadius: SPACING * 2,
          }}
          colors={[colors.light, colors.dark]}
        ></LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MajeureScreen;

const styles = StyleSheet.create({});
