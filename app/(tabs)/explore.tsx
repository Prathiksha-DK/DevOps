import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "./theme";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export default function Explore() {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.pageTitle}>Explore</Text>
            <Text style={styles.userLocation}>{user?.location || "Loading..."}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Upcoming Features</Text>
          <Text style={styles.cardText}>
            We are working on bringing more opportunities and connections to your area. Stay tuned!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 24,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.textMain,
  },
  userLocation: {
    color: colors.textSub,
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
  },
  list: {
    padding: 20,
  },
  card: {
    backgroundColor: colors.card,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textMain,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: colors.textSub,
    lineHeight: 22,
    fontWeight: "500",
  },
});
