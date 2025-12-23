import { colors } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.ORANGE_600,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("Home"),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: t("Profile"),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: t("Setting"),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
