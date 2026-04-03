import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "./context/AuthContext";
import { useLanguage } from "./context/LanguageContext";
import { colors } from "./(tabs)/theme";

export default function Login() {
  const { t, language, setLanguage } = useLanguage();
  const router = useRouter();
  const { login, signup } = useAuth();

  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState<"worker" | "contractor">("worker");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  /* Form Fields */
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  /* Worker Details */
  const [skill, setSkill] = useState("");
  const [experience, setExperience] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [dailyWage, setDailyWage] = useState("");

  /* Contractor Details */
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");

  const handleSubmit = async () => {
    if (!mobile || !password) {
      setError(t("enterCredentials"));
      return;
    }

    try {
      if (isSignup) {
        if (password !== confirm) {
          setError(t("passwordMismatch"));
          return;
        }

        if (role === "worker") {
          await signup({
            role: "worker",
            name,
            mobile,
            city,
            state,
            skill,
            experience,
            workLocation,
            dailyWage,
            location: `${city}, ${state}`,
          });
        } else {
          await signup({
            role: "contractor",
            name,
            mobile,
            city,
            state,
            companyName,
            businessType,
            officeAddress,
            location: `${city}, ${state}`,
          });
        }
      } else {
        await login(mobile, password);
      }
      // Route based on role
      if (role === "contractor") {
        router.replace("/contractorhome");
      } else {
        router.replace("/home");
      }
    } catch (e) {
      setError(t("authFailed"));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Language Switcher Header */}
        <View style={styles.langHeader}>
          <TouchableOpacity
            style={[styles.langTag, language === "en" && styles.langTagActive]}
            onPress={() => setLanguage("en")}
          >
            <Text style={[styles.langTagText, language === "en" && styles.langTagTextActive]}>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langTag, language === "ta" && styles.langTagActive]}
            onPress={() => setLanguage("ta")}
          >
            <Text style={[styles.langTagText, language === "ta" && styles.langTagTextActive]}>தமிழ்</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langTag, language === "hi" && styles.langTagActive]}
            onPress={() => setLanguage("hi")}
          >
            <Text style={[styles.langTagText, language === "hi" && styles.langTagTextActive]}>हिंदी</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>
            {isSignup ? t("signupHeading") : t("loginHeading")}
          </Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {isSignup && (
            <View style={styles.roleRow}>
              <TouchableOpacity
                style={[styles.roleBtn, role === "worker" && styles.roleBtnActive]}
                onPress={() => setRole("worker")}
              >
                <Text style={[styles.roleLabel, role === "worker" && styles.roleLabelActive]}>
                  {t("worker")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.roleBtn, role === "contractor" && styles.roleBtnActive]}
                onPress={() => setRole("contractor")}
              >
                <Text style={[styles.roleLabel, role === "contractor" && styles.roleLabelActive]}>
                  {t("contractor")}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TextInput
            placeholder={t("mobile")}
            style={styles.input}
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder={t("password")}
              style={[styles.input, { flex: 1, marginBottom: 0 }]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.eyeBtnText}>{showPassword ? "Hide" : "Show"}</Text>
            </TouchableOpacity>
          </View>

          {isSignup && (
            <>
              <TextInput
                placeholder={t("confirmPassword")}
                style={styles.input}
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry={!showPassword}
              />
              <TextInput
                placeholder={t("name")}
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
              <TextInput
                placeholder={t("city")}
                style={styles.input}
                value={city}
                onChangeText={setCity}
              />
              <TextInput
                placeholder={t("state")}
                style={styles.input}
                value={state}
                onChangeText={setState}
              />

              {role === "worker" ? (
                <>
                  <TextInput
                    placeholder={t("skill")}
                    style={styles.input}
                    value={skill}
                    onChangeText={setSkill}
                  />
                  <TextInput
                    placeholder={t("experience")}
                    style={styles.input}
                    value={experience}
                    onChangeText={setExperience}
                  />
                  <TextInput
                    placeholder={t("dailyWage")}
                    style={styles.input}
                    value={dailyWage}
                    onChangeText={setDailyWage}
                    keyboardType="numeric"
                  />
                </>
              ) : (
                <>
                  <TextInput
                    placeholder={t("companyDetails")}
                    style={styles.input}
                    value={companyName}
                    onChangeText={setCompanyName}
                  />
                  <TextInput
                    placeholder={t("officeAddress")}
                    style={styles.input}
                    value={officeAddress}
                    onChangeText={setOfficeAddress}
                  />
                </>
              )}
            </>
          )}

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>
              {isSignup ? t("signup") : t("login")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.toggleBtn}
            onPress={() => setIsSignup(!isSignup)}
          >
            <Text style={styles.toggleBtnText}>
              {isSignup ? t("alreadyHaveAccount") : t("dontHaveAccount")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: 20,
  },
  langHeader: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
    marginTop: Platform.OS === "ios" ? 40 : 20,
  },
  langTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  langTagActive: {
    backgroundColor: colors.primaryBlue,
    borderColor: colors.primaryBlue,
  },
  langTagText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textSub,
  },
  langTagTextActive: {
    color: "#fff",
  },
  formCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.textMain,
    marginBottom: 24,
    textAlign: "center",
  },
  errorText: {
    color: "#EF4444",
    marginBottom: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  roleRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  roleBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  roleBtnActive: {
    backgroundColor: colors.primaryBlue,
    borderColor: colors.primaryBlue,
  },
  roleLabel: {
    fontWeight: "700",
    color: colors.textSub,
  },
  roleLabelActive: {
    color: "#fff",
  },
  input: {
    backgroundColor: "#F1F5F9",
    height: 54,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    fontSize: 16,
    color: colors.textMain,
    fontWeight: "500",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    marginBottom: 14,
    paddingRight: 12,
  },
  eyeBtn: {
    padding: 8,
  },
  eyeBtnText: {
    color: colors.primaryBlue,
    fontWeight: "700",
    fontSize: 13,
  },
  submitBtn: {
    backgroundColor: colors.primaryBlue,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 2,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  toggleBtn: {
    marginTop: 20,
    alignItems: "center",
  },
  toggleBtnText: {
    color: colors.primaryBlue,
    fontWeight: "700",
    fontSize: 15,
  },
});
