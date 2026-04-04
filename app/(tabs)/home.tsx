import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Linking,
  StatusBar,
} from "react-native";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";
import { colors } from "./theme";


const JOBS = [

  {
    id: 1,
    skill: "Electrician",
    contractor: "Ramesh Kumar",
    location: "Perundurai",
    wage: "₹900 / day",
    days: 1,
    phone: "9876543210",
    description: "House wiring and electrical fixing",
    type: "daily",
  },

  {
    id: 2,
    skill: "Painter",
    contractor: "Suresh Builders",
    location: "Erode",
    wage: "₹1200 / day",
    days: 5,
    phone: "9876543211",
    description: "Interior and exterior painting",
    type: "future",
  },

  {
    id: 3,
    skill: "Plumber",
    contractor: "Mani Contractor",
    location: "Salem",
    wage: "₹800 / day",
    days: 2,
    phone: "9876543212",
    description: "Pipe fixing work",
    type: "future",
  },

  {
    id: 4,
    skill: "Driver",
    contractor: "Karthik Transport",
    location: "Coimbatore",
    wage: "₹1000 / day",
    days: 1,
    phone: "9876543213",
    description: "Vehicle driving",
    type: "daily",
  },

];




export default function Home() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (user?.role === "contractor") {
      router.replace("/contractorhome");
    }
  }, [user]);

  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [searchSkill, setSearchSkill] = useState<string | null>(null);
  const [showSearchPopup, setShowSearchPopup] = useState(true);


  const callNow = (phone: string) => {

    Linking.openURL(`tel:${phone}`);

  };


  const applyNow = () => {

    alert("Applied Successfully");

  };



  const sortedJobs = [...JOBS].sort((a, b) => {

    if (a.skill === searchSkill) return -1;

    if (b.skill === searchSkill) return 1;

    return 0;

  });




  return (

    <View style={{ flex: 1, backgroundColor: colors.background }}>

      <StatusBar barStyle="dark-content" />



      {/* SEARCH POPUP */}


      <Modal visible={showSearchPopup} transparent animationType="fade">

        <View style={styles.overlay}>

          <View style={styles.popup}>

            <Text style={styles.title}>

              What job are you searching today? - DevOps Test

            </Text>



            {["Electrician", "Painter", "Plumber", "Driver"].map(skill => (

              <TouchableOpacity

                key={skill}

                style={styles.optionBtn}

                onPress={() => {

                  setSearchSkill(skill);

                  setShowSearchPopup(false);

                }}

              >

                <Text style={styles.optionText}>{skill}</Text>

              </TouchableOpacity>

            ))}



            <TouchableOpacity

              style={styles.skipBtn}

              onPress={() => setShowSearchPopup(false)}

            >

              <Text style={styles.skipText}>Skip</Text>

            </TouchableOpacity>



          </View>

        </View>

      </Modal>




      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userLocation}>{user?.location}</Text>
          </View>
        </View>
      </View>

      {/* JOB LIST */}
      <ScrollView contentContainerStyle={styles.list}>
        <Text style={styles.sectionTitle}>{t("nearbyWorkers") === "Available Workers Nearby" ? "Available Jobs Nearby" : t("nearbyWorkers")}</Text>

        {sortedJobs.map(job => (
          <TouchableOpacity
            key={job.id}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => setSelectedJob(job)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{job.contractor.charAt(0)}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.jobSkill}>{job.skill}</Text>
                <Text style={styles.contractorName}>{job.contractor}</Text>
              </View>
              <View style={styles.typeTag}>
                <Text style={styles.typeText}>{job.type === "daily" ? "Daily" : "Future"}</Text>
              </View>
            </View>

            <View style={styles.cardDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>{t("location")}</Text>
                <Text style={styles.detailValue}>{job.location}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>{t("dailyWage")}</Text>
                <Text style={styles.detailValue}>{job.wage}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={(e) => {
                e.stopPropagation();
                job.type === "daily" ? callNow(job.phone) : applyNow();
              }}
            >
              <Text style={styles.actionBtnText}>
                {job.type === "daily" ? t("callNow") : t("apply")}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>




      {/* DETAILS POPUP */}


      <Modal visible={selectedJob !== null} transparent animationType="fade">

        <View style={styles.overlay}>

          <View style={styles.popup}>

            {selectedJob && (
              <>
                <Text style={styles.title}>{selectedJob.skill}</Text>

                <View style={styles.cardDetails}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>{t("contractor")}</Text>
                    <Text style={styles.detailValue}>{selectedJob.contractor}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>{t("location")}</Text>
                    <Text style={styles.detailValue}>{selectedJob.location}</Text>
                  </View>
                </View>

                <View style={styles.cardDetails}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>{t("dailyWage")}</Text>
                    <Text style={styles.detailValue}>{selectedJob.wage}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Duration</Text>
                    <Text style={styles.detailValue}>{selectedJob.days} Days</Text>
                  </View>
                </View>

                <Text style={styles.detailLabel}>Description</Text>
                <Text style={[styles.detailValue, { marginBottom: 20 }]}>{selectedJob.description}</Text>

                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setSelectedJob(null)}
                >
                  <Text style={styles.btnText}>Close</Text>
                </TouchableOpacity>
              </>
            )}

          </View>

        </View>

      </Modal>



    </View>

  );

}




/* ---------------- STYLES ---------------- */

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
  userName: {
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
  cardHeader: {
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
  info: {
    flex: 1,
  },
  jobSkill: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textMain,
  },
  contractorName: {
    fontSize: 14,
    color: colors.textSub,
    fontWeight: "600",
    marginTop: 2,
  },
  typeTag: {
    backgroundColor: colors.primaryGreen + "15",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primaryGreen + "30",
  },
  typeText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.primaryGreen,
    textTransform: "uppercase",
  },
  cardDetails: {
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
  actionBtn: {
    backgroundColor: colors.primaryBlue,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "white",
    width: "88%",
    padding: 24,
    borderRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textMain,
    marginBottom: 16,
    textAlign: "center",
  },
  optionBtn: {
    backgroundColor: colors.primaryBlue,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  optionText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  skipBtn: {
    marginTop: 20,
    alignItems: "center",
  },
  skipText: {
    color: colors.textSub,
    fontWeight: "600",
    fontSize: 15,
  },
  closeBtn: {
    backgroundColor: "#64748B",
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  btnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});
