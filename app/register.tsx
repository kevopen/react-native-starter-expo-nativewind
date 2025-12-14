import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    
    // Simulate registration API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "Success", 
        "Account created successfully! Please sign in.",
        [{ text: "OK", onPress: () => router.push("/") }]
      );
    }, 1000);
  };

  const handleBackToLogin = () => {
    router.push("/");
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Header Section */}
            <View style={styles.headerSection}>
              <Image
                source={require("@/assets/images/react-logo.png")}
                style={styles.logo}
                contentFit="contain"
              />
              <ThemedText type="title" style={styles.title}>
                Create Account
              </ThemedText>
              <ThemedText style={styles.subtitle}>
                Join us and start your journey today
              </ThemedText>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              <View style={styles.inputContainer}>
                <ThemedText style={styles.inputLabel}>Full Name</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#666"
                  value={formData.fullName}
                  onChangeText={(value) => handleInputChange("fullName", value)}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <ThemedText style={styles.inputLabel}>Email</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#666"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <ThemedText style={styles.inputLabel}>Password</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Create a password (min. 6 characters)"
                  placeholderTextColor="#666"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange("password", value)}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <ThemedText style={styles.inputLabel}>Confirm Password</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor="#666"
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleInputChange("confirmPassword", value)}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.registerButton,
                  pressed && styles.buttonPressed,
                  isLoading && styles.buttonDisabled,
                ]}
                onPress={handleRegister}
                disabled={isLoading}
              >
                <ThemedText style={styles.registerButtonText}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </ThemedText>
              </Pressable>
            </View>

            {/* Login Section */}
            <View style={styles.loginSection}>
              <ThemedText style={styles.loginText}>
                Already have an account?{" "}
              </ThemedText>
              <Pressable onPress={handleBackToLogin}>
                <ThemedText style={styles.loginLink}>Sign In</ThemedText>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    minHeight: "100%",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  formSection: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#fff",
  },
  registerButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
    backgroundColor: "#0056CC",
  },
  buttonDisabled: {
    opacity: 0.5,
    backgroundColor: "#004499",
  },
  loginSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "#888",
    fontSize: 16,
  },
  loginLink: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
});