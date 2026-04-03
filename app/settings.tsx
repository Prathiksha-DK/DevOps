import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { colors } from "./(tabs)/theme";
import { useAuth } from "./context/AuthContext";
import { useLanguage } from "./context/LanguageContext";
import { useRouter } from "expo-router";

export default function Settings() {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>No user data</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Standardized Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.backBtnText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.pageTitle}>{t("settings")}</Text>
            <Text style={styles.userLocation}>{user.location || user.city}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {/* Language Selection Section */}
        <View style={styles.card}>
          <Text style={styles.section}>{t("language")}</Text>
          <View style={styles.langRow}>
            <LangBtn
              label="English"
              active={language === "en"}
              onPress={() => setLanguage("en")}
            />
            <LangBtn
              label="தமிழ்"
              active={language === "ta"}
              onPress={() => setLanguage("ta")}
            />
            <LangBtn
              label="हिंदी"
              active={language === "hi"}
              onPress={() => setLanguage("hi")}
            />
          </View>
        </View>

        {/* Profile Section */}
        <View style={styles.card}>
          <Text style={styles.section}>{t("profileInfo")}</Text>
          <Info label={t("name")} value={user.name} />
          <Info label={t("mobile")} value={user.mobile} />
          <Info label={t("city")} value={user.city} />
          <Info label={t("state")} value={user.state} />
          <Info label={t("role")} value={user.role === "worker" ? t("worker") : t("contractor")} />
        </View>

        {/* Worker Info */}
        {user.role === "worker" && (
          <View style={styles.card}>
            <Text style={styles.section}>{t("workDetails")}</Text>
            <Info label={t("skill")} value={user.skill} />
            <Info label={t("experience")} value={user.experience} />
            <Info label={t("workLocation")} value={user.workLocation} />
            <Info label={t("dailyWage")} value={user.dailyWage} />
            <Info label={t("language")} value={user.languages} />
          </View>
        )}

        {/* Contractor Info */}
        {user.role === "contractor" && (
          <View style={styles.card}>
            <Text style={styles.section}>{t("companyDetails")}</Text>
            <Info label="Company Name" value={user.companyName} />
            <Info label="Business Type" value={user.businessType} />
            <Info label="Office Address" value={user.officeAddress} />
            <Info label="Experience" value={user.contractorExperience} />
          </View>
        )}

        {/* Logout */}
        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logoutText}>{t("logout")}</Text>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}

function LangBtn({ label, active, onPress }: any) {
  return (
    <TouchableOpacity
      style={[styles.langBtn, active && styles.langBtnActive]}
      onPress={onPress}
    >
      <Text style={[styles.langText, active && styles.langTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* reusable info row */

function Info({ label, value }: any) {
  if (!value) return null;
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

/* styles */

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
    alignItems: "center",
  },
  backBtn: {
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
  },
  backBtnText: {
    fontSize: 14,
    color: colors.textSub,
    fontWeight: "700",
  },
  headerText: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.textMain,
  },
  userLocation: {
    color: colors.textSub,
    marginTop: 2,
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: colors.card,
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  section: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
    color: colors.textMain,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  langRow: {
    flexDirection: "row",
    gap: 10,
  },
  langBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  langBtnActive: {
    backgroundColor: colors.primaryBlue,
    borderColor: colors.primaryBlue,
  },
  langText: {
    fontWeight: "600",
    color: colors.textSub,
  },
  langTextActive: {
    color: "#fff",
  },
  row: {
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    color: colors.textSub,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textMain,
  },
  logout: {
    backgroundColor: "#EF4444",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
    elevation: 2,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
});
