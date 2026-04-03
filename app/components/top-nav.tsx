import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useRef, useState } from "react";
import { colors } from "../(tabs)/theme";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.75;
const NAV_HEIGHT = 80;

export default function TopNav() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const { t } = useLanguage();

  const isContractor = user?.role === "contractor";
  const [open, setOpen] = useState(false);
  const slideX = useRef(new Animated.Value(DRAWER_WIDTH)).current;

  const openDrawer = () => {
    setOpen(true);
    Animated.timing(slideX, {
      toValue: 0,
      duration: 280,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideX, {
      toValue: DRAWER_WIDTH,
      duration: 220,
      useNativeDriver: true,
    }).start(() => setOpen(false));
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>DailyWork</Text>

          {!isLoggedIn ? (
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => router.push("/login")}
            >
              <Text style={styles.loginText}>{t("login")}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.profileWrapper}>
              <Text
                style={[
                  styles.roleTag,
                  isContractor ? styles.contractorTag : styles.workerTag,
                ]}
              >
                {isContractor ? t("contractor") : t("worker")}
              </Text>

              <TouchableOpacity
                style={[
                  styles.profileCircle,
                  isContractor ? styles.contractorCircle : styles.workerCircle,
                ]}
                onPress={openDrawer}
                activeOpacity={0.8}
              >
                <Text style={styles.profileText}>
                  {user?.name?.charAt(0).toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>

      {open && (
        <View style={styles.drawerWrapper}>
          <Pressable style={styles.overlay} onPress={closeDrawer} />
          <Animated.View
            style={[
              styles.drawer,
              { transform: [{ translateX: slideX }] },
            ]}
          >
            <View
              style={[
                styles.drawerHeader,
                isContractor ? styles.contractorHeader : styles.workerHeader,
              ]}
            >
              <Text style={styles.drawerName}>{user?.name}</Text>
              <Text style={styles.drawerRole}>
                {isContractor ? t("contractor") : t("worker")}
              </Text>
            </View>

            <View style={styles.drawerContent}>
              <ProfileItem label={t("city")} value={user?.city} />
              <ProfileItem label={t("state")} value={user?.state} />
              <ProfileItem label={t("mobile")} value={user?.mobile} />

              <TouchableOpacity
                style={styles.settingsBtn}
                onPress={() => {
                  closeDrawer();
                  router.push("/settings");
                }}
              >
                <Text style={styles.settingsBtnText}>{t("settings")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={() => {
                  closeDrawer();
                  logout();
                  router.replace("/login");
                }}
              >
                <Text style={styles.logoutBtnText}>{t("logout")}</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}
    </>
  );
}

function ProfileItem({ label, value }: { label: string; value?: string }) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemLabel}>{label}</Text>
      <Text style={styles.itemValue}>{value || "-"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.card,
    zIndex: 1000,
  },
  container: {
    height: NAV_HEIGHT,
    paddingHorizontal: 20,
    backgroundColor: colors.card,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.primaryBlue,
    letterSpacing: -0.5,
  },
  loginBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: colors.primaryBlue,
  },
  loginText: {
    color: "#fff",
    fontWeight: "700",
  },
  profileWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  roleTag: {
    fontSize: 11,
    fontWeight: "800",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    textTransform: "uppercase",
  },
  workerTag: {
    backgroundColor: colors.primaryGreen + "15",
    color: colors.primaryGreen,
  },
  contractorTag: {
    backgroundColor: colors.primaryBlue + "15",
    color: colors.primaryBlue,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  workerCircle: {
    backgroundColor: colors.primaryGreen,
  },
  contractorCircle: {
    backgroundColor: colors.primaryBlue,
  },
  profileText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 16,
  },
  drawerWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2000,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  drawer: {
    position: "absolute",
    right: 0,
    width: DRAWER_WIDTH,
    height: "100%",
    backgroundColor: colors.card,
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,
  },
  drawerHeader: {
    padding: 32,
    paddingTop: 64,
  },
  workerHeader: {
    backgroundColor: colors.primaryGreen + "10",
  },
  contractorHeader: {
    backgroundColor: colors.primaryBlue + "10",
  },
  drawerName: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.textMain,
  },
  drawerRole: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "700",
    color: colors.textSub,
    textTransform: "uppercase",
  },
  drawerContent: {
    padding: 32,
  },
  item: {
    marginBottom: 24,
  },
  itemLabel: {
    fontSize: 11,
    color: colors.textSub,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
    fontWeight: "700",
  },
  itemValue: {
    fontSize: 16,
    color: colors.textMain,
    fontWeight: "700",
  },
  settingsBtn: {
    marginTop: 16,
    backgroundColor: colors.primaryBlue,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsBtnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
  },
  logoutBtn: {
    marginTop: 16,
    backgroundColor: "#F1F5F9",
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutBtnText: {
    color: colors.textSub,
    fontWeight: "800",
    fontSize: 15,
  },
});
