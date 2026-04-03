import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { colors } from "./theme";
import { useState } from "react";

type Job = {
  id: number;
  skill: string;
  location: string;
  wage: string;
  type: "daily" | "future";
  days?: number;
  applicants: any[];
};

const WORKERS = [
  {
    id: 1,
    name: "Murugan P.",
    skill: "Electrician",
    rating: 4.8,
    rate: "₹850/day",
    location: "Perundurai",
  },
  {
    id: 2,
    name: "Senthil Kumar",
    skill: "Painter",
    rating: 4.5,
    rate: "₹900/day",
    location: "Erode",
  },
  {
    id: 3,
    name: "Abdul Rahim",
    skill: "Plumber",
    rating: 4.7,
    rate: "₹800/day",
    location: "Bhavani",
  },
  {
    id: 4,
    name: "Karthick Raja",
    skill: "Driver",
    rating: 4.9,
    rate: "₹1000/day",
    location: "Tiruppur",
  },
];

const POSTED_JOBS: Job[] = [
  {
    id: 101,
    skill: "Electrician",
    location: "Perundurai",
    wage: "₹850/day",
    type: "daily",
    applicants: [
      { id: 1, name: "Prakash M.", location: "Erode", rating: 4.8 },
      { id: 2, name: "Vignesh S.", location: "Perundurai", rating: 4.2 },
    ],
  },
  {
    id: 102,
    skill: "Painter",
    location: "Erode",
    wage: "₹900/day",
    type: "future",
    days: 5,
    applicants: [
      { id: 3, name: "Ravi Teja", location: "Erode", rating: 4.5 },
    ],
  },
];

export default function ContractorHome() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedJobForApplicants, setSelectedJobForApplicants] = useState<any>(null);

  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");
  const [wage, setWage] = useState("");
  const [type, setType] = useState<"daily" | "future">("daily");
  const [days, setDays] = useState("");

  const resetForm = () => {
    setSkill("");
    setLocation("");
    setWage("");
    setType("daily");
    setDays("");
  };

  const saveJob = () => {
    if (!skill || !location || !wage) return;

    const newPostedJob: Job = {
      id: Date.now(),
      skill,
      location,
      wage,
      type,
      days: days ? parseInt(days) : undefined,
      applicants: [],
    };

    setJobs([newPostedJob, ...jobs]);
    Alert.alert("Success", "Job posted successfully!");
    resetForm();
    setShowForm(false);
  };

  const displayedJobs = [...jobs, ...POSTED_JOBS];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.companyName}>{user?.companyName || user?.name}</Text>
            <Text style={styles.companyLocation}>{user?.location}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.postBtn}
          onPress={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <Text style={styles.postBtnText}>{t("postJob")}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {/* Workers List */}
        <Text style={styles.sectionTitle}>{t("nearbyWorkers")}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {WORKERS.map(worker => (
            <View key={worker.id} style={[styles.card, styles.workerCard]}>
              <View style={styles.workerSmallHeader}>
                <View style={styles.avatarSmall}>
                  <Text style={styles.avatarTextSmall}>{worker.name.charAt(0)}</Text>
                </View>
                <View>
                  <Text style={styles.workerNameSmall}>{worker.name}</Text>
                  <Text style={styles.workerSkillSmall}>{worker.skill}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.hireBtnSmall}
                onPress={() => Alert.alert("Calling", `Contacting ${worker.name}...`)}
              >
                <Text style={styles.hireBtnTextSmall}>{t("callNow")}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* My Posted Jobs Section */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>My Posted Jobs</Text>
        {displayedJobs.map((job) => (
          <TouchableOpacity
            key={job.id}
            style={styles.card}
            onPress={() => setSelectedJobForApplicants(job)}
          >
            <View style={styles.jobHeader}>
              <Text style={styles.jobSkillTitle}>{job.skill}</Text>
              <View style={styles.applicantBadge}>
                <Text style={styles.applicantBadgeText}>
                  {job.applicants.length} Applicants
                </Text>
              </View>
            </View>
            <View style={styles.workerDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>{t("location")}</Text>
                <Text style={styles.detailValue}>{job.location}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>{t("rate")}</Text>
                <Text style={styles.detailValue}>{job.wage}</Text>
              </View>
            </View>
            <Text style={styles.tapTip}>Tap to view applicants</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Post Job Modal */}
      <Modal visible={showForm} transparent animationType="slide">
        <KeyboardAvoidingView
          style={styles.overlay}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.formBox}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>{t("postJob")}</Text>
              <TouchableOpacity onPress={() => setShowForm(false)}>
                <Text style={styles.closeBtnText}>Close</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder={t("skill")}
              style={styles.input}
              value={skill}
              onChangeText={setSkill}
            />

            <TextInput
              placeholder={t("location")}
              style={styles.input}
              value={location}
              onChangeText={setLocation}
            />

            <TextInput
              placeholder={t("dailyWage")}
              style={styles.input}
              value={wage}
              onChangeText={setWage}
              keyboardType="numeric"
            />

            <View style={styles.typeRow}>
              <TypeBtn
                label="Daily"
                active={type === "daily"}
                onPress={() => setType("daily")}
              />
              <TypeBtn
                label="Long Term"
                active={type === "future"}
                onPress={() => setType("future")}
              />
            </View>

            {type === "future" && (
              <TextInput
                placeholder="Number of days"
                keyboardType="numeric"
                style={styles.input}
                value={days}
                onChangeText={setDays}
              />
            )}

            <TouchableOpacity style={styles.saveBtn} onPress={saveJob}>
              <Text style={styles.saveText}>{t("postJob")}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Applicants Modal */}
      <Modal visible={!!selectedJobForApplicants} transparent animationType="fade">
        <View style={styles.applicantOverlay}>
          <View style={styles.applicantBox}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>Applicants - {selectedJobForApplicants?.skill}</Text>
              <TouchableOpacity onPress={() => setSelectedJobForApplicants(null)}>
                <Text style={styles.closeBtnText}>Close</Text>
              </TouchableOpacity>
            </View>

            <ScrollView>
              {selectedJobForApplicants?.applicants.map((app: any) => (
                <View key={app.id} style={styles.applicantItem}>
                  <View style={styles.applicantInfo}>
                    <Text style={styles.applicantName}>{app.name}</Text>
                    <Text style={styles.applicantSub}>{app.location} | Rating: {app.rating}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.callSmallBtn}
                    onPress={() => Alert.alert("Calling", `Contacting ${app.name}...`)}
                  >
                    <Text style={styles.callSmallBtnText}>Call</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* Type Button */

function TypeBtn({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.typeBtn,
        active && styles.typeBtnActive,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.typeText,
          active && styles.typeTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* Styles */

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
  companyName: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.textMain,
  },
  companyLocation: {
    color: colors.textSub,
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
  },
  postBtn: {
    backgroundColor: colors.primaryBlue,
    height: 54,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    elevation: 2,
  },
  postBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  list: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textMain,
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  card: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  workerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primaryBlue + "20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primaryBlue,
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textMain,
  },
  workerSkill: {
    fontSize: 14,
    color: colors.primaryGreen,
    fontWeight: "600",
    marginTop: 2,
  },
  ratingBox: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: colors.primaryBlue + "10",
    borderWidth: 1,
    borderColor: colors.primaryBlue + "20",
    alignItems: "center",
  },
  ratingLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.primaryBlue,
    textTransform: "uppercase",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.primaryBlue,
  },
  workerDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 14,
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: colors.textSub,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textMain,
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingLeft: 20,
    marginBottom: 8,
  },
  workerCard: {
    width: 260,
    marginRight: 16,
    padding: 16,
  },
  workerSmallHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryBlue + "15",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarTextSmall: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryBlue,
  },
  workerNameSmall: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textMain,
  },
  workerSkillSmall: {
    fontSize: 12,
    color: colors.primaryGreen,
    fontWeight: "600",
  },
  hireBtnSmall: {
    backgroundColor: colors.primaryBlue,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  hireBtnTextSmall: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  jobSkillTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textMain,
  },
  applicantBadge: {
    backgroundColor: colors.primaryGreen + "15",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  applicantBadgeText: {
    color: colors.primaryGreen,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  tapTip: {
    fontSize: 12,
    color: colors.primaryBlue,
    fontWeight: "600",
    textAlign: "right",
    marginTop: 4,
  },
  applicantOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 20,
  },
  applicantBox: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    maxHeight: "80%",
    elevation: 10,
  },
  applicantItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  applicantInfo: {
    flex: 1,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textMain,
  },
  applicantSub: {
    fontSize: 13,
    color: colors.textSub,
    marginTop: 2,
  },
  callSmallBtn: {
    backgroundColor: colors.primaryBlue,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  callSmallBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  hireBtn: {
    backgroundColor: colors.primaryBlue,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  hireBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "flex-end",
  },
  formBox: {
    width: "100%",
    backgroundColor: colors.card,
    padding: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    elevation: 20,
  },
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textMain,
  },
  closeBtnText: {
    fontSize: 16,
    color: colors.textSub,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#F1F5F9",
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 18,
    marginBottom: 16,
    fontSize: 16,
    color: colors.textMain,
    fontWeight: "500",
  },
  typeRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  typeBtn: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  typeBtnActive: {
    backgroundColor: colors.primaryBlue,
    borderColor: colors.primaryBlue,
  },
  typeText: {
    fontWeight: "600",
    color: colors.textSub,
  },
  typeTextActive: {
    color: "#fff",
  },
  saveBtn: {
    backgroundColor: colors.primaryBlue,
    height: 58,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    elevation: 4,
  },
  saveText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
  },
});
